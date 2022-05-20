import React from "react";
import { Col, FormGroup, FormText, Input, Label } from "reactstrap";

export default function FilterPnL( props ) {
  const { setFilter } = props;
  const [__filters, setFilters] = React.useState({});
  
  const handlePnLFrom = (e) => {
    setFilter(e.currentTarget.value, "profitFrom");

    setFilters({
      ...__filters,
      ...{ pnLFrom: e.currentTarget.value },
    });
  };
  
  const handlePnLTo = (e) => {
    setFilter(e.currentTarget.value, "profitTo");
    
    setFilters({
      ...__filters,
      ...{ pnLTo: e.currentTarget.value },
    });
  };

  return (
    <>
      <FormGroup row>
        <Col sm={2}>
          <Label for="pnL">
            <strong>Profit and Loss</strong>
            <br />
            <small>[From, To]</small>
          </Label>
        </Col>
        <Col sm={4}>
          <Input
            id="pnLFrom"
            value={__filters?.pnLFrom ?? ""}
            onChange={handlePnLFrom}
          />
          <FormText color="muted">From this amount</FormText>
        </Col>
        <Col sm={4}>
          <Input
            id="pnLTo"
            value={__filters?.pnLTo ?? ""}
            onChange={handlePnLTo}
          />
          <FormText color="muted">Until this amount</FormText>
        </Col>
      </FormGroup>
    </>
  );
}