import js from "@eslint/js";
import boundaries from "eslint-plugin-boundaries";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig({
  ignores: ["dist/**", "src/api/generated/**", "src/types/generated/**"],
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    jsxA11y.flatConfigs.recommended,
  ],
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ...jsxA11y.languageOptions,
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    boundaries,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "boundaries/no-unknown-files": ["error"],
    "boundaries/element-types": [
      "error",
      {
        default: "disallow",
        rules: [
          {
            from: ["bootstrap"],
            allow: ["bootstrap", "feature", "shared"],
          },
          {
            from: ["shared"],
            allow: ["shared"],
          },
          {
            from: ["feature"],
            allow: [
              "shared",
              ["feature", { featureName: "${from.featureName}" }],
            ],
          },
          {
            from: ["app"],
            allow: ["app", "shared", "feature"],
          },
        ],
      },
    ],
  },
  settings: {
    "boundaries/include": ["src/**"],
    "import/resolver": {
      alias: {
        map: [["@", "./src"]],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      },
    },
    "boundaries/elements": [
      {
        mode: "full",
        type: "bootstrap",
        pattern: ["src/@types/**/*", "src/*"],
      },
      {
        mode: "full",
        type: "shared",
        pattern: [
          "src/api/**/*",
          "src/assets/**/*",
          "src/components/**/*",
          "src/hooks/**/*",
          "src/utils/**/*",
          "src/types/**/*",
        ],
      },
      {
        mode: "full",
        type: "feature",
        capture: ["featureName"],
        pattern: ["src/features/*/**/*"],
      },
      {
        mode: "full",
        type: "app",
        pattern: ["src/routes/**/*"],
      },
    ],
  },
});
