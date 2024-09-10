// eslint-disable-next-line
import { Knex } from "knex"

declare module "knex/types/tables" {
  export interface Tables {
    users: {
      id: string
      name: string
      email: string
    }
    dishes: {
      id: string
      name: string
      description?: string
      created_at: string
      follows_diet: boolean
      user_id: string
    }
  }
}
