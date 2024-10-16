import mongoose, { Schema } from "mongoose";
import { ProjectType } from "../types/Projects";

const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true,
    },
    clientName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
});

const Project = mongoose.model<ProjectType>("Project", ProjectSchema);
export default Project;
