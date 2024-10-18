import { Request, Response, NextFunction } from "express";
import { taskSchema, taskStatusSchema } from "../schemas/tasksSchema";
import { TaskType } from "../types/Tasks";
import Task from "../models/Tasks";

declare global {
    namespace Express {
        interface Request {
            task: TaskType;
        }
    }
}

export const validateTaskData = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validation = taskSchema.safeParse(req.body);

    if (!validation.success) {
        res.status(400).json({ error: validation.error.issues });
        return;
    }

    next();
};

export const validateTaskStatus = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validation = taskStatusSchema.safeParse(req.body);

    if (!validation.success) {
        res.status(400).json({ error: validation.error.issues });
        return;
    }

    next();
};

export const validateTaskExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { taskId } = req.params;

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            const error = new Error("task not found");
            res.status(404).json({ error: error.message });
            return;
        }

        req.task = task;

        next();
    } catch (error) {
        res.status(500).json({ error: "There's been an error" });
    }
};

export const taskBelongsToProject = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.task.project.toString() !== req.project.id.toString()) {
        const error = new Error("Invalid action");
        res.status(400).json({ error: error.message });
        return;
    }

    next();
};
