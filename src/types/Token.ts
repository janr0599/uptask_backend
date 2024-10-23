import { Document, Types } from "mongoose";

export type TokenType = Document & {
    token: string;
    user: Types.ObjectId;
    createdAt: Date;
};
