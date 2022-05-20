import React from "react";
import { Col, FormGroup, FormText, Label, Input } from "reactstrap";


export default function FilterItem( props ) {
  const { setFilter } = props;
  const [__filters, setFilters] = React.useState({});
  
  const handler = (e) => {
    setFilter(e.currentTarget.value?.toUpperCase(), "item");

    setFilters({
      ...__filters,
      ...{ items: e.currentTarget.value },
    });
  };
  
  return (
    <>
      <FormGroup row>
        <Col sm={2}>
          <Label for="items">
            <strong>Items</strong>
          </Label>
        </Col>
        <Col sm={8}>
          <Input
            id="items"
            value={__filters?.items ?? ""}
            onChange={handler}
          />
          <FormText color="muted">Input items or pairs separated with comma</FormText>
        </Col>
      </FormGroup>
    </>
  );
}