import InputText from "../../layout/fields/inputText";

export default function FieldEmail(props) {
  const { handler, value } = props;

  return (
    <>
      <InputText
        handler={handler}
        value={value}
        form="mtaccounts"
        label="Email"
        fieldName="email"
        placeholder="Ingresa el email"
      />
    </>
  );
}
