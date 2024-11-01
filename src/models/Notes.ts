import mongoose, { Schema, Types } from "mongoose";
import { NoteType } from "../types/Notes";

const NoteSchema: Schema = new Schema(
    {
        content: {
            type: String,
            trim: true,
            required: true,
        },
        createdBy: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
        },
        task: {
            type: Types.ObjectId,
            ref: "Task",
            required: true,
        },
    },
    { timestamps: true }
);

const Note = mongoose.model<NoteType>("Note", NoteSchema);
export default Note;
