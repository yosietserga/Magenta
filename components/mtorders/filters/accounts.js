import React from "react";
import { Col, FormGroup, FormText, Label, Input } from "reactstrap";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { isset, empty, log } from "../../../utils/common";
import { StoreContext } from "../../../context/store";



export default function FilterAccount( props ) {
  const { setFilter, filters } = props;
  const [__filters, setFilters] = React.useState(Object.assign({}, filters));
  const [accounts, setAccounts] = React.useState();

  const store = React.useContext(StoreContext);
  log({ filters });

  const getAccountsNumbersAsArray = (accountsStr) => {
    return typeof accountsStr === "string"
      ? accountsStr.split(",").map((item) => {
          return parseInt(item.trim().replace(/\D/gi, ""));
        })
      : Array.isArray(accountsStr) && !empty(accountsStr)
      ? accountsStr
      : [];
  }
  const handleOnSelect = (e) => {
    setFilter(v);

    setFilters({
      ...__filters,
      ...{ account: v },
    });
  };

  const handleOnSearch = (searchStr, results) => {
    const params = {};
    let accounts = getAccountsNumbersAsArray(searchStr);
    log({accounts, searchStr, results});
    if (accounts.length > 0 && !empty(accounts[0]) && !isNaN(accounts[0])) {

      params.account = !Array.isArray(accounts)
        ? { $in: [accounts] }
        : { $in: accounts };

      searchAccounts(params);
    } else {
      //clearSearch
    }
  };

  const handleOnHover = (result) => {
    // the item hovered
    console.log("handleOnHover",result);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const searchAccounts = React.useCallback(
    (params) => {
      const query = !empty(params)
        ? JSON.stringify(params)
        : JSON.stringify([]);
      log({query});
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
    },
    [store]
  );

  store.on("updateAccounts", (__accounts) => {
    log({__accounts});
    setAccounts(__accounts);
  });

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          id: {item.id}
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          name: {item.name}
        </span>
      </>
    );
  };
  //1218794639
  return (
    <>
      <FormGroup row>
        <Col sm={2}>
          <Label for="tickets">
            <strong>Accounts</strong>
          </Label>
        </Col>
        <Col sm={8}>
          <ReactSearchAutocomplete
            items={accounts}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            inputSearchString={filters.account}
            autoFocus
            formatResult={formatResult}
          />

          <FormText color="muted">
            Input accounts numbers separated with comma
          </FormText>
        </Col>
      </FormGroup>
    </>
  );
}