import { Request, Response, NextFunction } from "express";
import { objectIdSchema, ProjectSchema } from "../schemas/projectsSchemas";

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

export const validateProjectId = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validation = objectIdSchema.safeParse(req.params.id);
    if (!validation.success) {
        res.json({ error: validation.error.issues });
    } else {
        next();
    }
};
