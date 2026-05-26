import express from "express"
import { validateLogin } from "../middleware/auth.middleware.js";
import { generateNotes } from "../controllers/generate.controller.js";

const notesRouter = express.Router();


// api/notes/generateNotes

notesRouter.post("/generateNotes", validateLogin, generateNotes)

export default notesRouter