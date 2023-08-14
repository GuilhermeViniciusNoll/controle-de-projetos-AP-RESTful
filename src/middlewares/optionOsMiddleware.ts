import { NextFunction, Request, Response } from "express"
import appError from "../errors"

const optionOsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.body.preferredOS === "MacOS" || req.body.preferredOS === "Linux" || req.body.preferredOS === "Windows") return next()
    throw new appError("Invalid OS option.", 404)
}

export default optionOsMiddleware