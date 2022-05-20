import { isset, empty, log } from "../../utils/common";

export function buildFiltersQueryString(f) {
    const params = {};

    if (isset(f.customerId) && !empty(f.customerId)) {
      params.customerId = !Array.isArray(f.customerId)
        ? { $in: [f.customerId] }
        : { $in: f.customerId };
    }

    if (isset(f.account) && !empty(f.account)) {
      params.account = !Array.isArray(f.account) ? {$in:[f.account]} : { $in: f.account };
    }

    const dateFields = ["mtCreateAt", "createdAt"];

    dateFields.map((field) => {
      if (
        isset(f[`${field}From`]) &&
        !empty(f[`${field}From`]) &&
        isset(f[`${field}To`]) &&
        !empty(f[`${field}To`])
      ) {
        params[field] = { $gte: f[`${field}From`] };
        params.$and = params.$and ?? {};
        params.$and[field] = { $lte: f[`${field}To`] };
      } else if (isset(f[`${field}From`]) && !empty(f[`${field}From`])) {
        params[field] = { $gte: f[`${field}From`] };
      } else if (isset(f[`${field}To`]) && !empty(f[`${field}To`])) {
        params[field] = { $lte: f[`${field}To`] };
      }
    });

    const numberRangeFields = [
      "balance", 
      "credit", 
      "margin",
      "margin_assets",
      "margin_free",
      "margin_initial",
      "margin_level",
      "margin_maintenance",
      "margin_so_call",
      "margin_so_mode",
      "margin_so_so",
      "profit",
    ];

    numberRangeFields.map((field) => {
      if (
        isset(f[`${field}From`]) &&
        !empty(f[`${field}From`]) &&
        isset(f[`${field}To`]) &&
        !empty(f[`${field}To`])
      ) {
        params[field] = { $gte: parseFloat(f[`${field}From`]) };
        params.$and = params.$and ?? {};
        params.$and[field] = { $lte: parseFloat(f[`${field}To`]) };
      } else if (isset(f[`${field}From`]) && !empty(f[`${field}From`])) {
        params[field] = { $gte: parseFloat(f[`${field}From`]) };
      } else if (isset(f[`${field}To`]) && !empty(f[`${field}To`])) {
        params[field] = { $lte: parseFloat(f[`${field}To`]) };
      }
    });

    const numbersAsArraysFields = ["id","customerId","account"];

    numbersAsArraysFields.map((field) => {
      if (
        isset(f[`${field}`]) &&
        !empty(f[`${field}`]) &&
        Array.isArray(f[`${field}`]) &&
        !empty(f[`${field}`][0]) &&
        !isNaN(f[`${field}`][0])
      ) {
        params[field] = { $in: f[`${field}`] };
      }
    });

    const stringsAsArraysFields = ["server","company","name"];

    stringsAsArraysFields.map((field) => {
      if (
        isset(f[`${field}`]) &&
        !empty(f[`${field}`]) &&
        !Array.isArray(f[`${field}`])
      ) {
        params[field] = { $cont: f[`${field}`] };
      } else if (Array.isArray(f[`${field}`]) && f[`${field}`].length > 1) {
        
        params[field] = {
          $search: f[`${field}`].join("|"),
          mode: "insensitive",
        };
        
      } else if (Array.isArray(f[`${field}`]) && !empty(f[`${field}`][0])) {
        params[field] = { $cont: f[`${field}`][0] };
      }
    });

    if (isset(params.$and) && empty(params.$and)) delete params.$and;
    if (isset(params.$or) && empty(params.$or)) delete params.$or;


    return !empty(params) ? JSON.stringify(params) : JSON.stringify([]);
}