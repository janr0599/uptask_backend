import { z } from "zod";
import { Types } from "mongoose";

export const taskSchema = z.object({
    name: z.string().trim().min(1, "Task name is required"),
    description: z.string().trim().min(1, "description is required"),
    project: z.string().refine((value) => Types.ObjectId.isValid(value), {
        message: "Invalid ObjectId",
    }),
});
