---
to: packages/subgraphs/<%= domain %>/db/migrations/<%= Date.now() %>_<%= name.replace(/\s/g, "_") %>.ts
---
import { Kysely } from "kysely";

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
}