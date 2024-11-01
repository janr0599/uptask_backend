import { Router } from "express";
import { NotesController } from "../controllers/NotesController";
import { validateNoteData } from "../middleware/noteMiddleware";
import { validateId } from "../middleware/validation";

const router = Router({ mergeParams: true });

router.post("/", validateNoteData, NotesController.createNote);
router.get("/", NotesController.getTaskNotes);
router.put(
    "/:noteId",
    validateId,
    validateNoteData,
    NotesController.updateNote
);
router.delete("/:noteId", validateId, NotesController.deleteNote);

export default router;
