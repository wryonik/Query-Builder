import React, { useState, createContext, useEffect } from "react";
import "./App.css";
import RuleGroup, { RuleGroupProps } from "./components/RuleGroup";
import Button from "./components/Button";
import { v4 as uuidv4 } from "uuid";

const newRuleGroup = Object.freeze({
  children: [],
  conjunction: "AND",
  not: false,
  type: "rule_group",
});

export const newRule = {
  field: "Theme",
  condition: "Equals",
  value: [],
  type: "rule",
};

type FixMeLater = any;

export const UpdateRuleGroup = createContext({
  updateRuleGroup: (idx: any, ruleGroup: any) => {},
});

function App() {
  const [ruleGroups, setRuleGroups] = useState<any>([]);

  const addRuleGroup = () => {
    setRuleGroups([...ruleGroups, { ...newRuleGroup, id: uuidv4() }]);
  };

  const removeRuleGroup = (idx: any) => {
    let newArr = [...ruleGroups];
    setRuleGroups(newArr.splice(idx, 1));
  };

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

  console.log(ruleGroups);

  useEffect(() => {
    console.log("dksjds", ruleGroups);
  }, [ruleGroups]);

  return (
    <div className="App">
      {/* <UpdateRuleGroup.Provider value={updateRuleGroup}> */}
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
      {/* </UpdateRuleGroup.Provider> */}
    </div>
  );
}

export default App;
