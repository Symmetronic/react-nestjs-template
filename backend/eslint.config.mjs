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
            allow: ["bootstrap", "shared"],
          },
          {
            from: ["shared"],
            allow: ["shared"],
          },
          {
            from: ["module"],
            allow: ["module", "controller", "service"],
          },
          {
            from: ["controller"],
            allow: [
              "shared",
              "controller",
              "service",
              "decorator",
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
            allow: [
              "shared",
              "service",
              "dao",
              "decorator",
              "database",
              "entity",
            ],
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
            allow: ["shared", "service"],
          },
          {
            from: ["decorator"],
            allow: ["shared", "decorator"],
          },
        ],
      },
    ],
  },
  settings: {
    "boundaries/include": ["src/**"],
    "boundaries/elements": [
      {
        mode: "full",
        type: "bootstrap",
        pattern: ["src/*"],
      },
      {
        mode: "full",
        type: "shared",
        pattern: ["src/types/**/*", "src/utils/**/*"],
      },
      {
        mode: "full",
        type: "module",
        pattern: ["src/**/*.module.ts"],
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
      {
        mode: "full",
        type: "decorator",
        pattern: ["src/**/*.decorator.ts"],
      },
    ],
  },
});
