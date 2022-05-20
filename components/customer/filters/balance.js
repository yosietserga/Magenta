import React from "react";
import { Col, FormGroup, FormText, Input, Label } from "reactstrap";

export default function FilterBalance( props ) {
  const { setFilter } = props;
  const [__filters, setFilters] = React.useState({});
  
  const handleBalanceFrom = (e) => {
    setFilter(e.currentTarget.value, "balanceFrom");
    setFilters({
      ...__filters,
      ...{ balanceFrom: e.currentTarget.value },
    });
  };
  
  const handleBalanceTo = (e) => {
    setFilter(e.currentTarget.value, "balanceTo");
    setFilters({
      ...__filters,
      ...{ balanceTo: e.currentTarget.value },
    });
  };

  return (
    <>
      <FormGroup row>
        <Col sm={2}>
          <Label for="balance">
            <strong>Balance</strong>
            <br />
            <small>[From, To]</small>
          </Label>
        </Col>
        <Col sm={4}>
          <Input
            id="balanceFrom"
            value={__filters?.balanceFrom ?? ""}
            onChange={handleBalanceFrom}
          />
          <FormText color="muted">From this amount</FormText>
        </Col>
        <Col sm={4}>
          <Input
            id="balanceTo"
            value={__filters?.balanceTo ?? ""}
            onChange={handleBalanceTo}
          />
          <FormText color="muted">Until this amount</FormText>
        </Col>
      </FormGroup>
    </>
  );
}