import {CodegenConfig} from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: ["./src/graphql/schema/**/*.graphql"],
  emitLegacyCommonJSImports: false,
  generates: {
    "lib/schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
};
export default config;
