import { FastifyInstance } from "fastify"
import { z } from "zod"
import { knex } from "../database"
import { randomUUID } from "node:crypto"
import { getFollowsDietStreak } from "../lib/utils"

export async function usersRoutes(app: FastifyInstance) {
  app.post("/", async (req, rep) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
    })

    const { success, data } = createUserBodySchema.safeParse(req.body)

    if (!success) {
      return rep.status(400).send({ message: "Missing params!" })
    }

    const { email, name } = data
    const id = randomUUID()

    await knex("users").insert({ id, name, email })

    rep.cookie("userId", id, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return rep.status(201).send()
  })

  app.get("/metrics", async (req, rep) => {
    const { userId } = req.cookies

    const dishes = await knex("dishes").where({ user_id: userId })

    if (!dishes.length) {
      return rep.status(404).send({ message: "user do not have dishes" })
    }

    const dishesAmount = dishes.length
    const dishesFollowingDietAmount = dishes.filter((dish) => {
      return dish.follows_diet
    }).length
    const dishesNotFollowingDietAmount =
      dishesAmount - dishesFollowingDietAmount

    const dishesFollowingDietStreak = getFollowsDietStreak(dishes)

    return {
      dishesAmount,
      dishesFollowingDietAmount,
      dishesNotFollowingDietAmount,
      dishesFollowingDietStreak,
    }
  })
}
