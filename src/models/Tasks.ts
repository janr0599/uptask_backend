import mongoose, { Schema, Types } from "mongoose";
import { TaskType } from "../types/Tasks";

export const taskStatus = {
    PENDING: "pending",
    ON_HOLD: "onHold",
    IN_PROGRESS: "inProgress",
    UNDER_REVIEW: "underReview",
    COMPLETED: "completed",
} as const;

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
        completedBy: [
            {
                user: {
                    type: Types.ObjectId,
                    ref: "User",
                    default: null,
                },
                status: {
                    type: String,
                    enum: Object.values(taskStatus),
                    default: taskStatus.PENDING,
                },
            },
        ],
    },
    { timestamps: true }
);

const Task = mongoose.model<TaskType>("Task", TaskSchema);
export default Task;
