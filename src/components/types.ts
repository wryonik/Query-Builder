export interface IRule {
    id: string;
    field:
    | "Theme"
    | "Sub-theme"
    | "Reason"
    | "Language"
    | "Source"
    | "Rating"
    | "Time Period"
    | "Customer ID";
    condition:
    | "Equals"
    | "Does not equal"
    | "Like"
    | "Not like"
    | "Is Empty"
    | "Is"
    | "Is not";
    value: string;
    type: "rule";
}

export interface IRuleGroup {
    id: string;
    children: (IRuleGroup | IRule)[];
    conjunction: "AND" | "OR";
    not: boolean;
    type: "rule_group";
}