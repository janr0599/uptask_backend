import { z } from "zod";
import mongoose from "mongoose";

export const ProjectSchema = z.object({
    projectName: z.string().trim().min(1, "Project name is required"),
    clientName: z.string().trim().min(1, "Client name is required"),
    description: z.string().trim().min(1, "Description is required"),
});

export const objectIdSchema = z
    .string()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
        message: "Invalid ObjectId",
    });
