import React from "react";
import moment from "moment";
import DataGrid, { SelectColumn, TextEditor, SelectCellFormatter }  from "react-data-grid";
import { StoreContext } from "../../context/store";
import { buildFiltersQueryString } from "../../libs/src/mtorders";
import {
  isset,
  empty,
  log,
  isPrimitive,
  ucfirst,
  ucfsplit,
} from "../../utils/common";
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

const risks = {
  1: "Bajo",
  2: "Medio",
  3: "Medio Alto",
  4: "Alto",
  5: "Muy Alto",
};

let controlInput = null;

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
  const [customergroups, setCustomerGroups] = React.useState(data ?? []);
  const [totals, setTotals] = React.useState({});
  const [selectedRows, setSelectedRows] = React.useState(new Set());

  const [__filters, setFilters] = React.useState({});
  
  const store = React.useContext(StoreContext);

  store.on("updateOrdersTotals", (__totals) => {
    log("updateOrdersTotals", __totals);
    setTotals(__totals);
  });
  
  const memoRows = rows => {
    const memo = [];
    const resp = [];

    for (let i in rows) {
      if (isNaN(i)) continue;

      const r = rows[i];

      if (!memo.includes(r.uuid)) {
        
        for (let j in r.customer) {
          let prefix = "customer_";
          if (!isNaN(parseInt(j))) continue;
          
          r[`${prefix + j}`] = r.customer[j];
        }
        
        for (let j in totals) {
          let prefix = "totals_";
          if (!isNaN(parseInt(j))) continue;
          r[`${prefix + j}`] =
            !isPrimitive(totals[j])
              ? JSON.stringify(totals[j])
              : totals[j];
        }

        for (let j in r) {
          let prefix = "";
          r[`${prefix + j}`] = !isPrimitive(r[j]) ? JSON.stringify(r[j]) : r[j];
        }

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
        let cols = [
          ...Object.keys(firstRow),
        ]
          .map((item) => {
            let colObject = {
              key: item,
              name: ucfsplit(item),
            };

            switch (item) {
            }

            return colObject;
            
          });

        cols.pop();

          
        let account_cols = [];
        for (let item of Object.keys(firstRow)) {
          if (!isNaN(parseInt(item))) continue;

          let prefix = "";
          let colObject = {
            key: prefix + item,
            name: ucfsplit(`${prefix + item}`),
          };

          switch (item) {
          }
          account_cols.push(colObject);
        }

        let customer_cols = [];
        for (let item of Object.keys(firstRow["customer"])) {
          if (!isNaN(parseInt(item))) continue;

          let prefix = "customer_";
          let colObject = {
            key: prefix + item,
            name: ucfsplit(`${prefix + item}`),
          };

          switch (item) {
          }
          customer_cols.push( colObject );
        }
          
        let totals_cols = [
          ...[],
          ...Object.keys(totals),
        ]
          .map((item) => {
            let prefix = "totals_";
            let colObject = {
              key: prefix + item,
              name: ucfsplit(`${prefix + item}`),
            };

            switch (item) {
            }

            return colObject;
          });

        //cols = [...customer_cols, ...cols, ...totals_cols];

        cols.unshift(SelectColumn);

        //const finalCols = [...customer_cols, ...account_cols, ...totals_cols];
        const finalCols = [
          {
            key: "email",
            name: "Email",
          },
          {
            key: "currency",
            name: "Divisa",
          },
          {
            key: "commission",
            name: "Comision",
            formatter: (p) => {
              return <>{p.row?.commission ? "Si" : "No"}</>;
            },
          },
          {
            key: "setup",
            name: "Configurado",
            formatter: (p) => {
              return <>{p.row?.setup ? "Si" : "No"}</>;
            },
          },
          {
            key: "risky",
            name: "Perfil Riesgo",
            formatter: (p) => {
              return <>{risks[p.row?.risky] ?? "None"}</>;
            },
          },
          {
            key: "workstation",
            name: "Maquina",
            formatter: (p) => {
              return <>{p.row?.workstation ?? ""}</>;
            },
          },
          {
            key: "customer_customerGroupId",
            name: "Tipo",
            formatter: (p) => {
              let customerStr = p.row?.customer ?? JSON.stringify({});
              let customer =
                typeof customerStr === "string"
                  ? JSON.parse(customerStr)
                  : customerStr;
              let CustomerGroupName;

              for (let i in customergroups) {
                let group = customergroups[i];

                CustomerGroupName =
                  customer?.customerGroupId === group.id
                    ? group.name
                    : "Ninguno";
                if (!empty(CustomerGroupName)) break;
              }
              return <>{CustomerGroupName}</>;
            },
          },
          {
            key: "comments",
            name: "Comentarios",
            formatter: (p) => {
              return <>{p.row?.comments ?? ""}</>;
            },
          },
          {
            key: "totals_firstBotTrade",
            name: "Fecha Inicio del Bot",
            formatter: (p) => {
              const firstBotTrade = p.row?.totals_firstBotTrade
                ? JSON.parse(p.row?.totals_firstBotTrade)
                : null;
              //TODO: make prisma query to get order with magicnumber=2020 ASC
              return (
                <>
                  {moment(firstBotTrade?.openTime).format(
                    "DD/MM/YYYY H:mm:ss"
                  ) ?? "N/A"}
                </>
              );
            },
          },
          {
            key: "totals_lastBotTrade",
            name: "Dias Activo del Bot",
            formatter: (p) => {
              const firstBotTrade = p.row?.totals_firstBotTrade
                ? JSON.parse(p.row?.totals_firstBotTrade)
                : null;

              const lastBotTrade = p.row?.totals_lastBotTrade
                ? JSON.parse(p.row?.totals_lastBotTrade)
                : null;

              return (
                <>
                  {firstBotTrade?.openTime && lastBotTrade?.openTime
                    ? parseFloat(
                        moment
                          .duration(
                            moment(lastBotTrade?.openTime).diff(
                              firstBotTrade?.openTime
                            )
                          )
                          .asDays()
                      ).toFixed(2)
                    : "N/A"}
                </>
              );
            },
          },
          {
            key: "totals_deposits_qty",
            name: "Cantidad Depositos",
            formatter: (p) => {
              const deposits = p.row?.totals_deposits
                ? JSON.parse(p.row?.totals_deposits)
                : null;

              const qtyDeposits = deposits?.length > 0 ? deposits?.length : 0;

              return <>{qtyDeposits ?? 0}</>;
            },
          },
          {
            key: "totals_deposits",
            name: "Detalles Depositos",
            formatter: (p) => {
              return <>{p.row?.totals_deposits ?? ""}</>;
            },
          },
          {
            key: "totals_total_withdrawals",
            name: "Total Retiros",
            formatter: (p) => {
              const withdrawals = p.row?.totals_withdrawals
                ? JSON.parse(p.row?.totals_withdrawals)
                : null;

              let withdrawals_total = 0;
              for (let i in withdrawals) {
                withdrawals_total =
                  withdrawals_total * 1 + parseFloat(withdrawals.profit) * 1;
              }

              return <>{withdrawals_total ?? 0}</>;
            },
          },

          {
            key: "totals_withdrawals_qty",
            name: "Cantidad Retiros",
            formatter: (p) => {
              const withdrawals = p.row?.totals_withdrawals
                ? JSON.parse(p.row?.totals_withdrawals)
                : null;

              const qty = withdrawals?.length > 0 ? withdrawals?.length : 0;

              return <>{qty ?? 0}</>;
            },
          },
          {
            key: "totals_withdrawals",
            name: "Detalles Retiros",
            formatter: (p) => {
              return <>{p.row?.totals_withdrawals ?? ""}</>;
            },
          },
          {
            key: "initial_bot_balance",
            name: "Balance Inicial del Bot",
            formatter: (p) => {
              return (
                <>
                  {parseFloat(p.row?.totals_initialBalanceBot).toFixed(2) ?? 0}
                </>
              );
            },
          },
          {
            key: "balance",
            name: "Balance",
            formatter: (p) => {
              return (
                <>{parseFloat(p.row?.totals_totalProfit).toFixed(2) ?? 0}</>
              );
            },
          },
          {
            key: "roi",
            name: "Retorno",
            formatter: (p) => {
              return (
                <>
                  {parseFloat(
                    p.row?.totals_balance - p.row?.totals_initialBalanceBot
                  ).toFixed(2) ?? 0}
                </>
              );
            },
          },
          {
            key: "roi_ytd",
            name: "Retorno YTD",
            formatter: (p) => {
              return (
                <>
                  Insertar este dato aqui colapsaria la app al procesar muchos
                  registros debido a que seria una consulta grande a la db
                  dentro de otra consulta grande
                </>
              );
            },
          },
          {
            key: "roi_per_dates",
            name: "Detalle Retorno",
            formatter: (p) => {
              return (
                <>
                  Insertar este dato aqui colapsaria la app al procesar muchos
                  registros debido a que serian varias consultas grandes a la
                  db dentro de otra consulta grande
                </>
              );
            },
          },
          {
            key: "mdd",
            name: "MDD (%)",
            formatter: (p) => {
              return (
                <>
                  {parseFloat(p.row?.totals_mdd).toFixed(2)} (
                  {parseFloat(p.row?.totals_mdd_percent).toFixed(2)}%)
                </>
              );
            },
          },
          {
            key: "floating_orders_total",
            name: "Flotante",
            formatter: (p) => {
              return <>{p.row?.totals_totalFloatingProfit ?? 0}</>;
            },
          },
          {
            key: "floating_winner_order",
            name: "Flotante Winner",
            formatter: (p) => {
              return <>{p.row?.totals_maxFloatingWinner ?? "N/A"}</>;
            },
          },
          {
            key: "floating_loser_order",
            name: "Flotante Loser",
            formatter: (p) => {
              return <>{p.row?.totals_maxFloatingLoser ?? "N/A"}</>;
            },
          },
          {
            key: "floating_extracted",
            name: "Fecha Balance",
            formatter: (p) => {
              const r = p.row?.totals_floatingOrders
                ? JSON.parse(p.row?.totals_floatingOrders)
                : null;
              const formattedDate =
                r && isset(r[0])
                  ? moment(r[0]?.createdAt).format("DD/MM/YYYY H:mm:ss")
                  : "";
              return <>{formattedDate}</>;
            },
          },
          {
            key: "total_contracts",
            name: "Contratos",
            formatter: (p) => {
              return <>{p.row?.totals_totalSize ?? 0}</>;
            },
          },
          {
            key: "total_commission_contracts",
            name: "Comision Contratos",
            formatter: (p) => {
              return (
                <>
                  {parseFloat(p.row?.totals_totalSize * 0.13).toFixed(2) ?? 0}
                </>
              );
            },
          },
          {
            key: "total_per_item",
            name: "Utilidad Por Activo",
            formatter: (p) => {
              const r = p.row?.totals_perItem
                ? JSON.parse(p.row?.totals_perItem)
                : null;

              let rMap = [];
              rMap = Object.keys(r).map((i) => {
                return {
                  item: i,
                  profit: parseFloat(r[i]?.profit).toFixed(2),
                  percent: r[i]?.profitPercent + "%",
                  qty: r[i]?.orders?.length ?? 0,
                };
              });
              log(rMap);

              return <>{JSON.stringify(rMap) ?? ""}</>;
            },
          },
          {
            key: "total_swap",
            name: "Total Swap",
            formatter: (p) => {
              return <>{p.row?.totals_totalSwap ?? 0}</>;
            },
          },
          {
            key: "total_opened_trades",
            name: "Opened Trades",
            formatter: (p) => {
              return <>{p.row?.totals_floatingOrders ?? "N/A"}</>;
            },
          },
          {
            key: "total_profit_ratio",
            name: "Profit Ratio",
            formatter: (p) => {
              const ratio = parseFloat(
                (p.row?.totals_totalGainers / p.row?.totals_totalPositions) *
                  100
              ).toFixed(2);
              return <>{ratio + "%" ?? 0}</>;
            },
          },
          {
            key: "total_long_ratio",
            name: "Long Ratio",
            formatter: (p) => {
              const ratio = parseFloat(
                (p.row?.totals_totalLongPositions /
                  p.row?.totals_totalPositions) *
                  100
              ).toFixed(2);
              return <>{ratio + "%" ?? 0}</>;
            },
          },
          {
            key: "total_short_ratio",
            name: "Short Ratio",
            formatter: (p) => {
              const ratio = parseFloat(
                (p.row?.totals_totalShortPositions /
                  p.row?.totals_totalPositions) *
                  100
              ).toFixed(2);
              return <>{ratio + "%" ?? 0}</>;
            },
          },
          {
            key: "total_loss_ratio",
            name: "Loss Ratio",
            formatter: (p) => {
              const ratio = parseFloat(
                (p.row?.totals_totalLosers /
                  p.row?.totals_totalPositions) *
                  100
              ).toFixed(2);
              return <>{ratio + "%" ?? 0}</>;
            },
          },
          {
            key: "total_qty_opened_trades",
            name: "Qty Opened Trades",
            formatter: (p) => {
              
              const r = p.row?.totals_floatingOrders
                ? JSON.parse(p.row?.totals_floatingOrders)
                : null;

              return <>{r?.length ?? 0}</>;
            },
          },
          {
            key: "total_ahpr",
            name: "AHPR",
            formatter: (p) => {
              const ratio = parseFloat(
                p.row?.totals_grossProfit / p.row?.totals_totalPositions
              ).toFixed(2);
              return <>{ratio ?? 0}</>;
            },
          },
          {
            key: "total_ghpr",
            name: "GHPR",
            formatter: (p) => {
              const ratio = parseFloat(
                p.row?.totals_grossLoss / p.row?.totals_totalPositions
              ).toFixed(2);
              return <>{ratio ?? 0}</>;
            },
          },
          {
            key: "total_worked_days",
            name: "T. Trades / Dias Trabajados",
            formatter: (p) => {
              
              const firstBotTrade = p.row?.totals_firstBotTrade
                ? JSON.parse(p.row?.totals_firstBotTrade)
                : null;

              const lastBotTrade = p.row?.totals_lastBotTrade
                ? JSON.parse(p.row?.totals_lastBotTrade)
                : null;

              const ratio = parseFloat(
                 p.row?.totals_totalPositions / 
                parseFloat(
                        moment
                          .duration(
                            moment(lastBotTrade?.openTime).diff(
                              firstBotTrade?.openTime
                            )
                          )
                          .asDays()
                      ).toFixed(2)
              ).toFixed(2);

              return <>{ratio ?? 0}</>;
            },
          },
          {
            key: "total_pips_gained",
            name: "Total Pips Ganados",
            formatter: (p) => {
              return <>Debe realizarse aparte</>;
            },
          },
        ];
        
        finalCols.unshift(SelectColumn);
        setColumns(finalCols);
        setAccounts(o);
        setRows(memoRows([...rows, ...o]));
      }
  });

  React.useEffect(() => {
    try {
      const query = buildFiltersQueryString({ ...filters, ...__filters }) ?? "";

      fetch("/api/mtaccounts?include=customer&where=" + query, {
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
    } catch (err) {
      log(err);
    }

    try {
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
    } catch (err) {
      log(err);
    }
  }, [store, filters, __filters, setCustomerGroups]);

  const handleRowsChange = (r) => {
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