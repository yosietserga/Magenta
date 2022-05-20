import React from "react";
import { Col, FormGroup, FormText, Label, Input } from "reactstrap";

export default function FilterEmail(props) {
  const { setFilter } = props;
  const [__filters, setFilters] = React.useState({});

  const handler = (e) => {
    setFilter(e.currentTarget.value, "email");

    setFilters({
      ...__filters,
      ...{ email: e.currentTarget.value },
    });
  };

  return (
    <>
      <FormGroup row>
        <Col sm={2}>
          <Label for="email">
            <strong>Email</strong>
          </Label>
        </Col>
        <Col sm={8}>
          <Input id="email" value={__filters?.email ?? ""} onChange={handler} />
          <FormText color="muted">
            Input email names separated with comma
          </FormText>
        </Col>
      </FormGroup>
    </>
  );
}
