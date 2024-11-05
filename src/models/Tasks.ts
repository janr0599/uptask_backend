import mongoose, { Schema, Types } from "mongoose";
import { TaskType } from "../types/Tasks";
import Note from "./Notes";

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
        notes: [
            {
                type: Types.ObjectId,
                ref: "Note",
            },
        ],
    },
    { timestamps: true }
);

// Middleware to delete task notes when task is deleted
TaskSchema.pre("deleteOne", { document: true }, async function () {
    const taskId = this._id;
    if (!taskId) return;
    await Note.deleteMany({ task: taskId });
});

const Task = mongoose.model<TaskType>("Task", TaskSchema);
export default Task;
