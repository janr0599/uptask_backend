import { Document } from "mongoose";
import { Types } from "mongoose";

export type UserType = Document & {
    email: string;
    password: string;
    name: string;
    confirmed: boolean;
};

export type UserPayload = {
    id: Types.ObjectId;
};
