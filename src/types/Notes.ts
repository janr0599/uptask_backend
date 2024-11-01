import { Document, Types } from "mongoose";

export type NoteType = Document & {
    content: string;
    createdBy: Types.ObjectId;
    task: Types.ObjectId;
};

export type NoteParams = {
    noteId: string;
};
