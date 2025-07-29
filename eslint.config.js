import jsPkg from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";

const { configs: jsConfigs } = jsPkg;

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    ...jsConfigs.recommended,
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  pluginReact.configs.flat.recommended,
  {
    // This override turns off the rules for all files again
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
];
