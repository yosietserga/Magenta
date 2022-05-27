import InputText from "../../layout/fields/inputText";

export default function FieldAccount(props) {
  const { handler, value } = props;

  return (
    <>
      <InputText
        handler={handler}
        value={value}
        form="mtaccounts"
        label="Account Number"
        fieldName="account"
        placeholder="0123456789"
      />
    </>
  );
}
