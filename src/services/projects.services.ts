import format from "pg-format"
import { client } from "../database"
import { QueryConfig } from "pg"
import { TCreateProject, TPartialProject, IProject, TResultProject } from "../interfaces"

const createProjectService = async (payload: TCreateProject): Promise<IProject> => {
    const queryConfig: QueryConfig = {
        text: `INSERT INTO projects ("name","description", "repository","startDate", "endDate", "developerId") VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
        values: [payload.name, payload.description, payload.repository, payload.startDate, payload.endDate, payload.developerId]
    }
    const project: TResultProject = await client.query(queryConfig)
    return project.rows[0]
}

const getProjectByIdService = async (id: String): Promise<IProject> => {
    const queryConfig: QueryConfig = {
        text: `SELECT "id" "projectId", "name" "projectName", "description" "projectDescription", "repository" "projectRepository", "startDate" "projectStartDate", "endDate" "projectEndDate", "developerId" "projectDeveloperName"
        FROM projects WHERE "id" = $1;`,
        values: [id]
    }
    const project: TResultProject = await client.query(queryConfig)
    return project.rows[0]
}

const pathProjectService = async (payload: TPartialProject, lastData: TPartialProject, id: String): Promise<IProject> => {
    const updateData: TPartialProject = {
        ...lastData,
        ...payload
    }
    const queryConfig: QueryConfig = {
        text: format(`UPDATE projects SET(%I) = ROW(%L) WHERE id = $1 RETURNING *;`, Object.keys(updateData), Object.values(updateData)),
        values: [id]
    }
    const project: TResultProject = await client.query(queryConfig)
    return project.rows[0]
}

export default { createProjectService, getProjectByIdService, pathProjectService }
