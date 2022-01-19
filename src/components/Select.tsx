import { useState } from "react";
import DownArrow from "../assets/downArrow.svg";

const Select = ({ options, selectedOption, setSelectedOption }: any) => {
  const [open, setOpen] = useState(false);

  return (
    // <select
    //   className="bg-selectFieldGrey text-white text-sm p-2 rounded"
    //   onChange={(e) => setSelectedOption(e.target.value)}
    // >
    //   {options.map((option: any) => (
    //     <option className="rounded bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
    //       {option}
    //     </option>
    //   ))}
    // </select>
    <div className="dropdown relative ">
      <div
        className="dropdown-toggle bg-selectFieldGrey text-backgroundText text-sm p-2 rounded font-medium flex justify-between"
        onClick={() => setOpen(!open)}
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
        {options.map((option: any) => (
          <li
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

export default Select;
