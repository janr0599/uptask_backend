import mongoose, { Schema, Types } from "mongoose";
import { TokenType } from "../types/Token";

const tokenSchema: Schema = new Schema(
    {
        token: {
            type: String,
            required: true,
        },
        user: {
            type: Types.ObjectId,
            ref: "User",
        },
        createdAt: {
            type: Date,
            default: () => Date.now(),
            expires: "15m",
        },
    },
    { timestamps: true }
);

const Token = mongoose.model<TokenType>("Token", tokenSchema);
export default Token;
