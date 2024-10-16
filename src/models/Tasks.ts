import mongoose, { Schema, Types } from "mongoose";
import { TaskType } from "../types/Tasks";

const taskStatus = {
    PENDING: "pending",
    ON_HOLD: "onHold",
    IN_PROGRESS: "inProgress",
    UNDER_REVIEW: "underReview",
    COMPLETED: "completed",
} as const;

export type TaskStatus = (typeof taskStatus)[keyof typeof taskStatus];

const TaskSchema: Schema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },
        description: {
            type: String,
            trim: true,
            required: true,
        },
        project: {
            type: Types.ObjectId,
            ref: "Project",
        },
        status: {
            type: String,
            enum: Object.values(taskStatus),
            default: taskStatus.PENDING,
        },
    },
    { timestamps: true }
);

const Task = mongoose.model<TaskType>("Task", TaskSchema);
export default Task;
