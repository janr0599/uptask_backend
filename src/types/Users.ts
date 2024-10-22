import { Document } from "mongoose";

export type UserType = Document & {
    email: string;
    password: string;
    name: string;
    confirmed: boolean;
};
