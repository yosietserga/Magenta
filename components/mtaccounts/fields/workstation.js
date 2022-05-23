import InputText from "../../layout/fields/inputText";

export default function FieldWorkstation(props) {
  const { handler, value } = props;

  return (
    <>
      <InputText
        handler={handler}
        value={value}
        form="mtaccounts"
        label="Workstation"
        fieldName="workstation"
        placeholder="PC 01"
      />
    </>
  );
}
