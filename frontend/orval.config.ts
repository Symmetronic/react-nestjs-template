import { defineConfig } from "orval";

const SCHEMA_PATH = "../backend/openapi.yaml";
const API_PATH = "./src/api/generated";

export default defineConfig({
  api: {
    input: SCHEMA_PATH,
    output: {
      mode: "tags-split",
      target: API_PATH,
      schemas: "./src/types/generated",
      client: "react-query",
      httpClient: "axios",
      prettier: true,
      clean: true,
      baseUrl: "/api",
    },
  },
  apiZod: {
    input: SCHEMA_PATH,
    output: {
      mode: "tags-split",
      client: "zod",
      target: API_PATH,
      fileExtension: ".zod.ts",
    },
  },
});
