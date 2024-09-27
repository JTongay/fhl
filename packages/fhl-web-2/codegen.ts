import { CodegenConfig } from "@graphql-codegen/cli";
import "dotenv/config";
// import { Api } from 'sst/node/api'

// async function loadEnv(): Promise<void> {
//     console.log(await Api)
// }

// console.log(loadEnv())
// console.log(Api.FHLGateway.url, "apiGateway url")

const config: CodegenConfig = {
  schema: process.env.API_URL,
  documents: ["operations/**/*.graphql"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./generated/gql/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
