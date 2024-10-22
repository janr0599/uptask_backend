import { z } from "zod";

export const userSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Invalid email address"),
    password: z.string().trim().min(1, "Password is required"),
    name: z.string().trim().min(1, "Name is required"),
    confirmed: z.boolean(),
});
