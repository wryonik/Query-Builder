import { useEffect, useState } from "react";
import DownArrow from "assets/downArrow.svg";

interface SelectProps {
  options: string[];
  selectedOption: string;
  setSelectedOption: any;
  disabled?: boolean;
}

const defaultProps = {
  options: [],
  selectedOption: "",
};

const Select = ({
  options,
  selectedOption,
  setSelectedOption,
  disabled,
}: SelectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown relative">
      <div
        className="dropdown-toggle h-9 bg-selectFieldGrey text-backgroundText text-sm p-2 rounded font-medium flex justify-between"
        onClick={() => {
          if (!disabled) setOpen(!open);
        }}
      >
        {selectedOption ? selectedOption : "Select One"}
        <img className="w-2 ml-2" src={DownArrow} alt="" />
      </div>
      <ul
        className={`
          dropdown-menu border border-ruleGroupBorder min-w-max absolute bg-ruleGroupBg text-base z-50 text-left rounded mt-3 py-4 px-2 w-full
          ${open ? "" : "hidden"}
        `}
      >
        {options.map((option: string) => (
          <li
            key={option}
            onClick={() => {
              setOpen(false);
              setSelectedOption(option);
            }}
            className="dropdown-item rounded text-sm p-1 px-2 font-normal block w-full whitespace-nowrap bg-ruleGroupBg text-white hover:bg-selectHoverColor"
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

Select.defaultProps = defaultProps;

export default Select;
