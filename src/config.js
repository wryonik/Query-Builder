const textOptions = [
  "Equals",
  "Does not equals",
  "Is Empty",
  "Contains",
  "Is",
  "Is Not",
];

const numberOptions = [
  "Equals",
  "Does not equals",
  "Greater Than",
  "Greater Than or Equal to",
  "Less Than",
  "Less Than or Equal to",
];

const dateOptions = ["After", "Before"];

const selectOptions = [
  "Equals",
  "Does not equals",
  "Contains",
  "Does not Contains",
  "Is",
  "Is Not",
  "Like",
  "Not Like",
];

export const filtersConfig = [
  {
    field: "Theme",
    conditions: [...selectOptions],
    type: "select",
    options: ["Offer", "Performance", "Platform", "Product Feedback"],
  },
  {
    field: "Sub-Theme",
    conditions: [...selectOptions],
    type: "select",
    options: ["Test"],
  },
  {
    field: "Reason",
    conditions: [...textOptions],
    type: "text",
  },
  {
    field: "Language",
    conditions: [...selectOptions],
    type: "select",
    options: ["English", "Mandarin", "Hindi", "Spanish", "French"],
  },
  {
    field: "Source",
    conditions: [...selectOptions],
    type: "select",
    options: [
      "Facebook",
      "Youtube",
      "Whatsapp",
      "Instagram",
      "Facebook Messenger",
    ],
  },
  {
    field: "Rating",
    conditions: [...selectOptions],
    type: "select",
    options: ["1", "2", "3", "4", "5"],
  },
  {
    field: "Time Period",
    conditions: [...dateOptions],
    type: "date",
  },
  {
    field: "Customer Id",
    conditions: [...textOptions],
    type: "text",
  },
];
