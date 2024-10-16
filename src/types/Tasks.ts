import { Document, Types } from "mongoose";

//Mongoose Model Type
export type TaskType = Document & {
    name: string;
    description: string;
    project: Types.ObjectId;
};
