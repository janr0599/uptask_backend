import { Document } from "mongoose";
import { Types } from "mongoose";

export type UserType = Document & {
    email: string;
    password: string;
    name: string;
    confirmed: boolean;
    _id: Types.ObjectId;
};

export type UserPayload = {
    id: Types.ObjectId;
};
