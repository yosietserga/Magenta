import InputSelect from "../../layout/fields/inputSelect";

export default function FieldCommission(props) {
  const { handler, value } = props;

  const options = [
    {
      label: "No",
      key: 0,
      value: 0,
    },
    {
      label: "Yes",
      key: 1,
      value: 1,
    },
  ];
  
  return (
    <>
      <InputSelect
        handler={handler}
        value={value}
        options={options}
        form="mtaccounts"
        label="Pays Commission"
        fieldName="commission"
      />
    </>
  );
};