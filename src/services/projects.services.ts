import { client } from "../database";
import { Dev, DevInfos, createDev, createproject, partialDataDev, partialDataDevInfos, partialDataproject, project, resultDev, resultDevInfos, resultproject } from "../interfaces";
import { QueryConfig } from "pg";
import format from "pg-format"

const createProjectService = async (payload: createproject): Promise<project> => {
    const queryConfig: QueryConfig = {
        text: `INSERT INTO projects ("name","description", "repository","startDate", "endDate", "developerId") VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
        values: [payload.name, payload.description, payload.repository, payload.startDate, payload.endDate, payload.developerId]
    }
    const project: resultproject = await client.query(queryConfig)
    return project.rows[0]
}

const getProjectByIdService = async (id: String): Promise<project> => {
    const queryConfig: QueryConfig = {
        text: `SELECT "id" "projectId", "name" "projectName", "description" "projectDescription", "repository" "projectRepository", "startDate" "projectStartDate", "endDate" "projectEndDate", "developerId" "projectDeveloperName"
        FROM projects WHERE "id" = $1;`,
        values: [id]
    }
    const project: resultproject = await client.query(queryConfig)
    return project.rows[0]
}

const pathProjectService = async (payload: partialDataproject, lastData: partialDataproject, id: String): Promise<project> => {
    const updateData: partialDataproject = {
        ...lastData,
        ...payload
    }
    const queryConfig: QueryConfig = {
        text: format(`UPDATE projects SET(%I) = ROW(%L) WHERE id = $1 RETURNING *;`, Object.keys(updateData), Object.values(updateData)),
        values: [id]
    }
    const project: resultproject = await client.query(queryConfig)
    return project.rows[0]
}

export default { createProjectService, getProjectByIdService, pathProjectService }

