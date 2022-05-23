import { useState, useEffect, useCallback } from "react";
import InputSelect from "../../layout/fields/inputSelect";

export default function FieldCustomer(props) {
  const { handler, value } = props;
  const [options, setOptions] = useState([]);

  const fetchCustomers = useCallback(() => {
    fetch("/api/customers")
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp) {
          setOptions(
            resp.map((opt) => {
              return {
                label:
                  opt.firstname + " " + opt.lastname + " <" + opt.email + ">",
                key: opt.uuid,
                value: opt.id,
              };
            })
          );
        } else {
          setOptions([]);
        }
      });
  }, [setOptions]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return (
    <>
      <InputSelect
        handler={handler}
        value={value}
        options={options}
        form="mtaccounts"
        label="Customer"
        fieldName="customerId"
      />
    </>
  );
};