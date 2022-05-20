import React from "react";
import { Col, Row } from "reactstrap";
import { StoreContext } from "../../context/store";
import DataGrid from "react-data-grid";
import { isset, empty, log } from "../../utils/common";
import { exportToCsv } from "../../utils/exportFile.ts";
import { Button } from "reactstrap";


export default function MTOrdersTotals() {
  const store = React.useContext(StoreContext);
  const [totals, setTotals] = React.useState({});


  store.on("updateOrdersTotals", (data) => {
    setTotals(data);
  });

  const initialDepositTable = isset(totals?.initialDeposit) && (
    <DataGrid
      columns={Object.keys(totals?.initialDeposit).map((item) => {
        return { key: item, name: item };
      })}
      rows={[totals?.initialDeposit]}
      className="fill-grid rdg-light"
    />
  );

  const depositsTable = !empty(totals?.deposits) && (
    <DataGrid
      columns={Object.keys(totals?.deposits[0]).map((item) => {
        return { key: item, name: item };
      })}
      rows={totals?.deposits}
      className="fill-grid rdg-light"
    />
  );
  

  const maxWinnerTable = isset(totals?.maxWinner) && (
    <DataGrid
      columns={Object.keys(totals?.maxWinner).map((item) => {
        return { key: item, name: item };
      })}
      rows={[totals?.maxWinner]}
      className="fill-grid rdg-light"
    />
  );

  const winnersTable = !empty(totals?.consecutiveWinners) && (
    <DataGrid
      columns={Object.keys(totals?.consecutiveWinners[0]).map((item) => {
        return { key: item, name: item };
      })}
      rows={totals?.consecutiveWinners}
      className="fill-grid rdg-light"
    />
  );
  

  const maxLoserTable = isset(totals?.maxLoser) && (
    <DataGrid
      columns={Object.keys(totals?.maxLoser).map((item) => {
        return { key: item, name: item };
      })}
      rows={[totals?.maxLoser]}
      className="fill-grid rdg-light"
    />
  );

  const losersTable = !empty(totals?.consecutiveLosers) && (
    <DataGrid
      columns={Object.keys(totals?.consecutiveLosers[0]).map((item) => {
        return { key: item, name: item };
      })}
      rows={totals?.consecutiveLosers}
      className="fill-grid rdg-light"
    />
  );
  
  const longPositionsTable = !empty(totals?.longs) && (
    <DataGrid
      columns={Object.keys(totals?.longs[0]).map((item) => {
        return { key: item, name: item };
      })}
      rows={totals?.longs}
      className="fill-grid rdg-light"
    />
  );
  
  const shortPositionsTable = !empty(totals?.shorts) && (
    <DataGrid
      columns={Object.keys(totals?.shorts[0]).map((item) => {
        return { key: item, name: item };
      })}
      rows={totals?.shorts}
      className="fill-grid rdg-light"
    />
  );


  
  return (
    <>
      <div className="block">
        <h2>Resumen</h2>
        <Row>
          <Col sm={3}>Balance: {parseFloat(totals.balance).toFixed(2)}</Col>
          <Col sm={3}>
            Gross Loss: {parseFloat(totals.grossLoss).toFixed(2)}
          </Col>
          <Col sm={3}>
            Gross Profit: {parseFloat(totals.grossProfit).toFixed(2)}
          </Col>
          <Col sm={3}>
            Net Profit: {parseFloat(totals.totalProfit).toFixed(2)}
          </Col>
        </Row>
      </div>
      <div className="block">
        <h2>Deposits</h2>
        <Row>
          <Col sm={4}>
            Total Balance Deposits:{" "}
            {parseFloat(totals.totalDeposits).toFixed(2)}
          </Col>
          <Col sm={4}>Total Count Deposits: {totals.deposits?.length}</Col>
          <Col sm={12}>
            Initial Deposit:
            {initialDepositTable}
          </Col>
          <Col sm={12}>All Deposits: {depositsTable}</Col>
        </Row>
      </div>
      <div className="block">
        <h2>Profit and Risk Factors</h2>
        <Row>
          <Col sm={3}>
            Profit Factor: {parseFloat(totals.profit_factor).toFixed(2)}
          </Col>
          <Col sm={3}>
            AVG Profit Factor: {parseFloat(totals.avg_profit_factor).toFixed(2)}
          </Col>
          <Col sm={3}>
            Risk Factor: {parseFloat(totals.risk_factor).toFixed(2)}
          </Col>
          <Col sm={3}>
            Maximun Drawndown (%): {parseFloat(totals.mdd).toFixed(2)} ({" "}
            {parseFloat(totals.mdd_percent).toFixed(2)}%)
          </Col>
        </Row>
      </div>
      <div className="block">
        <h2>Ganadores</h2>
        <Row>
          <Col sm={3}>Gainers Positions: {parseInt(totals.totalGainers)}</Col>
          <Col sm={3}>
            Top Gain: {parseFloat(totals.hhProfitLoss).toFixed(2)}
          </Col>
          <Col sm={12}>Top Gainer: {maxWinnerTable}</Col>
          <Col sm={12}>Top Consecutive Gainers: {winnersTable}</Col>
        </Row>
      </div>
      <div className="block">
        <h2>Perdedores</h2>
        <Row>
          <Col sm={3}>Loss Positions: {parseInt(totals.totalLosers)}</Col>
          <Col sm={3}>
            Top Loss: {parseFloat(totals.hlProfitLoss).toFixed(2)}
          </Col>
          <Col sm={12}>Top Loser: {maxLoserTable}</Col>
          <Col sm={12}>Top Consecutive Losers: {losersTable}</Col>
        </Row>
      </div>
      <div className="block">
        <h2>Long Positions</h2>
        <Row>
          <Col sm={12}>
            <p>Total Positions: {totals.longs?.length}</p>

            {longPositionsTable}
          </Col>
        </Row>
      </div>
      <div className="block">
        <h2>Short Positions</h2>
        <Row>
          <Col sm={12}>
            <p>Total Positions: {totals.shorts?.length}</p>

            {shortPositionsTable}
          </Col>
        </Row>
      </div>
    </>
  );
}