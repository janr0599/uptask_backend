import { Request, Response, NextFunction } from "express";

import { objectIdSchema } from "../schemas/validation";

export const validateId = (req: Request, res: Response, next: NextFunction) => {
    const { id, taskId } = req.params;
    const validation = objectIdSchema.safeParse(id || taskId);
    if (!validation.success) {
        res.json({ error: validation.error.issues });
    } else {
        next();
    }
};
