import InputText from "../../layout/fields/inputText";

export default function FieldServer(props) {
  const { handler, value } = props;

  return (
    <>
      <InputText
        handler={handler}
        value={value}
        form="mtaccounts"
        label="Servidor"
        fieldName="server"
        placeholder="Ejemplo: Swissquote-Demo1"
      />
    </>
  );
}
