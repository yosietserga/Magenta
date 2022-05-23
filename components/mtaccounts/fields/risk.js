import InputSelect from "../../layout/fields/inputSelect";

export default function FieldRisk(props) {
  const { handler, value } = props;

  const options = [
    {
      label: "Bajo",
      key: 1,
      value: 1,
    },
    {
      label: "Medio",
      key: 2,
      value: 2,
    },
    {
      label: "Medio Alto",
      key: 3,
      value: 3,
    },
    {
      label: "Alto",
      key: 4,
      value: 4,
    },
    {
      label: "Muy Alto",
      key: 5,
      value: 5,
    },
  ];
  
  return (
    <>
      <InputSelect
        handler={handler}
        value={value}
        options={options}
        form="mtaccounts"
        label="Risk Level"
        fieldName="risk"
      />
    </>
  );
};