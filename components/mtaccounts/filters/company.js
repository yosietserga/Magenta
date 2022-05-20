import React from "react";
import { Col, FormGroup, FormText, Label, Input } from "reactstrap";

export default function FilterCompany(props) {
  const { setFilter } = props;
  const [__filters, setFilters] = React.useState({});

  const handler = (e) => {
    setFilter(e.currentTarget.value, "company");

    setFilters({
      ...__filters,
      ...{ companies: e.currentTarget.value },
    });
  };

  return (
    <>
      <FormGroup row>
        <Col sm={2}>
          <Label for="companies">
            <strong>Company</strong>
          </Label>
        </Col>
        <Col sm={8}>
          <Input id="companies" value={__filters?.companies ?? ""} onChange={handler} />
          <FormText color="muted">
            Input companies names separated with comma
          </FormText>
        </Col>
      </FormGroup>
    </>
  );
}
