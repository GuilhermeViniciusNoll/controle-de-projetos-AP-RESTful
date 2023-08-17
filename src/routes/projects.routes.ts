import middlewares from "../middlewares"
import controllers from "../controllers/projects.controllers"
import { Router } from "express"

const projectRouter: Router = Router()

projectRouter.post("", middlewares.existIdMiddleware, controllers.createProjectController)
projectRouter.get("/:id", middlewares.projectExistMiddleware, controllers.getProjectByIdController)
projectRouter.patch("/:id", middlewares.projectExistMiddleware, middlewares.existIdMiddleware, controllers.pathProjectController)

export default projectRouter 