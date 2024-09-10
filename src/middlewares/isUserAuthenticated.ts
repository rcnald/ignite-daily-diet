import { FastifyReply, FastifyRequest } from "fastify"

export async function isUserAuthenticated(
  req: FastifyRequest,
  rep: FastifyReply,
) {
  const { userId } = req.cookies

  if (!userId) {
    return rep.status(401).send({ error: "Unauthorized" })
  }
}
