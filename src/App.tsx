import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import RuleGroup, { RuleGroupProps } from "./components/RuleGroup";
import Button from "./components/Button";

export const newRuleGroup = {
  children: [],
  conjunction: "AND",
  not: false,
  type: "rule_group",
};

export const newRule = {
  field: "Theme",
  condition: "Equals",
  value: [],
  type: "rule",
};

type FixMeLater = any;

function App() {
  const [ruleGroups, setRuleGroups] = useState<any>([]);

  return (
    <div className="App">
      {ruleGroups.map((ruleGroup: RuleGroupProps) => (
        <RuleGroup
          children={ruleGroup.children}
          type={ruleGroup.type}
          conjunction={ruleGroup.conjunction}
          not={ruleGroup.not}
        />
      ))}
      <Button
        label={"+ Add new group filter"}
        onClick={() => setRuleGroups([...ruleGroups, newRuleGroup])}
      />
    </div>
  );
}

export default App;
