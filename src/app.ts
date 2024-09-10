import fastify from "fastify"
import { usersRoutes } from "./routes/users"
import cookie from "@fastify/cookie"
import { isUserAuthenticated } from "./middlewares/isUserAuthenticated"

export const app = fastify()

app.register(cookie)
app.addHook("preHandler", isUserAuthenticated)
app.register(usersRoutes, { prefix: "users" })
