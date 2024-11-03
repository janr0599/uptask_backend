import { z } from "zod";
import { userSchema } from "./usersSchema";

//Update Profile schema
export const updateProfileSchema = userSchema.pick({
    name: true,
    email: true,
});

// Change current password schema
export const changeCurrentPasswordSchema = userSchema
    .pick({
        password: true,
        confirmPassword: true,
    })
    .extend({
        currentPassword: z
            .string()
            .trim()
            .min(1, "Current Password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
