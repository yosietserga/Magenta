import React from "react";
import { Col, Row } from "reactstrap";
import { StoreContext } from "../../context/store";
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

export default function CustomerInfo( props ) {
  const { data } = props;
  const [accountSelected, setAccountSelected] = React.useState(0);

  const store = React.useContext(StoreContext);
  store.set("orders", []);
    
  store.on("account:selected", (accounts)=>{
    setAccountSelected(accounts)
  });
  
  return (
    <>
      <Row>
        <Col sm={12}>
          <Row>
            <div className="block">
              <h2>{props.title}</h2>
              <ul>
                {data.mtaccounts.map((item, k) => {
                  return (
                    <li key={k + "_" + item.uuid}>
                      <span>UUID: {item.uuid}</span>
                      <span>Nombre: {item.name}</span>
                      <span>Username: {item.username}</span>
                      <hr />
                    </li>
                  );
                })}
              </ul>
            </div>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Row>
            <MTAccountsList
              filters={{ customerId: data.id }}
              data={data.mtaccounts}
            />
          </Row>
        </Col>
        {!empty(accountSelected) && (
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