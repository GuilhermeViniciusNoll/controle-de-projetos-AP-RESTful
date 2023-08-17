import appError from "../errors"
import { client } from "../database"
import { QueryConfig } from "pg"
import { NextFunction, Request, Response } from "express"
import { TResultProject } from "../interfaces"

const projectExistMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const queryConfig: QueryConfig = {
        text: `SELECT * FROM projects WHERE "id" = $1;`,
        values: [req.params.id]
    }
    const project: TResultProject = await client.query(queryConfig)
    res.locals = project.rows[0]
    if (project.rows.length === 0) throw new appError("Project not found.", 404)
    return next()
}

export default projectExistMiddleware