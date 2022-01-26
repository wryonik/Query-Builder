import { IRuleGroup } from "components/types";

// taken from https://stackoverflow.com/a/2970667
const convertToCamelCase = (str: string) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}

const conditionParser = (condition: string) => {
    switch (condition) {
        case "Equals":
            return "==";
        case "Does not equal":
            return "!=";
        case "Like":
            return "LIKE";
        case "Not like":
            return "NOT LIKE";
        case "Is Empty":
            return "IS EMPTY";
        case "Is":
            return "IS";
        case "Is not":
            return "IS NOT";
        case "AND":
            return "&&";
        case "OR":
            return "||";
        default:
            break;
    }
}

export const queryParser = (ruleGroups: IRuleGroup[]) => {
    let queryString = ""
    const separator = '::::'
    ruleGroups.forEach((ruleGroup: IRuleGroup, ruleGroupIdx: number) => {
        let testQuery = ''
        ruleGroup.children.forEach((rule: any, ruleIdx: number) => {
            testQuery += ` "(field.${convertToCamelCase(rule.field)}) ${conditionParser(rule.condition)} \\"${rule.value.toString() || ""}"\\" `;
            let test = ruleIdx < (ruleGroup.children.length - 1) ? conditionParser(ruleGroup.conjunction) : ''
            testQuery += test
        });

        let test2 = ruleGroupIdx < (ruleGroups.length - 1) ? separator : ''
        queryString += testQuery + test2
    })
    return queryString
}