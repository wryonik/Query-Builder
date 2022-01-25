let colors = {
  transparent: "transparent",
  white: "rgba(255, 255, 255, 1)",
  black: "rgba(0, 0, 0, 0.3)",
  modalBg: "rgba(29, 32, 37, 1)",
  ruleGroupBg: "rgba(40, 43, 48, 1)",
  darkVoilet: "rgba(67, 56, 202, 1)",
  lightGrey: "rgba(255, 255, 255, 0.05)",
  selectFieldGrey: "rgba(255, 255, 255, 0.1)",
  ruleGroupBorder: "rgba(64, 67, 72, 1)",
  tabgroupVoilet: "rgba(92, 97, 240, 1)",
  backgroundText: "rgba(126, 128, 131, 1)",
  selectHoverColor: "rgba(196, 196, 196, 0.1)",
  disabled: "rgba(109, 113, 117, 1)",
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      width: {
        235: "60rem",
      },
      height: {
        200: "44rem",
      },
      colors: colors,
      backgroundColors: colors,
      textColors: colors,
    },
  },
  plugins: [],
};
