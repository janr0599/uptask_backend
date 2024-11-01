import { Request, Response, NextFunction } from "express";
import { noteSchema } from "../schemas/notesSchema";

export const validateNoteData = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const content = req.body;
    const validation = noteSchema.safeParse(content);
    if (!validation.success) {
        res.status(400).json({ error: validation.error.issues });
    } else {
        next();
    }
};
