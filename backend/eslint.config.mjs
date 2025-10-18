import js from "@eslint/js";
import boundaries from "eslint-plugin-boundaries";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig({
  ignores: ["dist/**"],
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ["**/*.ts"],
  languageOptions: {
    globals: globals.node,
    sourceType: "commonjs",
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {
    boundaries,
  },
  rules: {
    "boundaries/no-unknown-files": ["error"],
    "boundaries/element-types": [
      "error",
      {
        default: "disallow",
        rules: [
          {
            from: ["bootstrap"],
            allow: ["bootstrap", "module", "shared"],
          },
          {
            from: ["shared"],
            allow: ["shared"],
          },
          {
            from: ["module"],
            allow: ["module", "controller", "guard", "shared", "service"],
          },
          {
            from: ["controller"],
            allow: [
              "shared",
              "controller",
              "service",
              "guard",
              "entity",
              "dto",
            ],
          },
          {
            from: ["dto"],
            allow: ["shared", "dto", "entity"],
          },
          {
            from: ["service"],
            allow: ["shared", "service", "dao", "database", "entity"],
          },
          {
            from: ["entity"],
            allow: ["shared", "entity"],
          },
          {
            from: ["database"],
            allow: ["shared", "database", "dao", "entity"],
          },
          {
            from: ["dao"],
            allow: ["shared", "dao", "entity"],
          },
          {
            from: ["guard"],
            allow: ["shared", "service", "controller", "dto"],
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
        type: "module",
        pattern: ["src/**/*.module.ts"],
      },
      {
        mode: "full",
        type: "bootstrap",
        pattern: ["src/*"],
      },
      {
        mode: "full",
        type: "shared",
        pattern: [
          "src/constants/**/*",
          "src/decorators/**/*",
          "src/types/**/*",
          "src/utils/**/*",
        ],
      },
      {
        mode: "full",
        type: "controller",
        pattern: ["src/**/*.controller.ts"],
      },
      {
        mode: "full",
        type: "dto",
        pattern: ["src/**/*.dto.ts"],
      },
      {
        mode: "full",
        type: "service",
        pattern: ["src/**/*.service.ts"],
      },
      {
        mode: "full",
        type: "entity",
        pattern: ["src/**/*.entity.ts"],
      },
      {
        mode: "full",
        type: "database",
        pattern: ["src/**/*.database.ts"],
      },
      {
        mode: "full",
        type: "dao",
        pattern: ["src/**/*.dao.ts"],
      },
      {
        mode: "full",
        type: "guard",
        pattern: ["src/**/*.guard.ts"],
      },
    ],
  },
});
