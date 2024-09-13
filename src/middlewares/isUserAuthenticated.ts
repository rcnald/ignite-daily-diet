import { FastifyReply, FastifyRequest } from "fastify"
import { knex } from "../database"

export async function isUserAuthenticated(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { userId } = req.cookies

  const user = await knex("users").where({ id: userId }).first()

  if (!user) {
    return rep.status(401).send({ error: "Unauthorized" })
  }
}
