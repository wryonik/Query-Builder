import { useEffect, useState } from "react";
import Button from "./Button";
import RuleComponent from "./Rule";
import TabGroup from "./TabGroup";
import DeleteIcon from "../assets/delete.svg";
import { v4 as uuidv4 } from "uuid";

export interface RuleGroupProps {
  children: (RuleGroupProps | RuleProps)[];
  conjunction: "AND" | "OR";
  not: boolean;
  type: "rule_group";
  updateRuleGroup: (
    ruleGroupId: any,
    ruleId: any,
    operation: any,
    updates: any
  ) => void;
  id: any;
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
  id: uuidv4(),
  field: "Theme",
  condition: "Equals",
  value: [],
  type: "rule",
};

const RuleGroup = ({
  children,
  conjunction,
  not,
  updateRuleGroup,
  id,
}: RuleGroupProps) => {
  const [operation, setOperation] = useState("AND");

  useEffect(() => {
    updateRuleGroup(id, id, "UPDATE_RULE_GROUP", { conjunction: operation });
  }, [operation]);

  return (
    <div className="bg-ruleGroupBg m-2 rounded p-4 flex flex-col border border-ruleGroupBorder">
      {children?.length > 1 ? (
        <TabGroup
          options={conjunctionOptions}
          selectedTab={operation}
          setSelectedTab={setOperation}
        />
      ) : null}
      {children?.map((componentInfo: FixMeLater, idx: any) => {
        return (
          <div className="flex flex-row items-end">
            {componentInfo.type === "rule" ? (
              <RuleComponent
                field={componentInfo.field}
                condition={componentInfo.condition}
                value={componentInfo.value}
                id={componentInfo.id}
                ruleGroupId={id}
                type="rule"
                updateRuleGroup={updateRuleGroup}
              />
            ) : (
              <RuleGroup
                children={componentInfo.children}
                conjunction={componentInfo.conjunction}
                not={componentInfo.not}
                type="rule_group"
                updateRuleGroup={updateRuleGroup}
                id={componentInfo.id}
              />
            )}
            <img
              onClick={() => {
                // let newArr = [...components];
                // setComponents(newArr.splice(idx, 1));
                updateRuleGroup(id, componentInfo.id, "REMOVE", {});
              }}
              src={DeleteIcon}
              alt="delete"
              className="w-9 h-9 p-1 my-4 rounded bg-selectFieldGrey"
            />
          </div>
        );
      })}
      <Button
        label="+ Add filter"
        onClick={() =>
          updateRuleGroup(id, "", "ADD", { ...newRule, id: uuidv4() })
        }
      />
    </div>
  );
};

export default RuleGroup;
