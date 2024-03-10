<<<<<<< HEAD
import { CodegenConfig } from "@graphql-codegen/cli";
import 'dotenv'

const config: CodegenConfig = {
    schema: process.env.NEXT_API_URL,
    documents: ["operations/**/*.tsx"],
    ignoreNoDocuments: true,
    generates: {
        "./generated/gql/": {
            preset: "client"
=======
import { CodegenConfig } from '@graphql-codegen/cli'
import 'dotenv/config'
// import { Api } from 'sst/node/api'

// async function loadEnv(): Promise<void> {
//     console.log(await Api)
// }

console.log(process.env)
// console.log(loadEnv())
// console.log(Api.FHLGateway.url, "apiGateway url")

const config: CodegenConfig = {
    schema: process.env.API_URL,
    documents: ['operations/**/*.tsx'],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        './generated/gql/': {
            preset: 'client'
>>>>>>> main
        }
    }
}

<<<<<<< HEAD
export default config;
=======
export default config
>>>>>>> main
