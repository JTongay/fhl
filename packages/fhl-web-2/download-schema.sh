#!/bin/bash

ENDPOINT=""
OUTPUT_FILE="schema/schema.graphql"
HEADER=""

while getopts ":e:o:h:" opt; do
    case $opt in
        e) ENDPOINT="$OPTARG"
        ;;
        o) OUTPUT_FILE="$OPTARG"
        ;;
        h) HEADER="$OPTARG"
        ;;
        \?) echo "Invalid option -$OPTARG" >&2
        exit 1
        ;;
    esac
done

if [ -z "$ENDPOINT" ]; then
    echo "Error: GraphQL endpoint is required. Use -e to specify the endpoint."
fi

COMMAND="node_modules/.bin/apollo client:download-schema --endpoint=$ENDPOINT"

if [ ! -z "$HEADER"]; then
    COMMAND="$COMMAND --header=\"$HEADER\""
fi

COMMAND="$COMMAND $OUTPUT_FILE"

echo "Downloading schema from $ENDPOINT..."
eval $COMMAND

if [ $? -eq 0 ]; then
    echo "Schema sucessfully download to $OUTPUT_FILE"
else
    echo "Error: Failed to download schema"
    exit 1
fi