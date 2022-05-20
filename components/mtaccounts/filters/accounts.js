import React from "react";
import { Col, FormGroup, FormText, Label, Input } from "reactstrap";


export default function FilterAccount( props ) {
  const { setFilter } = props;
  const [__filters, setFilters] = React.useState({});
  
  const handler = (e) => {
    setFilter(e.currentTarget.value, "account");

    setFilters({
      ...__filters,
      ...{ accounts: e.currentTarget.value },
    });
  };
  
  return (
    <>
      <FormGroup row>
        <Col sm={2}>
          <Label for="accounts">
            <strong>Accounts</strong>
          </Label>
        </Col>
        <Col sm={8}>
          <Input
            id="accounts"
            value={__filters?.accounts ?? ""}
            onChange={handler}
          />
          <FormText color="muted">Input accounts numbers separated with comma</FormText>
        </Col>
      </FormGroup>
    </>
  );
}