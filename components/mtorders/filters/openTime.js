import React from "react";
import { Col, FormGroup, FormText, Label } from "reactstrap";
import DatePicker from  "reactstrap-date-picker";


export default function FilterOpenTime( props ) {
  const { setFilter } = props;
  const [__filters, setFilters] = React.useState({});
  
  const handleOpenTimeFrom = (iso, formatted) => {
    setFilter(iso, "openTimeFrom");

    setFilters({
      ...__filters,
      ...{ openTimeFrom: iso },
    });
  };
  
  const handleOpenTimeTo = (iso, formatted) => {
    setFilter(iso, "openTimeTo");
    
    setFilters({
      ...__filters,
      ...{ openTimeTo: iso },
    });
  };

  return (
    <>
      <FormGroup row>
        <Col sm={2}>
          <Label for="openTime">
            <strong>Open Time</strong>
            <br />
            <small>[From, To]</small>
          </Label>
        </Col>
        <Col sm={4}>
          <DatePicker
            id="openTimeFrom"
            value={__filters?.openTimeFrom ?? ""}
            onChange={(isoData, formattedDate) => {
              handleOpenTimeFrom(isoData, formattedDate);
            }}
          />
          <FormText color="muted">From this date and after</FormText>
        </Col>
        <Col sm={4}>
          <DatePicker
            id="openTimeTo"
            value={__filters?.openTimeTo ?? ""}
            onChange={(isoData, formattedDate) => {
              handleOpenTimeTo(isoData, formattedDate);
            }}
          />
          <FormText color="muted">Until this date and before</FormText>
        </Col>
      </FormGroup>
    </>
  );
}