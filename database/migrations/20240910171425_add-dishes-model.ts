import type { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("dishes", (table) => {
    table.uuid("id").primary()
    table.text("name").notNullable()
    table.text("description")
    table.dateTime("created_at").notNullable()
    table.boolean("follows_diet").notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("dishes")
}
