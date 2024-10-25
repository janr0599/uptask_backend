import mongoose, { Schema, Types } from "mongoose";
import { ProjectType } from "../types/Projects";

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
    },
    { timestamps: true }
);

const Project = mongoose.model<ProjectType>("Project", ProjectSchema);
export default Project;
