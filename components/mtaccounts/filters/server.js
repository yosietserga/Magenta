import React from "react";
import { Col, FormGroup, FormText, Label, Input } from "reactstrap";

export default function FilterServer(props) {
  const { setFilter } = props;
  const [__filters, setFilters] = React.useState({});

  const handler = (e) => {
    setFilter(e.currentTarget.value);

    setFilters({
      ...__filters,
      ...{ servers: e.currentTarget.value },
    });
  };

  return (
    <>
      <FormGroup row>
        <Col sm={2}>
          <Label for="servers">
            <strong>Servers</strong>
          </Label>
        </Col>
        <Col sm={8}>
          <Input id="servers" value={__filters?.servers ?? ""} onChange={handler} />
          <FormText color="muted">
            Input servers names separated with comma
          </FormText>
        </Col>
      </FormGroup>
    </>
  );
}
