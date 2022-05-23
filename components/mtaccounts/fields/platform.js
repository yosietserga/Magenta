import InputSelect from "../../layout/fields/InputSelect";

export default function FieldPlatform(props) {
  const { handler, value } = props;

  const options = [
    {
      label: "MetaTrader 4",
      key: 0,
      value: "MetaTrader 4",
    },
    {
      label: "MetaTrader 5",
      key: 1,
      value: "MetaTrader 5",
    },
    {
      label: "NinjaTrader 7",
      key: 2,
      value: "NinjaTrader 7",
    },
    {
      label: "NinjaTrader 8",
      key: 3,
      value: "NinjaTrader 8",
    },
    {
      label: "Otro",
      key: 4,
      value: "Otro",
    },
  ];
  
  return (
    <>
      <InputSelect
        handler={handler}
        value={value}
        options={options}
        form="mtaccounts"
        label="Platform"
        fieldName="platform"
      />
    </>
  );
};