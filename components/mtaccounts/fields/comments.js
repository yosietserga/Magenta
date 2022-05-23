import InputTextArea from "../../layout/fields/inputTextArea";

export default function FieldComments(props) {
  const { handler, value } = props;

  return (
    <>
      <InputTextArea
        handler={handler}
        value={value}
        form="mtaccounts"
        label="Comentarios"
        fieldName="comments"
        placeholder="Ingresa cualquier comentario u observación adicional"
      />
    </>
  );
}
