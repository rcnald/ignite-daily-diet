import type { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("dishes", (table) => {
    table.dropForeign(["user_id"])
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("dishes", (table) => {
    table.dropForeign(["user_id"])
    table.foreign("user_id").references("id").inTable("users")
  })
}
