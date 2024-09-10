import fastify from "fastify"
import { usersRoutes } from "./routes/users"
import cookie from "@fastify/cookie"
import { isUserAuthenticated } from "./middlewares/isUserAuthenticated"
import { dishesRoutes } from "./routes/dishes"

export const app = fastify()

app.register(cookie)
app.register(usersRoutes, { prefix: "users" })
app.addHook("preHandler", isUserAuthenticated)
app.register(dishesRoutes, { prefix: "dishes" })
