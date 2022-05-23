import InputText from "../../layout/fields/inputText";

export default function FieldLastname(props) {
  const { value } = props;

  return (
    <>
      <InputText
        handler={() => {}}
        value={value}
        form="mtaccounts"
        label="Account Name"
        fieldName="name"
        disabled="true"
      />
    </>
  );
}
