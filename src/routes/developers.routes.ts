import middlewares from "../middlewares"
import controllers from "../controllers/developers.controllers"
import { Router } from "express"

const devRoute: Router = Router()

devRoute.post("", middlewares.uniqueEmailMiddleware, controllers.createDevController)
devRoute.post("/:id/infos", middlewares.uniqueIdMiddleware, middlewares.uniqueInfosMiddleware, controllers.postDevInfoController)
devRoute.get("/:id", middlewares.uniqueIdMiddleware, controllers.getDevByIdController)
devRoute.patch("/:id", middlewares.uniqueIdMiddleware, middlewares.uniqueEmailMiddleware, controllers.pathDevController)
devRoute.delete("/:id", middlewares.uniqueIdMiddleware, controllers.deleteDevController)

export default devRoute 