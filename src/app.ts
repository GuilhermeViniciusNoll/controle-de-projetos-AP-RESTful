import "dotenv/config"
import "express-async-errors"
import routes from "./routes"
import middlewares from "./middlewares"
import express, { Application, json } from "express"

const app: Application = express()
app.use(json())

app.use("/developers", routes.devRoute)
app.use("/projects", routes.projectRouter)

app.use(middlewares.handlerErrorMiddleware)

export default app