import express from "express"
import { validateLogin } from "../middleware/auth.middleware.js";
import { generateNotes } from "../controllers/generate.controller.js";
import { getMyNotes, getSingleNote } from "../controllers/notes.controller.js";

const notesRouter = express.Router();


// api/notes/generateNotes
notesRouter.post("/generateNotes", validateLogin, generateNotes);
// api/notes/getNotes
notesRouter.get("/getNotes", validateLogin, getMyNotes);
// api/notes/:id
notesRouter.get("/:id", validateLogin, getSingleNote);

export default notesRouter;