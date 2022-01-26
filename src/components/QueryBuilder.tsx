import { useState, createContext, useEffect } from "react";
import RuleGroup from "./RuleGroup";
import Button from "./common/Button";
import { v4 as uuidv4 } from "uuid";
import { queryParser } from "utils/queryParser";
import CrossIcon from "assets/X.png";
import { IRule, IRuleGroup } from "./types";

const newRuleGroup: IRuleGroup = Object.freeze({
  id: uuidv4(),
  children: [],
  conjunction: "AND",
  not: false,
  type: "rule_group",
});

export const newRule = {
  field: "",
  condition: "",
  value: "",
  type: "rule",
};

export const ModalContext = createContext({
  updateRuleGroup: (
    ruleGroupId: string,
    ruleId: string,
    operation: "ADD" | "REMOVE" | "UPDATE_RULE" | "UPDATE_RULE_GROUP",
    updates: any
  ) => {},
  filtersConfig: [],
});

interface QueryBuilderProps {
  handleClose: () => void;
  handleFinish: (queryString: string, ruleGroups: IRuleGroup[]) => void;
  filtersConfig: any;
}

const QueryBuilder = ({
  handleClose,
  handleFinish,
  filtersConfig,
}: QueryBuilderProps) => {
  const [ruleGroups, setRuleGroups] = useState<IRuleGroup[]>([]);
  const [queryString, setQueryString] = useState<string>("");
  const [toggleMore, setToggleMore] = useState<boolean>(true);

  const addRuleGroup = () => {
    setRuleGroups([...ruleGroups, { ...newRuleGroup, id: uuidv4() }]);
  };

  const removeRuleGroup = (idx: number) => {
    let newArr = [...ruleGroups];
    setRuleGroups(newArr.splice(idx, 1));
  };

  const updateRuleGroup = (
    ruleGroupId: string,
    ruleId: string,
    operation: "ADD" | "REMOVE" | "UPDATE_RULE" | "UPDATE_RULE_GROUP",
    updates: any
  ) => {
    let tempRuleGroup = JSON.parse(JSON.stringify(ruleGroups));
    let ruleGroupIdx = tempRuleGroup.findIndex(
      (ruleGroup: IRuleGroup) => ruleGroup.id === ruleGroupId
    );
    let ruleIdx = tempRuleGroup[ruleGroupIdx].children.findIndex(
      (rule: IRule) => rule.id === ruleId
    );

    let ruleGroup = tempRuleGroup[ruleGroupIdx];

    switch (operation) {
      case "ADD":
        ruleGroup.children = [...ruleGroup.children, updates];
        break;

      case "REMOVE":
        ruleGroup.children.splice(ruleIdx, 1);
        break;

      case "UPDATE_RULE":
        ruleGroup.children[ruleIdx] = {
          ...ruleGroup.children[ruleIdx],
          ...updates,
        };
        break;

      case "UPDATE_RULE_GROUP":
        tempRuleGroup[ruleGroupIdx] = {
          ...tempRuleGroup[ruleGroupIdx],
          ...updates,
        };
        break;
    }

    setRuleGroups(tempRuleGroup);
  };

  useEffect(() => {
    setQueryString(queryParser(ruleGroups));
  }, [ruleGroups]);

  return (
    <div className="w-235 h-200 bg-modalBg flex flex-col rounded items-start justify-between">
      <div className="bg-tabgroupVoilet py-6 px-8 w-full rounded-t flex flex-col items-start">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="text-lg">Build your Query</div>
          <div className={`bg-darkVoilet text-white rounded text-sm w-6 h-6`}>
            <img src={CrossIcon} alt="cross" onClick={handleClose} />
          </div>
        </div>
        {queryString ? (
          <div
            className={`flex ${
              toggleMore ? "flex-row items-center" : "flex-col items-start"
            } py-1 w-full`}
          >
            <div
              className={`bg-darkVoilet text-white rounded text-sm h-max p-2 text-left ${
                toggleMore ? "truncate" : ""
              }`}
            >
              {queryString}
            </div>
            <div
              className={`ml-4 text-base ${toggleMore ? "" : "pt-1"}`}
              onClick={() => setToggleMore(!toggleMore)}
            >
              {toggleMore ? "more..." : "less..."}
            </div>
          </div>
        ) : (
          <div className="text-indigo-300 text-sm">
            The query you build will be saved in your active view
          </div>
        )}
      </div>

      <div className="p-8 flex flex-col items-start overflow-scroll w-full">
        <ModalContext.Provider value={{ updateRuleGroup, filtersConfig }}>
          {ruleGroups.map((ruleGroup: IRuleGroup) => (
            <RuleGroup
              key={ruleGroup.id || uuidv4()}
              children={ruleGroup.children}
              type={ruleGroup.type}
              conjunction={ruleGroup.conjunction}
              not={ruleGroup.not}
              id={ruleGroup.id || ""}
            />
          ))}
        </ModalContext.Provider>

        <Button label={"+ Add new group filter"} onClick={addRuleGroup} />
        <div className="flex flex-row pt-8 w-full justify-between">
          <Button variant="disabled" label={"Back"} onClick={handleClose} />
          <Button
            label={"Finish"}
            onClick={() => handleFinish(queryString, ruleGroups)}
          />
        </div>
      </div>
    </div>
  );
};

export default QueryBuilder;
