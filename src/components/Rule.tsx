import { useContext, useEffect, useState } from "react";
import { ModalContext } from "./QueryBuilder";
import Select from "./common/Select";
import { IFilter } from "./types";
import InputField from "./common/InputField";

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

const RuleComponent = ({
  field,
  condition,
  value,
  id,
  ruleGroupId,
}: RuleProps) => {
  const [selectedField, setSelectedField] = useState(field);
  const [seletedCondition, setSelectedCondition] = useState(
    condition || "Equals"
  );
  const [selectedValue, setSelectedValue] = useState(value);
  const [filterOptions, setFilterOptions] = useState<IFilter>();
  const { updateRuleGroup, filtersConfig } = useContext(ModalContext);

  useEffect(() => {
    let newFilterOptions: IFilter =
      filtersConfig.find((filter: IFilter) => filter.field === selectedField) ||
      filtersConfig[0];
    setFilterOptions(newFilterOptions);
    setSelectedCondition("Equals");
    setSelectedValue("");
  }, [selectedField]);

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
            options={filtersConfig.map((filter: IFilter) => filter.field)}
            setSelectedOption={setSelectedField}
          />
        </div>
        <div className="w-64 flex flex-col mr-4">
          <label className="font-medium text-xs mb-2">Condition</label>
          <Select
            disabled={!selectedField}
            selectedOption={seletedCondition}
            options={filterOptions?.conditions}
            setSelectedOption={setSelectedCondition}
          />
        </div>
        <div className="w-64 flex flex-col mr-4">
          <label className="font-medium text-xs mb-2">Criteria</label>
          <InputField
            selectedValue={selectedValue}
            options={filterOptions?.options}
            setSelectedValue={setSelectedValue}
            disabled={!selectedField}
            type={filterOptions?.type}
          />
        </div>
      </div>
    </>
  );
};

export default RuleComponent;
