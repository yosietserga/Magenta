import InputPassword from "../../layout/fields/inputPassword";

export default function FieldFirstname(props) {
  const { handler, value } = props;

  return (
    <>
      <InputPassword
        handler={handler}
        value={value}
        form="mtaccounts"
        label="Password"
        fieldName="password"
      />
    </>
  );
};