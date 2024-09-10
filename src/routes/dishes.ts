import { randomUUID } from "node:crypto"
import { FastifyInstance } from "fastify"
import { z } from "zod"
import { knex } from "../database"

export async function dishesRoutes(app: FastifyInstance) {
  app.post("/", async (req, rep) => {
    const createDishesBodySchema = z.object({
      name: z.string(),
      description: z.string().optional(),
      date: z.string(),
      time: z.string(),
      followsDiet: z.coerce.boolean(),
    })

    const { success, data } = createDishesBodySchema.safeParse(req.body)

    if (!success) {
      return rep.status(400).send({ message: "Missing params!" })
    }

    const { name, date, followsDiet, time, description } = data

    const { userId } = req.cookies

    const id = randomUUID()

    await knex("dishes").insert({
      id,
      name,
      description,
      created_at: new Date(`${date}:${time}`).toISOString(),
      follows_diet: followsDiet,
      user_id: userId,
    })

    return rep.status(201).send()
  })
}
