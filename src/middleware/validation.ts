import { Request, Response, NextFunction } from "express";

import {
    objectIdSchema,
    tokenSchema,
    validatePasswordSchema,
} from "../schemas/validation";

export const validateId = (req: Request, res: Response, next: NextFunction) => {
    const { id, taskId, userId, noteId } = req.params;
    const { memberId } = req.body;
    const validation = objectIdSchema.safeParse(
        id || taskId || memberId || userId || noteId
    );
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

export const validatePassword = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { password } = req.body;
    console.log(password);
    const validation = validatePasswordSchema.safeParse(password);
    if (!validation.success) {
        console.log(validation.error.errors);
        res.json({ error: validation.error.issues });
    } else {
        next();
    }
};
