import "express-async-errors"
import appError from "../errors"
import { NextFunction, Request, Response } from "express"

const handlerErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): Response => {
  if (err instanceof appError) return res.status(err.statusCode).json({ message: err.message })
  console.log(err.message)
  return res.status(500).json({ message: "Internal server error." })
}

export default handlerErrorMiddleware
