import { Request, Response, NextFunction } from "express";
import { ProjectSchema } from "../schemas/projectsSchemas";
import Project from "../models/Project";
import { ProjectType } from "../types/Projects";

declare global {
    namespace Express {
        interface Request {
            project: ProjectType;
        }
    }
}

export const validateProjectData = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validation = ProjectSchema.safeParse(req.body);
    if (!validation.success) {
        res.json({ error: validation.error.issues });
    } else {
        next();
    }
};

export const validateProjectExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { projectId } = req.params;
    try {
        const project = await Project.findById(projectId);

        if (!project) {
            const error = new Error("Project not found");
            res.status(404).json({ error: error.message });
            return;
        }

        req.project = project;

        next();
    } catch (error) {
        res.status(500).json({ error: "There's been an error" });
    }
};
