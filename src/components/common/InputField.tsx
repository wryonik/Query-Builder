import Select from "./Select";

const InputField = ({
  type,
  selectedValue,
  options,
  setSelectedValue,
  disabled,
}: any) => {
  const inputFieldClass =
    "h-9 w-64 border border-ruleGroupBorder bg-ruleGroupBg text-base text-left rounded py-4 px-2";

  switch (type) {
    case "text":
      return (
        <input
          className={inputFieldClass}
          type="text"
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        />
      );
    case "select":
      return (
        <Select
          selectedOption={selectedValue}
          options={options}
          setSelectedOption={setSelectedValue}
          disabled={disabled}
        />
      );
    case "date":
      return (
        <input
          className={inputFieldClass}
          type="date"
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        />
      );
    default:
      return (
        <input
          className={inputFieldClass}
          type="text"
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        />
      );
  }
};

export default InputField;
