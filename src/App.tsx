import { useState, createContext, useEffect } from "react";
import "./App.css";
import RuleGroup from "./components/RuleGroup";
import Button from "./components/Button";
import { v4 as uuidv4 } from "uuid";
import { queryParser } from "./utils/queryParser";
import CrossIcon from "./assets/X.png";
import { IRule, IRuleGroup } from "./components/types";

const newRuleGroup: IRuleGroup = Object.freeze({
  id: uuidv4(),
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

export const ModalContext = createContext({
  updateRuleGroup: (
    ruleGroupId: string,
    ruleId: string,
    operation: "ADD" | "REMOVE" | "UPDATE_RULE" | "UPDATE_RULE_GROUP",
    updates: any
  ) => {},
});

function App() {
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

  const onFinish = () => {};

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
        ruleGroup = {
          ...ruleGroup,
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
          <ModalContext.Provider value={{ updateRuleGroup }}>
            {ruleGroups.map((ruleGroup: IRuleGroup) => (
              <RuleGroup
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
            <Button disabled={true} label={"Back"} />
            <Button label={"Finish"} onClick={onFinish} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
