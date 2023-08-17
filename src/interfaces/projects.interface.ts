import { QueryResult } from "pg"

interface IProject {
    id: Number,
    name: String,
    description: String,
    repository: String,
    startDate: Date,
    endDate: Date | null,
    developerId: Number | null
}

type TCreateProject = Omit<IProject, "id">
type TPartialProject = Partial<IProject>
type TResultProject = QueryResult<IProject>

export { IProject, TCreateProject, TPartialProject, TResultProject }