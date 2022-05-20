import React from "react";
import { Col, FormGroup, FormText, Label } from "reactstrap";
import DatePicker from  "reactstrap-date-picker";


export default function FilterCloseTime( props ) {
  const { setFilter } = props;
  const [__filters, setFilters] = React.useState({});
  
  const handleCloseTimeFrom = (iso, formatted) => {
    setFilter(iso, "closeTimeFrom");

    setFilters({
      ...__filters,
      ...{ closeTimeFrom: iso },
    });
  };
  
  const handleCloseTimeTo = (iso, formatted) => {
    setFilter(iso, "closeTimeTo");
    setFilters({
      ...__filters,
      ...{ closeTimeTo: iso },
    });
  };

  return (
    <>
      <FormGroup row>
          <Col sm={2}>
            <Label for="closeTime">
              <strong>Close Time</strong>
              <br />
              <small>[From, To]</small>
            </Label>
          </Col>
          <Col sm={4}>
            <DatePicker
              id="closeTimeFrom"
              value={__filters?.closeTimeFrom ?? ""}
              onChange={(isoData, formattedDate) => {
                handleCloseTimeFrom(isoData, formattedDate);
              }}
            />
            <FormText color="muted">From this date and after</FormText>
          </Col>
          <Col sm={4}>
            <DatePicker
              id="closeTimeTo"
              value={__filters?.closeTimeTo ?? ""}
              onChange={(isoData, formattedDate) => {
                handleCloseTimeTo(isoData, formattedDate);
              }}
            />
            <FormText color="muted">Until this date and before</FormText>
          </Col>
      </FormGroup>
    </>
  );
}