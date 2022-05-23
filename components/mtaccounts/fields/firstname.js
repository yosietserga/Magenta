import InputText from "../../layout/fields/inputText";

export default function FieldFirstname(props) {
  const { handler, value } = props;

  return (
    <>
      <InputText
        handler={handler}
        value={value}
        form="mtaccounts"
        label="Nombres"
        fieldName="firstname"
        placeholder="Ingresa los nombres"
      />
    </>
  );
}
