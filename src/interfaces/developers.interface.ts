import { QueryResult } from "pg"

interface IDev {
    id: Number,
    name: String,
    email: String
}

type TCreateDev = Omit<IDev, "id">
type TPartialDev = Partial<IDev>
type TResultDev = QueryResult<IDev>

export { IDev, TCreateDev, TPartialDev, TResultDev }