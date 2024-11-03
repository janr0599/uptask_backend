import { z } from "zod";

// Registration schema
export const userSchema = z.object({
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
    confirmPassword: z.string().trim().min(1, "Please confirm your password"),
    confirmed: z.boolean().default(false),
});

export const registrationSchema = userSchema
    .pick({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        confirmed: true,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // Specify the path to show the error message
    });

// Login schema
export const loginSchema = userSchema
    .pick({
        email: true,
        password: true,
    })
    .extend({
        password: z.string().trim().min(1, "Password is required"),
    });

// Request code schema
export const requestCodeSchema = userSchema.pick({
    email: true,
});

// Reset password schema
export const resetPasswordSchema = userSchema
    .pick({
        password: true,
        confirmPassword: true,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
