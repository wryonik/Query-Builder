import { useState } from "react";
import Button from "./Button";
import RuleComponent from "./Rule";
import TabGroup from "./TabGroup";
import DeleteIcon from "../assets/delete.svg";

export interface RuleGroupProps {
  children: (RuleGroupProps | RuleProps)[];
  conjunction: "AND" | "OR";
  not: boolean;
  type: "rule_group";
}

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
  type: "rule";
}

type FixMeLater = any;

const conjunctionOptions = ["AND", "OR"];

const newRule = {
  field: "Theme",
  condition: "Equals",
  value: [],
  type: "rule",
};

const RuleGroup = ({ children, conjunction, not }: RuleGroupProps) => {
  const [components, setComponents] = useState<FixMeLater>([
    {
      field: "Theme",
      condition: "Equals",
      value: ["test", "test2"],
      type: "rule",
    },
  ]);

  const [operation, setOperation] = useState("AND");

  return (
    <div className="bg-ruleGroupBg m-2 rounded p-4 flex flex-col border border-ruleGroupBorder">
      {components.length > 1 ? (
        <TabGroup
          options={conjunctionOptions}
          selectedTab={operation}
          setSelectedTab={setOperation}
        />
      ) : null}
      {components.map((componentInfo: FixMeLater, idx: any) => {
        return (
          <div className="flex flex-row items-end">
            {componentInfo.type === "rule" ? (
              <RuleComponent
                field={componentInfo.field}
                condition={componentInfo.condition}
                value={componentInfo.value}
                type="rule"
              />
            ) : (
              <RuleGroup
                children={componentInfo.children}
                conjunction={componentInfo.conjunction}
                not={componentInfo.not}
                type="rule_group"
              />
            )}
            <img
              onClick={() => {
                setComponents(components.splice(idx, 1));
              }}
              src={DeleteIcon}
              className="w-9 h-9 p-1 my-4 rounded bg-selectFieldGrey"
            />
          </div>
        );
      })}
      <Button
        label="+ Add filter"
        onClick={() => setComponents([...components, newRule])}
      />
    </div>
  );
};

export default RuleGroup;
