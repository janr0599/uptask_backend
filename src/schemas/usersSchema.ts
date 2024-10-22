import { z } from "zod";

export const userSchema = z
    .object({
        name: z.string().trim().min(1, "Name is required"),
        email: z
            .string()
            .trim()
            .min(1, "Email is required")
            .email("Invalid email address"),
        password: z
            .string()
            .trim()
            .min(8, "Password must be at least 8 characters"),
        confirmPassword: z
            .string()
            .trim()
            .min(8, "Please confirm your password"),
        confirmed: z.boolean().default(false),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // Specify the path to show the error message
    });
