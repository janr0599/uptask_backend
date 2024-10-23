import { Request, Response, NextFunction } from "express";
import { loginSchema, userSchema } from "../schemas/usersSchema";

export const validateUserData = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validation = userSchema.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({ error: validation.error.issues });
    } else {
        next();
    }
};

export const validateLogin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validation = loginSchema.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({ error: validation.error.issues });
    } else {
        next();
    }
};
