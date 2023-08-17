import express, { Application, json } from "express";
import "dotenv/config";
import routes from "./routes";
import middlewares from "./middlewares";
import "express-async-errors";

const app: Application = express();
app.use(json())

app.use("/developers", routes.devRoute)
app.use("/projects", routes.projectRouter)

app.use(middlewares.handlerErrorMiddleware);

export default app;
