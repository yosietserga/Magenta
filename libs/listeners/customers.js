import { store } from "../../context/store";
import { isset, empty, log } from "../../utils/common";

store.on("updateCustomersFilters", (o) => {});

store.on("updateCustomersTotals", (o) => {});

store.on("updateCustomers", (o) => {
  if (!Array.isArray(o) || empty(Object.keys(o[0]))) {
    store.set("customers_totals", {});
    store.emit("updateCustomersTotals", {});
  } else {
    store.set("customers", o);
    store.set("customers_totals", {});
    store.emit("updateCustomersTotals", {});
  }
});