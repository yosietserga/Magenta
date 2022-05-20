import React from "react";
import { Col, FormGroup, FormText, Label, Input } from "reactstrap";

export default function FilterPhone(props) {
  const { setFilter } = props;
  const [__filters, setFilters] = React.useState({});

  const handler = (e) => {
    setFilter(e.currentTarget.value, "phone");

    setFilters({
      ...__filters,
      ...{ phone: e.currentTarget.value },
    });
  };

  return (
    <>
      <FormGroup row>
        <Col sm={2}>
          <Label for="phone">
            <strong>Phone</strong>
          </Label>
        </Col>
        <Col sm={8}>
          <Input id="phone" value={__filters?.phone ?? ""} onChange={handler} />
          <FormText color="muted">
            Input phone names separated with comma
          </FormText>
        </Col>
      </FormGroup>
    </>
  );
}
