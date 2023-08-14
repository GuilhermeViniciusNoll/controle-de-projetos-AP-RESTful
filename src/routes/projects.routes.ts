import { Router } from "express"
import middlewares from "../middlewares"
import projectsControllers from "../controllers/projects.controllers"

const projectRouter: Router = Router()

projectRouter.post("", middlewares.existIdMiddleware, projectsControllers.createProjectController)
projectRouter.get("/:id", middlewares.projectExistMiddleware, projectsControllers.getProjectByIdController)
projectRouter.patch("/:id", middlewares.projectExistMiddleware, middlewares.existIdMiddleware, projectsControllers.pathProjectController)

export default projectRouter 