import { useState } from "react";
import Select from "./Select";

export interface RuleProps {
  field?:
    | "Theme"
    | "Sub-theme"
    | "Reason"
    | "Language"
    | "Source"
    | "Rating"
    | "Time Period"
    | "Customer ID";
  condition?:
    | "Equals"
    | "Does not equal"
    | "Like"
    | "Not like"
    | "Is Empty"
    | "Is"
    | "Is not";
  value?: string[];
  type?: "rule";
}

const fieldOptions = [
  "Theme",
  "Sub-theme",
  "Reason",
  "Language",
  "Source",
  "Rating",
  "Time Period",
  "Customer ID",
];

const conditionOptions = [
  "Equals",
  "Does not equal",
  "Like",
  "Not like",
  "Is Empty",
  "Is",
  "Is not",
];

const RuleComponent = ({ field, condition, value, type }: RuleProps) => {
  const [selectedField, setSelectedField] = useState("");
  const [seletedOperator, setSelectedOperator] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <>
      <div className="py-4 flex flex-row text-left">
        <div className="w-64 flex flex-col mr-4">
          <label className="font-medium text-xs mb-2">Field</label>
          <Select
            selectedOption={selectedField}
            options={fieldOptions}
            setSelectedOption={setSelectedField}
          />
        </div>
        <div className="w-64 flex flex-col mr-4">
          <label className="font-medium text-xs mb-2">Condition</label>
          <Select
            selectedOption={seletedOperator}
            options={conditionOptions}
            setSelectedOption={setSelectedOperator}
          />
        </div>
        <div className="w-64 flex flex-col mr-4">
          <label className="font-medium text-xs mb-2">Criteria</label>
          <Select
            selectedOption={selectedValue}
            options={conditionOptions}
            setSelectedOption={setSelectedOperator}
          />
        </div>
      </div>
    </>
  );
};

export default RuleComponent;
