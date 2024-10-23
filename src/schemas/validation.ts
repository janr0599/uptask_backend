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
    .length(6, "The token cannot be empty");
