import { Request, Response, NextFunction } from "express";
import {
    loginSchema,
    registrationSchema,
    requestCodeSchema,
    resetPasswordSchema,
} from "../schemas/usersSchema";
import { tokenSchema } from "../schemas/validation";

export const validateUserData = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validation = registrationSchema.safeParse(req.body);
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

export const validateEmail = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validation = requestCodeSchema.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({ error: validation.error.issues });
    } else {
        next();
    }
};

export const validateNewPassword = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { token } = req.params;
    const tokenValidation = tokenSchema.safeParse(token);
    if (!tokenValidation.success) {
        res.status(400).json({ error: tokenValidation.error.issues });
    }

    const validation = resetPasswordSchema.safeParse(req.body);
    if (!validation.success) {
        res.status(400).json({ error: validation.error.issues });
    } else {
        next();
    }
};
