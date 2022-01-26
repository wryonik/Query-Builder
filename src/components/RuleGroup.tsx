import { useEffect, useState, useContext } from "react";
import Button from "./common/Button";
import RuleComponent from "./Rule";
import TabGroup from "./common/TabGroup";
import DeleteIcon from "assets/delete.svg";
import { v4 as uuidv4 } from "uuid";
import { ModalContext } from "./QueryBuilder";

export interface RuleGroupProps {
  children: (RuleGroupProps | RuleProps)[];
  conjunction: "AND" | "OR";
  not: boolean;
  type: "rule_group";
  id: string;
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
  value?: string;
  type: "rule";
}

type FixMeLater = any;

const conjunctionOptions = ["AND", "OR"];

const newRule = {
  id: uuidv4(),
  field: "Theme",
  condition: "Equals",
  value: "",
  type: "rule",
};

const RuleGroup = ({ children, conjunction, not, id }: RuleGroupProps) => {
  const [operation, setOperation] = useState("AND");
  const { updateRuleGroup } = useContext(ModalContext);

  useEffect(() => {
    updateRuleGroup(id, id, "UPDATE_RULE_GROUP", {
      conjunction: operation,
    });
  }, [operation]);

  return (
    <div className="bg-ruleGroupBg mb-6 rounded p-4 flex flex-col border border-ruleGroupBorder w-full">
      {children?.length > 1 ? (
        <TabGroup
          options={conjunctionOptions}
          selectedTab={operation}
          setSelectedTab={setOperation}
        />
      ) : null}
      {children?.map((componentInfo: FixMeLater, idx: number) => {
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
                // updateRuleGroup={updateRuleGroup}
              />
            ) : (
              <RuleGroup
                children={componentInfo.children}
                conjunction={componentInfo.conjunction}
                not={componentInfo.not}
                type="rule_group"
                id={componentInfo.id}
              />
            )}
            <img
              onClick={() => {
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
        onClick={() => {
          updateRuleGroup(id, "", "ADD", {
            ...newRule,
            id: uuidv4(),
          });
        }}
      />
    </div>
  );
};

export default RuleGroup;
