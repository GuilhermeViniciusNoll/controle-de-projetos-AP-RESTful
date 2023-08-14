import { Router } from "express"
import middlewares from "../middlewares"
import controllers from "../controllers/developers.controllers"

const devRoute: Router = Router()

devRoute.post("", middlewares.uniqueEmailMiddleware, controllers.createDevController)
devRoute.post("/:id/infos", middlewares.optionOsMiddleware, middlewares.uniqueIdMiddleware, middlewares.uniqueInfosMiddleware, controllers.postDevInfoController)
devRoute.get("/:id", middlewares.uniqueIdMiddleware, controllers.getDevByIdController)
devRoute.delete("/:id", middlewares.uniqueIdMiddleware, controllers.deleteDevController)
devRoute.patch("/:id", middlewares.uniqueIdMiddleware, middlewares.uniqueEmailMiddleware, controllers.pathDevController)

export default devRoute 