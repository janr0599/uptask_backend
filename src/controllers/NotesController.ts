import { Request, Response } from "express";
import Note from "../models/Notes";
import { NoteParams, NoteType } from "../types/Notes";
import { Types } from "mongoose";

export class NotesController {
    static createNote = async (
        req: Request<{}, {}, NoteType>,
        res: Response
    ) => {
        const { content } = req.body;
        try {
            const note = new Note();
            note.content = content;
            note.createdBy = req.user._id;
            note.task = req.task._id;

            req.task.notes.push(note.id);

            await Promise.allSettled([req.task.save(), note.save()]);
            res.status(201).json({ message: "Note created successfully" });
        } catch (error) {
            res.status(500).json({ message: "There's been an error" });
        }
    };

    static getTaskNotes = async (req: Request, res: Response) => {
        try {
            const notes = await Note.find({ task: req.task.id });
            res.status(200).json({ notes: notes });
        } catch (error) {
            res.status(500).json({ message: "There's been an error" });
        }
    };

    static updateNote = async (
        req: Request<NoteParams, {}, NoteType>,
        res: Response
    ) => {
        const { noteId } = req.params;
        const { content } = req.body;
        try {
            const note = await Note.findById(noteId);
            note.content = content;

            await note.save();
            res.status(200).json({ message: "Note updated successfully" });
        } catch (error) {
            res.status(500).json({ message: "There's been an error" });
        }
    };

    static deleteNote = async (req: Request<NoteParams>, res: Response) => {
        const noteId = new Types.ObjectId(req.params.noteId); // Convert string to ObjectId

        const noteExists = await Note.findById({
            _id: noteId,
        });

        if (!noteExists) {
            const error = new Error("Note not found");
            res.status(404).json({ error: error.message });
            return;
        }

        const isAuthor =
            noteExists.createdBy.toString() === req.user.id.toString();

        if (!isAuthor) {
            const error = new Error("Invalid action");
            res.status(401).json({ error: error.message });
            return;
        }

        req.task.notes = req.task.notes.filter(
            (note) => note.toString() !== noteId.toString()
        );

        try {
            await Promise.allSettled([req.task.save(), noteExists.save()]);
            res.status(200).json({ message: "Note deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "There's been an error" });
        }
    };
}
