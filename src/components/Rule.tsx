import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../App";
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
  value?: string;
  id: string;
  type?: "rule";
  ruleGroupId: string;
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

const RuleComponent = ({
  field,
  condition,
  value,
  id,
  ruleGroupId,
}: RuleProps) => {
  const [selectedField, setSelectedField] = useState(field);
  const [seletedCondition, setSelectedCondition] = useState(condition);
  const [selectedValue, setSelectedValue] = useState(value);
  const { updateRuleGroup } = useContext(ModalContext);

  useEffect(() => {
    setSelectedField(field);
    setSelectedCondition(condition);
    setSelectedValue(value);
  }, [field, condition, value]);

  useEffect(() => {
    updateRuleGroup(ruleGroupId, id, "UPDATE_RULE", {
      field: selectedField,
      condition: seletedCondition,
      value: selectedValue,
    });
  }, [selectedField, selectedValue, seletedCondition]);

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
            selectedOption={seletedCondition}
            options={conditionOptions}
            setSelectedOption={setSelectedCondition}
          />
        </div>
        <div className="w-64 flex flex-col mr-4">
          <label className="font-medium text-xs mb-2">Criteria</label>
          <Select
            selectedOption={selectedValue}
            options={conditionOptions}
            setSelectedOption={setSelectedValue}
          />
        </div>
      </div>
    </>
  );
};

export default RuleComponent;
