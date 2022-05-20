import React from "react";
import DataGrid from "react-data-grid";
import { StoreContext } from "../../context/store";
import { isset, empty, log } from "../../utils/common";
import { buildFiltersQueryString } from "../../libs/src/mtorders";
import { exportToCsv } from "../../utils/exportFile.ts";
import { Form, Button, Collapse } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import { ExportCSVButton } from "../exportButtons";

import FilterOpenTime from "./filters/openTime";
import FilterCloseTime from "./filters/closeTime";
import FilterTickets from "./filters/tickets";
import FilterItems from "./filters/items";
import FilterPnL from "./filters/pnl";
import FilterAccount from "./filters/accounts";


function rowKeyGetter(row) {
  return `ticket_${row.ticket}`;
}

export default function MTOrdersList( props ) {
  const { filters } = props;
  const [toggle, setToggle] = React.useState();
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [orders, setOrders] = React.useState([]);
  const [sortColumns, setSortColumns] = React.useState([]);
  const [totals, setTotals] = React.useState({});

  const [__filters, setFilters] = React.useState({});
  
  const store = React.useContext(StoreContext);

  const memoRows = (rows) => {
    const memo = [];
    return rows.map((r) => {
      if (typeof r !== "undefined" && !memo.includes(r?.id)) {
        memo.push(r.id);
        return r;
      }
    });
  };

  store.set("orders", []);
  store.set("orders_totals", {});
  
  //import orders listeners 
  import("../../libs/listeners/mtorders");

  store.on("updateOrders", (o) => {
    if (!Array.isArray(o) || empty(Object.keys(o[0]))) {
      setOrders([]);
      setRows([]);
      setTotals({});
    } else {
        setOrders(o);
        setRows(memoRows([...rows, ...o]));

        let firstRow = o[0];
        let cols = Object.keys(firstRow).map((item) => {
          return { key: item, name: item };
        });
        setColumns(cols);
    }
  });

  React.useEffect(() => {
      const query = buildFiltersQueryString({ ...filters, ...__filters }) ?? "";
    
      fetch("/api/mtorders?where=" + query, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((r) => {
          if (!empty(r)) {
            store.set("orders", r);
            store.emit("updateOrders", r);
          } else {
            store.set("orders", []);
            store.emit("updateOrders", []);
          }
        });
  }, [store, filters, __filters]);

  const gridElement = (
    <DataGrid
      columns={columns}
      rows={rows}
      rowKeyGetter={rowKeyGetter}
      defaultColumnOptions={{
        sortable: true,
      }}
      onRowsChange={setRows}
      sortColumns={sortColumns}
      onSortColumnsChange={setSortColumns}
      className="fill-grid rdg-light"
    />
  );
  
  const handleDateISO = (v, k) => {
    setFilters({
      ...__filters,
      ...{ [k]: v },
    });
  };
  
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
  
  const handleNumbersAsArray = (v, k) => {
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

  const handleNumberRange = (v, k) => {
    setFilters({
      ...__filters,
      ...{ [k]: v },
    });
  };

  return (
    <>
      <div className="block">
        <h1>MetaTrader Orders</h1>
        <h2>
          Filtros{" "}
          <Button onClick={() => setToggle(!toggle)} className="h-10 w-10">
            <FontAwesomeIcon icon={faFilter} />
          </Button>
        </h2>
        <Collapse isOpen={toggle}>

        <Form>
          <FilterTickets setFilter={handleNumbersAsArray} />
          <FilterItems setFilter={handleStrAsArray} />
          <FilterPnL setFilter={handleNumberRange} />
          <FilterOpenTime setFilter={handleDateISO} />
          <FilterCloseTime setFilter={handleDateISO} />
        </Form>
        </Collapse>
        <hr />
        <ExportCSVButton onExport={() => exportToCsv(gridElement, "orders.csv")}>
          Export to CSV
        </ExportCSVButton>

        {gridElement}
      </div>
    </>
  );
}