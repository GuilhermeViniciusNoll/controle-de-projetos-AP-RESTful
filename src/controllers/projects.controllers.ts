import services from "../services/projects.services"
import { Request, Response } from "express"
import { TCreateProject, TPartialProject, IProject } from "../interfaces"

const createProjectController = async (req: Request, res: Response): Promise<Response> => {
    const payload: TCreateProject = req.body
    const dev: IProject = await services.createProjectService(payload)
    return res.status(201).json(dev)
}

const getProjectByIdController = async (req: Request, res: Response): Promise<Response> => {
    const project: IProject = await services.getProjectByIdService(req.params.id)
    return res.status(200).json(project)
}

const pathProjectController = async (req: Request, res: Response): Promise<Response> => {
    const payload: Omit<TPartialProject, "id"> = req.body
    const lastData: Omit<TPartialProject, "id"> = res.locals[0]
    const project: IProject = await services.pathProjectService(payload, lastData, req.params.id)
    return res.status(200).json(project)
}

export default { createProjectController, getProjectByIdController, pathProjectController }