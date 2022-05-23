import InputText from "../../layout/fields/inputText";

export default function FieldUsername(props) {
  const { handler, value } = props;

  return (
    <>
      <InputText
        handler={handler}
        value={value}
        form="mtaccounts"
        label="Usuario"
        fieldName="username"
        placeholder="0123456789"
      />
    </>
  );
}
