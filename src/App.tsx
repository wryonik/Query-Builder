import React, { useState, createContext, useEffect } from "react";
import "./App.css";
import RuleGroup, { RuleGroupProps } from "./components/RuleGroup";
import Button from "./components/Button";
import { v4 as uuidv4 } from "uuid";
import { queryParser } from "./utils/queryParser";
import CrossIcon from "./assets/X.png";

const newRuleGroup = Object.freeze({
  children: [],
  conjunction: "AND",
  not: false,
  type: "rule_group",
});

export const newRule = {
  field: "Theme",
  condition: "Equals",
  value: "",
  type: "rule",
};

type FixMeLater = any;

export const UpdateRuleGroup = createContext({
  updateRuleGroup: (idx: any, ruleGroup: any) => {},
});

function App() {
  const [ruleGroups, setRuleGroups] = useState<any>([]);
  const [queryString, setQueryString] = useState<any>("");
  const [toggleMore, setToggleMore] = useState<any>(true);

  const addRuleGroup = () => {
    setRuleGroups([...ruleGroups, { ...newRuleGroup, id: uuidv4() }]);
  };

  const removeRuleGroup = (idx: any) => {
    let newArr = [...ruleGroups];
    setRuleGroups(newArr.splice(idx, 1));
  };

  const onFinish = () => {};

  const updateRuleGroup = (
    ruleGroupId: any,
    ruleId: any,
    operation: "ADD" | "REMOVE" | "UPDATE_RULE" | "UPDATE_RULE_GROUP",
    updates: any
  ) => {
    // let tempRuleGroup = [...ruleGroups];

    let tempRuleGroup = JSON.parse(JSON.stringify(ruleGroups));

    switch (operation) {
      case "ADD":
        tempRuleGroup.forEach((ruleGroup: any) => {
          if (ruleGroup.id === ruleGroupId) {
            let tempChild = [...ruleGroup.children];
            ruleGroup.children = [...tempChild, updates];
          }
        });
        break;
      case "REMOVE":
        tempRuleGroup.forEach((a: any, index: any) => {
          if (a.id === ruleGroupId) {
            a.children.forEach((rule: any, idx: any) => {
              if (rule.id === ruleId) a.children.splice(idx, 1);
            });
          }
        });
        break;
      case "UPDATE_RULE":
        [...tempRuleGroup].forEach((ruleGroup: any, idx: any) => {
          if (ruleGroup.id === ruleGroupId) {
            [...ruleGroup.children].forEach((rule: any, idx2: any) => {
              if (rule.id === ruleId) {
                tempRuleGroup[idx].children[idx2] = { ...rule, ...updates };
                // rule = { ...rule, ...updates };
              }
            });
          }
        });
        break;
      case "UPDATE_RULE_GROUP":
        [...tempRuleGroup].forEach((ruleGroup: any, idx: any) => {
          if (ruleGroup.id === ruleGroupId) {
            tempRuleGroup[idx] = { ...tempRuleGroup[idx], ...updates };
          }
        });
        break;
    }

    setRuleGroups(tempRuleGroup);
  };

  useEffect(() => {
    setQueryString(queryParser(ruleGroups));
  }, [ruleGroups]);

  return (
    <div className="App">
      <div className="w-235 h-200 bg-modalBg flex flex-col items-start justify-between">
        <div className="bg-tabgroupVoilet py-6 px-8 w-full flex flex-col items-start">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="text-lg">Build your Query</div>
            <div
              className={`bg-darkVoilet text-white rounded text-sm p-1 w-6 h-6`}
            >
              <img src={CrossIcon} alt="cross" />
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
          ) : null}
        </div>

        <div className="p-8 flex flex-col items-start overflow-scroll w-full">
          {ruleGroups.map((ruleGroup: RuleGroupProps) => (
            <RuleGroup
              updateRuleGroup={updateRuleGroup}
              children={ruleGroup.children}
              type={ruleGroup.type}
              conjunction={ruleGroup.conjunction}
              not={ruleGroup.not}
              id={ruleGroup.id}
            />
          ))}

          <Button label={"+ Add new group filter"} onClick={addRuleGroup} />
          <div className="flex flex-row pt-8 w-full justify-between">
            <Button disabled={true} label={"Back"} onClick={addRuleGroup} />
            <Button label={"Finish"} onClick={onFinish} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
