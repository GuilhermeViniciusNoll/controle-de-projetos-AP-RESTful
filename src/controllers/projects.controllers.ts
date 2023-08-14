import { Request, Response } from "express"
import { Dev, DevInfos, createDev, createproject, partialDataDev, partialDataDevInfos, partialDataproject, project } from "../interfaces"
import servicesDev from "../services/developers.services"
import projectsServices from "../services/projects.services"

const createProjectController = async (req: Request, res: Response): Promise<Response> => {
    const payload: createproject = req.body
    const dev: project = await projectsServices.createProjectService(payload)
    return res.status(201).json(dev)
}

const getProjectByIdController = async (req: Request, res: Response): Promise<Response> => {
    const project: project = await projectsServices.getProjectByIdService(req.params.id)
    return res.status(200).json(project)
}

const pathProjectController = async (req: Request, res: Response): Promise<Response> => {
    const payload: Omit<partialDataproject, "id"> = req.body
    const lastData: Omit<partialDataproject, "id"> = res.locals[0]
    const project: project = await projectsServices.pathProjectService(payload, lastData, req.params.id)
    return res.status(200).json(project)
}

export default { createProjectController, getProjectByIdController, pathProjectController }