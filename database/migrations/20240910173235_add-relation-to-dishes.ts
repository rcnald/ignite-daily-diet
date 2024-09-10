import type { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("dishes", (table) => {
    table.uuid("user_id").notNullable()
    table.foreign("user_id").references("id").inTable("users")
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("dishes", (table) => {
    table.dropColumn("user_id")
  })
}
