import React from "react";
import { Col, Row } from "reactstrap";
import { StoreContext } from "../../context/store";
import MTCustomersList from "./list";
import MTAccountsList from "../mtaccounts/list";
import MTOrdersList from "../mtorders/list";
import MTOrdersTotals from "../mtorders/totals";
import { isset, empty, log } from "../../utils/common";

const PORT = process.env.PORT ?? 3000;
const baseurl =
  typeof process.env.VERCEL_ENV != "undefined" &&
  process.env.VERCEL_ENV == "production"
    ? process.env.BASE_URL
    : process.env.BASE_URL + ":" + PORT;


export default function CustomerReports(props) {
  const { data } = props;
  const [customerSelected, setCustomerSelected] = React.useState(0);
  const [accountSelected, setAccountSelected] = React.useState(0);

  const store = React.useContext(StoreContext);

  store.on("customer:selected", (__customers) => {
    setCustomerSelected(__customers);
  });

  store.on("account:selected", (accounts) => {
    setAccountSelected(accounts);
  });

  return (
    <>
      <Row>
        <Col sm={12}>
          <Row>
            <MTCustomersList />
          </Row>
        </Col>
      </Row>
      <Row>
        {!empty(customerSelected) && (
          <Col sm={12}>
            <Row>
              <MTAccountsList filters={{ customerId: customerSelected }} />
            </Row>
          </Col>
        )}
        {!empty(customerSelected) && !empty(accountSelected) && (
          <Col sm={12}>
            <Row>
              <MTOrdersList filters={{ account: accountSelected }} />
              <MTOrdersTotals />
            </Row>
          </Col>
        )}
      </Row>
    </>
  );
}
