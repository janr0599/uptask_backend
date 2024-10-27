import { Request, Response, NextFunction } from "express";

import { objectIdSchema, tokenSchema } from "../schemas/validation";

export const validateId = (req: Request, res: Response, next: NextFunction) => {
    const { id, taskId } = req.params;
    const { memberId } = req.body;
    const validation = objectIdSchema.safeParse(id || taskId || memberId);
    if (!validation.success) {
        res.json({ error: validation.error.issues });
    } else {
        next();
    }
};

export const validateToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { token } = req.body;
    const validation = tokenSchema.safeParse(token);
    if (!validation.success) {
        res.json({ error: validation.error.issues });
    } else {
        next();
    }
};
