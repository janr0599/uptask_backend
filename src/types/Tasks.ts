import { Document, Types } from "mongoose";
import { taskStatus } from "../models/Tasks";

export type TaskStatus = (typeof taskStatus)[keyof typeof taskStatus];

//Mongoose Model Type
export type TaskType = Document & {
    name: string;
    description: string;
    project: Types.ObjectId;
    status: TaskStatus;
    completedBy: {
        user: Types.ObjectId;
        status: TaskStatus;
    }[];
    notes: Types.ObjectId[];
    _id: Types.ObjectId;
};
