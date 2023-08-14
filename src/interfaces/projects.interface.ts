import { QueryResult } from "pg"

type project = {
    id: Number,
    name: String,
    description: String,
    repository: String,
    startDate: Date,
    endDate: Date | null,
    developerId: Number | null
}

type createproject = Omit<project, "id">
type partialDataproject = Partial<project>
type resultproject = QueryResult<project>

export { project, createproject, partialDataproject, resultproject }