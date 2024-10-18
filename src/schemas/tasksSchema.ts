import { z } from "zod";

export const taskSchema = z.object({
    name: z.string().trim().min(1, "Task name is required"),
    description: z.string().trim().min(1, "description is required"),
});

export const taskStatusSchema = z.object({
    status: z.string().trim().min(1, "The status is required"),
});
