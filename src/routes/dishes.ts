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

  app.put("/:id", async (req, rep) => {
    const updateDishParams = z.object({
      id: z.string(),
    })

    const updateDishBody = z.object({
      name: z.string(),
      description: z.string().optional(),
      date: z.string(),
      time: z.string(),
      followsDiet: z.coerce.boolean(),
    })

    const { id } = updateDishParams.parse(req.params)
    const { userId } = req.cookies

    const dish = await knex("dishes").where({ id, user_id: userId }).first()

    if (!dish) {
      return rep.status(404).send({ error: "dish id provided do not exists" })
    }

    const { success, data } = updateDishBody.safeParse(req.body)

    if (!success) {
      return rep.status(400).send({ message: "Missing params!" })
    }

    const { date, followsDiet, name, time, description } = data

    await knex("dishes")
      .update({
        name,
        description,
        follows_diet: followsDiet,
        created_at: new Date(`${date}:${time}`).toISOString(),
      })
      .where({ id, user_id: userId })

    return rep.status(204).send()
  })

  app.delete("/:id", async (req, rep) => {
    const deleteDishParams = z.object({
      id: z.string(),
    })

    const { id } = deleteDishParams.parse(req.params)
    const { userId } = req.cookies

    const dish = await knex("dishes").where({ id, user_id: userId }).first()

    if (!dish) {
      return rep.status(404).send({ error: "dish not found" })
    }

    await knex("dishes").delete().where({ id, user_id: userId })

    return rep.status(204).send()
  })

  app.get("/", async (req, rep) => {
    const { userId } = req.cookies

    const dishes = await knex("dishes").where({ user_id: userId })

    return rep.status(200).send({ dishes })
  })

  app.get("/:id", async (req, rep) => {
    const getDishParams = z.object({
      id: z.string(),
    })

    const { id } = getDishParams.parse(req.params)
    const { userId } = req.cookies

    const dish = await knex("dishes").where({ id, user_id: userId }).first()

    if (!dish) {
      return rep.status(404).send({ error: "dish not found" })
    }

    return rep.status(200).send({ dish })
  })
}
