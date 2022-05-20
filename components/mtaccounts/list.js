import React from "react";
import DataGrid, { SelectColumn, TextEditor, SelectCellFormatter }  from "react-data-grid";
import { StoreContext } from "../../context/store";
import { buildFiltersQueryString } from "../../libs/src/mtorders";
import { isset, empty, log } from "../../utils/common";
import { exportToCsv } from "../../utils/exportFile.ts";
import { Form, Button, Collapse } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import { ExportCSVButton } from "../exportButtons";

import FilterAccount from "./filters/accounts";
import FilterServer from "./filters/server";
import FilterName from "./filters/name";
import FilterCompany from "./filters/company";
import FilterMtCreateAt from "./filters/mtCreateAt";
import FilterCreatedAt from "./filters/createdAt";
import FilterBalance from "./filters/balance";

function rowKeyGetter(row) {
  if (isset(row?.uuid)) return `account_${row.account}`;
}

export default function MTAccountsList( props ) {
  const { filters, data } = props;
  const [toggle, setToggle] = React.useState();
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [accounts, setAccounts] = React.useState(data ?? []);
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

  store.set("accounts", []);
  store.set("accounts_totals", {});

  store.on("updateAccounts", (o) => {
      if (empty(o)) {
        setAccounts([]);
        setRows([]);
        setTotals({});
      } else {
        let firstRow = o[0];
        let cols = Object.keys(firstRow).map((item) => {
          return { key: item, name: item };
        });        
        cols.unshift(SelectColumn);
        setColumns(cols);
        setAccounts(o);
        setRows(memoRows([...rows, ...o]));
      }
  });

  React.useEffect(() => {
    const query = buildFiltersQueryString({...filters, ...__filters}) ?? "";

    fetch("/api/mtaccounts?where=" + query, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        if (!empty(r)) {
          store.set("accounts", r);
          store.emit("updateAccounts", r);
        } else {
          store.set("accounts", []);
          store.emit("updateAccounts", []);
        }
      });
  }, [store, filters, __filters]);

  const handleRowsChange = (r) => {
    log(r);
    const __accounts = Array.from(r).map(rowKey => {
      return parseInt(rowKey.split("_")[1]);
    });

    store.emit("account:selected", __accounts);

    setFilters({
      ...__filters,
      ...{ account: __accounts },
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
        <h1>MetaTrader Accounts</h1>
        <h2>
          Filtros{" "}
          <Button onClick={() => setToggle(!toggle)} className="h-10 w-10">
            <FontAwesomeIcon icon={faFilter} />
          </Button>
        </h2>
        <Collapse isOpen={toggle}>

        <Form>
          <FilterAccount setFilter={handleNumbersAsArray} />

          <FilterName setFilter={handleStrAsArray} />
          <FilterServer setFilter={handleStrAsArray} />
          <FilterCompany setFilter={handleStrAsArray} />

          <FilterBalance setFilter={handleNumberRange} />

          <FilterCreatedAt setFilter={handleDateISO} />
          <FilterMtCreateAt setFilter={handleDateISO} />
        </Form>
        </Collapse>
        <hr />
        <ExportCSVButton onExport={() => exportToCsv(gridElement, "accounts.csv")}>
          Export to CSV
        </ExportCSVButton>

        {gridElement}
      </div>
    </>
  );
}