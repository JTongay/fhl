import { CodegenConfig } from "@graphql-codegen/cli";
import 'dotenv'

const config: CodegenConfig = {
    schema: process.env.NEXT_API_URL,
    documents: ["operations/**/*.tsx"],
    ignoreNoDocuments: true,
    generates: {
        "./generated/gql/": {
            preset: "client"
        }
    }
}

export default config;
