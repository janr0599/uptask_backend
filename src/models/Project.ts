import mongoose, { Schema, Types } from "mongoose";
import { ProjectType } from "../types/Projects";
import Task from "./Tasks";
import Note from "./Notes";

const ProjectSchema: Schema = new Schema(
    {
        projectName: {
            type: String,
            trim: true,
            required: true,
        },
        clientName: {
            type: String,
            trim: true,
            required: true,
        },
        description: {
            type: String,
            trim: true,
            required: true,
        },
        tasks: [
            {
                type: Types.ObjectId,
                ref: "Task",
            },
        ],
        manager: {
            type: Types.ObjectId,
            ref: "User",
        },
        team: [
            {
                type: Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

// Middleware to delete project tasks and notes of those tasks when project is deleted
ProjectSchema.pre("deleteOne", { document: true }, async function () {
    const projectId = this._id;
    if (!projectId) return;

    const tasks = await Task.find({ project: projectId });
    for (const task of tasks) {
        await Note.deleteMany({ task: task.id });
    }

    await Task.deleteMany({ project: projectId });
});

const Project = mongoose.model<ProjectType>("Project", ProjectSchema);
export default Project;
