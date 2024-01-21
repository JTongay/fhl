import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'https://fqwh8k9ljf.execute-api.us-east-1.amazonaws.com/graphql',
    documents: ['operations/**/*.tsx'],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        './generated/gql/': {
            preset: 'client'
        }
    }
}

export default config