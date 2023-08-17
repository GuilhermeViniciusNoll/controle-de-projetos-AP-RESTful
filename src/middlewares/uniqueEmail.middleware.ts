import appError from "../errors"
import schemas from "../schemas"
import { client } from "../database"
import { QueryConfig } from "pg"
import { NextFunction, Request, Response } from "express"
import { TResultDev } from "../interfaces"

const uniqueEmailMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const isValidName: boolean = schemas.validNameSchema(req.body.name)
    const isValidEmail: boolean = schemas.validEmailSchema(req.body.email)
    if (isValidEmail && isValidName) {
        const queryConfig: QueryConfig = {
            text: `SELECT * FROM developers WHERE "email" = $1;`,
            values: [req.body.email]
        }
        const dev: TResultDev = await client.query(queryConfig)
        if (dev.rows.length === 0) return next()
        throw new appError("Email already exists.", 409)
    }
    throw new appError("Invalid data format.", 400)
}

export default uniqueEmailMiddleware