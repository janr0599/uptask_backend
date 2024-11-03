import { z } from "zod";
import { Types } from "mongoose";

export const objectIdSchema = z
    .string()
    .refine((value) => Types.ObjectId.isValid(value), {
        message: "Invalid ObjectId",
    });

export const tokenSchema = z
    .string()
    .trim()
    .regex(/^\d+$/, "Invalid token")
    .min(1, "The token cannot be empty");

export const validatePasswordSchema = z
    .string()
    .trim()
    .min(1, "Password is required");
