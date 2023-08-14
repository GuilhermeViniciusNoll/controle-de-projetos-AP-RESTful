import { QueryResult } from "pg"

type Dev = {
    id: Number,
    name: String,
    email: String
}

type createDev = Omit<Dev, "id">
type partialDataDev = Partial<Dev>
type resultDev = QueryResult<Dev>

export { Dev, createDev, partialDataDev, resultDev }