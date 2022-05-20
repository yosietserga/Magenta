import React from "react";
import { Col, FormGroup, FormText, Label } from "reactstrap";
import DatePicker from  "reactstrap-date-picker";


export default function FilterMtCreateAt( props ) {
  const { setFilter } = props;
  const [__filters, setFilters] = React.useState({});
  
  const handleMtCreateAtFrom = (iso, formatted) => {
    setFilter(iso, "mtCreateAtFrom");
    
    setFilters({
      ...__filters,
      ...{ mtCreateAtFrom: iso },
    });
  };
  
  const handleMtCreateAtTo = (iso, formatted) => {
    setFilter(iso, "mtCreateAtTo");
    setFilters({
      ...__filters,
      ...{ mtCreateAtTo: iso },
    });
  };

  return (
    <>
      <FormGroup row>
          <Col sm={2}>
            <Label for="mtCreateAt">
              <strong>MT Create At</strong>
              <br />
              <small>[From, To]</small>
            </Label>
          </Col>
          <Col sm={4}>
            <DatePicker
              id="mtCreateAtFrom"
              value={__filters?.mtCreateAtFrom ?? ""}
              onChange={(isoData, formattedDate) => {
                handleMtCreateAtFrom(isoData, formattedDate);
              }}
            />
            <FormText color="muted">From this date and after</FormText>
          </Col>
          <Col sm={4}>
            <DatePicker
              id="mtCreateAtTo"
              value={__filters?.mtCreateAtTo ?? ""}
              onChange={(isoData, formattedDate) => {
                handleMtCreateAtTo(isoData, formattedDate);
              }}
            />
            <FormText color="muted">Until this date and before</FormText>
          </Col>
      </FormGroup>
    </>
  );
}