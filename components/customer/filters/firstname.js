import React from "react";
import { Col, FormGroup, FormText, Label, Input } from "reactstrap";

export default function FilterFirstname(props) {
  const { setFilter } = props;
  const [__filters, setFilters] = React.useState({});

  const handler = (e) => {
    setFilter(e.currentTarget.value, "firstname");

    setFilters({
      ...__filters,
      ...{ firstname: e.currentTarget.value },
    });
  };

  return (
    <>
      <FormGroup row>
        <Col sm={2}>
          <Label for="firstname">
            <strong>Firstname</strong>
          </Label>
        </Col>
        <Col sm={8}>
          <Input id="firstname" value={__filters?.firstname ?? ""} onChange={handler} />
          <FormText color="muted">
            Input firstname names separated with comma
          </FormText>
        </Col>
      </FormGroup>
    </>
  );
}
