import React from "react";
import { Col, FormGroup, FormText, Label, Input } from "reactstrap";


export default function FilterTicket( props ) {
  const { setFilter } = props;
  const [__filters, setFilters] = React.useState({});
  
  const handler = (e) => {
    setFilter(e.currentTarget.value);

    setFilters({
      ...__filters,
      ...{ tickets: e.currentTarget.value },
    });
  };
  
  return (
    <>
      <FormGroup row>
        <Col sm={2}>
          <Label for="tickets">
            <strong>Tickets</strong>
          </Label>
        </Col>
        <Col sm={8}>
          <Input
            id="tickets"
            value={__filters?.tickets ?? ""}
            onChange={handler}
          />
          <FormText color="muted">Input tickets numbers separated with comma</FormText>
        </Col>
      </FormGroup>
    </>
  );
}