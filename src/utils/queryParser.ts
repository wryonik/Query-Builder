import { CONDITION_OPTIONS } from './../constants';
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
        case CONDITION_OPTIONS.EQUALS:
            return "==";
        case CONDITION_OPTIONS.DOES_NOT_EQUALS:
            return "!=";
        case CONDITION_OPTIONS.LIKE:
            return "LIKE";
        case CONDITION_OPTIONS.NOT_LIKE:
            return "NOT LIKE";
        case CONDITION_OPTIONS.IS_EMPTY:
            return "IS EMPTY";
        case CONDITION_OPTIONS.IS:
            return "IS";
        case CONDITION_OPTIONS.IS_NOT:
            return "IS NOT";
        case CONDITION_OPTIONS.GREATER_THAN:
            return ">";
        case CONDITION_OPTIONS.GREATER_THAN_OR_EQUAL_TO:
            return ">=";
        case CONDITION_OPTIONS.LESS_THAN:
            return "<";
        case CONDITION_OPTIONS.LESS_THAN_OR_EQUAL_TO:
            return "<=";
        case CONDITION_OPTIONS.CONTAINS:
            return "CONTAINS";
        case CONDITION_OPTIONS.DOES_NOT_CONTAINS:
            return "DOES NOT CONTAINS";
        case CONDITION_OPTIONS.AFTER:
            return "AFTER";
        case CONDITION_OPTIONS.BEFORE:
            return "BEFORE";
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
        let ruleGroupQuery = ''
        ruleGroup.children.forEach((rule: any, ruleIdx: number) => {
            ruleGroupQuery += ` "(field.${convertToCamelCase(rule.field)}) ${conditionParser(rule.condition)} \\"${rule.value.toString() || ""}"\\" `;
            let ruleQueryEnding = ruleIdx < (ruleGroup.children.length - 1) ? conditionParser(ruleGroup.conjunction) : ''
            ruleGroupQuery += ruleQueryEnding
        });

        let queryEnding = ruleGroupIdx < (ruleGroups.length - 1) ? separator : ''
        if (ruleGroup.not) ruleGroupQuery = `!(${ruleGroupQuery})`
        queryString += ruleGroupQuery + queryEnding
    })
    return queryString
}