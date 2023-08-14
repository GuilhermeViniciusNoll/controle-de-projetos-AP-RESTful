import handlerErrorMiddleware from "./handleError.middleware"
import uniqueEmailMiddleware from "./uniqueEmail.middleware"
import uniqueIdMiddleware from "./uniqueId.middlewares"
import uniqueInfosMiddleware from "./uniqueInfos.middleware"
import optionOsMiddleware from "./optionOsMiddleware"
import existIdMiddleware from "./existId.middlewares"
import projectExistMiddleware from "./projectExist.middlewares"

export default { handlerErrorMiddleware, uniqueEmailMiddleware, uniqueIdMiddleware, optionOsMiddleware, uniqueInfosMiddleware, existIdMiddleware, projectExistMiddleware }