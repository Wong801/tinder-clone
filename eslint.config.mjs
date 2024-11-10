import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import parser from '@typescript-eslint/parser'
import prettierConfig from 'eslint-config-prettier'


/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  ...tseslint.configs.recommended,
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: {  
    globals: globals.node, 
    parser,
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta,
    }
  }},
  pluginJs.configs.recommended,
  prettierConfig,
  {rules: {
    "@typescript-eslint/no-explicit-any": "off"
  }},
  { files: ["src/models/interfaces/**/*.{ts}"], rules: { "@typescript-eslint/no-unused-vars": "off" } },
);