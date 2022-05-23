import React from "react";
import DataGrid, {
  SelectColumn,
  TextEditor,
  SelectCellFormatter,
} from "react-data-grid";
import { StoreContext } from "../../context/store";
import { buildFiltersQueryString } from "../../libs/src/customers";
import { isset, empty, log } from "../../utils/common";
import { exportToCsv } from "../../utils/exportFile.ts";
import { Form, Button, Collapse, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import { ExportCSVButton } from "../exportButtons";

import FilterFirstname from "./filters/firstname";
import FilterLastname from "./filters/lastname";
import FilterEmail from "./filters/email";
import FilterCompany from "./filters/company";
import FilterPhone from "./filters/phone";
import FilterCreatedAt from "./filters/createdAt";
import FilterBalance from "./filters/balance";

function rowKeyGetter(row) {
  if (isset(row?.id)) return `customer_${row.id}`;
}

const risks = {
  1:"Bajo",
  2:"Medio",
  3:"Medio Alto",
  4:"Alto",
  5:"Muy Alto",
};

let controlInput = null;

export default function MTCustomersList( props ) {
  const { filters, data } = props;
  const [toggle, setToggle] = React.useState();
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [customers, setCustomers] = React.useState(data ?? []);
  const [customergroups, setCustomerGroups] = React.useState(data ?? []);
  const [sortColumns, setSortColumns] = React.useState([]);
  const [totals, setTotals] = React.useState({});
  const [selectedRows, setSelectedRows] = React.useState(new Set());

  const [__filters, setFilters] = React.useState({});
  
  const store = React.useContext(StoreContext);

  const memoRows = rows => {
    const memo = [];
    const resp = [];

    for (let i in rows) {
      if (isNaN(i)) continue;

      const r = rows[i];
      if (!memo.includes(r.uuid)) { 
          memo.push(r.uuid);
          resp.push(r);
      }
    }
    return resp;
  }

  const handleRowChange = (v, k, p) => {
      let body = {};
      body.firstname = k==="firstname" ? v : p.row?.firstname;
      body.lastname = k==="lastname" ? v : p.row?.lastname;
      body.email = k==="email" ? v : p.row?.email;
      body.company = k==="company" ? v : p.row?.company;
      body.phone = k==="phone" ? v : p.row?.phone;
      body.workstation = k==="workstation" ? v : p.row?.workstation;
      body.commission = k === "commission" ? parseInt(v) : parseInt(p.row?.commission);
      body.risky = k === "risky" ? parseInt(v) : parseInt(p.row?.risky);
      body.customerGroupId = parseInt(p.row?.customerGroupId);

      //POST form values
      fetch(`/api/customers/${p.row.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
      .then(res => res.json())
      .then(res => {
        log(res);
      });
  }

  store.set("customers", []);
  store.set("customers_totals", {});

  store.on("updateCustomers", (o) => {
      if (empty(o)) {
        setCustomers([]);
        setRows([]);
        setTotals({});
      } else {
        let firstRow = o[0];
        let cols = Object.keys(firstRow).map((item) => {
          let colObject = { key: item, name: item };
          
          switch (item) {
            case "risky":
              colObject.width = 90;

              colObject.formatter = (p) => {
                return <>{`${risks[p.row.risky ?? 1] ?? ""}`}</>;
              };

              colObject.editor = (p) => (
                <Input
                  type="select"
                  autoFocus
                  value={p.row.risky ?? 0}
                  onChange={(e) => {
                    handleRowChange(e.target.value, "risky", p);
                    p.onRowChange({ ...p.row, risky: e.target.value }, true);
                  }}
                >
                  {[1, 2, 3, 4, 5].map((risk) => (
                    <option key={risk} value={risk}>
                      {risks[risk]}
                    </option>
                  ))}
                </Input>
              );

              colObject.editorOptions = {
                editOnClick: true,
              };
              break;
            case "commission":
            case "setup":
              colObject.width = 90;

              colObject.formatter = (p) => {
                return <>{`${p.row[item] ? "Yes" : "No"}`}</>;
              };

              colObject.editor = (p) => (
                <Input
                  type="select"
                  autoFocus
                  value={p.row[item] ?? 0}
                  onChange={(e) => {
                    handleRowChange(e.target.value, item, p);

                    p.onRowChange(
                      { ...p.row, [item]: e.target.value },
                      true
                    );
                  }}
                >
                  <option key={0} value={0}>
                    No
                  </option>
                  <option key={1} value={1}>
                    Yes
                  </option>
                </Input>
              );

              colObject.editorOptions = {
                editOnClick: true,
              };
              break;
            case "status":
              colObject.width = 90;

              colObject.formatter = (p) => {
                return <>{`${p.row.status ? "Activado" : "Desactivado"}`}</>;
              };

              colObject.editor = (p) => (
                <Input
                  type="select"
                  autoFocus
                  value={p.row.status ?? 0}
                  onChange={(e) => {
                    handleRowChange(e.target.value, "status", p);

                    p.onRowChange({ ...p.row, status: e.target.value }, true);
                  }}
                >
                  <option key={0} value={0}>
                    Desactivado
                  </option>
                  <option key={1} value={1}>
                    Activado
                  </option>
                </Input>
              );

              colObject.editorOptions = {
                editOnClick: true,
              };
              break;
            case "customerGroupId":
              colObject.width = 180;

              colObject.formatter = (p) => {
                return (
                  <>{`${
                    p.row.customer_group ? p.row.customer_group.name : "Ninguno"
                  }`}</>
                );
              };

              colObject.editor = (p) => (
                <Input
                  type="select"
                  autoFocus
                  value={
                    customergroups.map((group) => {
                      return p.row.customerGroupId === group.id
                        ? group.name
                        : "Ninguno";
                    })[0]
                  }
                  onChange={(e) => {
                    handleRowChange(e.target.value, "customerGroupId", p);
                    p.onRowChange(
                      { ...p.row, customerGroupId: e.target.value },
                      true
                    );
                  }}
                >
                  {customergroups.map((group) => {
                    return (
                      <option
                        key={group.uuid}
                        value={group.id}
                        selected={p.row.customerGroupId === group.id}
                      >
                        {group.name}
                      </option>
                    );
                  })}
                </Input>
              );

              colObject.editorOptions = {
                editOnClick: true,
              };
              break;
            case "company":
            case "firstname":
            case "lastname":
            case "email":
            case "workstation":
            case "phone":
              colObject.width = 180;

              colObject.editor = (p) => (
                <Input
                  type="text"
                  autoFocus
                  value={p.row[item] ?? ""}
                  onChange={(e) => {
                    if (controlInput) {
                      clearTimeout(controlInput);
                      controlInput = null;
                    } else {
                      controlInput = setTimeout(() => {
                        handleRowChange(e.target.value, item, p);
                      }, 1000);
                    }
                    p.onRowChange({ ...p.row, [item]: e.target.value }, true);
                  }}
                />
              );

              colObject.editorOptions = {
                editOnClick: true,
              };
              break;
          }
          return colObject;
        });        
        cols.unshift(SelectColumn);
        cols.pop();
        setColumns(cols);
        setCustomers(o);
        setRows(memoRows([...rows, ...o]));
      }
  });

  React.useEffect(() => {
    const query = buildFiltersQueryString({...filters, ...__filters}) ?? "";

    fetch("/api/customers?include=customer_group&where=" + query, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        if (!empty(r)) {
          store.set("customers", r);
          store.emit("updateCustomers", r);
        } else {
          store.set("customers", []);
          store.emit("updateCustomers", []);
        }
      });

    fetch("/api/customergroups", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        if (!empty(r)) {
          store.set("customergroups", r);
          store.emit("updateCustomerGroups", r);
          setCustomerGroups(r);
        } else {
          store.set("customergroups", []);
          store.emit("updateCustomerGroups", []);
          setCustomerGroups([]);
        }
      });
  }, [store, filters, __filters]);

  const handleRowsChange = (r) => {
    const __customers = Array.from(r).map(rowKey => {
      return parseInt(rowKey.split("_")[1]);
    });

    store.emit("customer:selected", __customers);

    setFilters({
      ...__filters,
      ...{ customerId: __customers },
    });

    setSelectedRows(r);
  }

  const gridElement = (
    <DataGrid
      columns={columns}
      rows={rows}
      rowKeyGetter={rowKeyGetter}
      defaultColumnOptions={{
        sortable: true,
      }}
      onRowsChange={setRows}
      selectedRows={selectedRows}
      onSelectedRowsChange={handleRowsChange}
      sortColumns={sortColumns}
      onSortColumnsChange={setSortColumns}
      className="fill-grid rdg-light"
    />
  );
  
  const handleStrAsArray = (v, k) => {
    const tsquerySpecialChars = /[()|&:*!]/g;

    const getQueryFromSearchPhrase = (searchPhrase) =>
      searchPhrase.replace(tsquerySpecialChars, ",").trim().split(",");
    let strAsArray =
      typeof v === "string"
        ? getQueryFromSearchPhrase(v).map((val) => {
            if (!empty(val.trim())) return val.trim();
          })
        : Array.isArray(v) && !empty(v)
        ? v
        : [];

    if (strAsArray.length > 0 && !empty(strAsArray[0])) {
      setFilters({
        ...__filters,
        ...{ [k]: strAsArray },
      });
    } else {
      setFilters({
        ...__filters,
        ...{ [k]: null },
      });
    }
  };
  
  const handleDateISO = (v,k) => {
    setFilters({
      ...__filters,
      ...{ [k]:v },
    });
  };
  
  const handleNumbersAsArray = (v,k) => {
    let numbersArray =
      typeof v === "string"
        ? v.split(",").map((item) => {
            return parseInt(item.trim().replace(/\D/gi, ""));
          })
        : Array.isArray(v) && !empty(v)
        ? v
        : [];
    if (
      numbersArray.length > 0 &&
      !empty(numbersArray[0]) &&
      !isNaN(numbersArray[0])
    ) {
      setFilters({
        ...__filters,
        ...{ [k]: numbersArray },
      });
    } else {
      setFilters({
        ...__filters,
        ...{ [k]: null },
      });
    }
  };
  
  const handleNumberRange = (v,k) => {
    setFilters({
      ...__filters,
      ...{ [k]: v },
    });
  };

  return (
    <>
      <div className="block">
        <h1>MetaTrader Customers</h1>
        <h2>
          Filtros{" "}
          <Button onClick={() => setToggle(!toggle)} className="h-10 w-10">
            <FontAwesomeIcon icon={faFilter} />
          </Button>
        </h2>
        <Collapse isOpen={toggle}>
          <Form>
            <FilterEmail setFilter={handleStrAsArray} />
            <FilterPhone setFilter={handleStrAsArray} />
            <FilterFirstname setFilter={handleStrAsArray} />
            <FilterLastname setFilter={handleStrAsArray} />
            <FilterCompany setFilter={handleStrAsArray} />
            <FilterBalance setFilter={handleNumberRange} />
            <FilterCreatedAt setFilter={handleDateISO} />
          </Form>
        </Collapse>
        <hr />
        <ExportCSVButton
          onExport={() => exportToCsv(gridElement, "customers.csv")}
        >
          Export to CSV
        </ExportCSVButton>

        {gridElement}
      </div>
    </>
  );
}