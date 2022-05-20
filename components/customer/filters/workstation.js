import React from "react";
import { Col, FormGroup, FormText, Label, Input } from "reactstrap";

export default function FilterWorkstation(props) {
  const { setFilter } = props;
  const [__filters, setFilters] = React.useState({});

  const handler = (e) => {
    setFilter(e.currentTarget.value, "workstation");

    setFilters({
      ...__filters,
      ...{ workstation: e.currentTarget.value },
    });
  };

  return (
    <>
      <FormGroup row>
        <Col sm={2}>
          <Label for="workstation">
            <strong>Workstation</strong>
          </Label>
        </Col>
        <Col sm={8}>
          <Input id="workstation" value={__filters?.workstation ?? ""} onChange={handler} />
          <FormText color="muted">
            Input workstation names separated with comma
          </FormText>
        </Col>
      </FormGroup>
    </>
  );
}
