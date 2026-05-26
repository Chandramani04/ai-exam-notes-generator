import express from "express"
import { validateLogin } from "../middleware/auth.middleware.js";
import { pdfDownload } from "../controllers/pdf.controller.js";

const pdfDownloadRouter = express.Router();

// api/pdf/generatePdf
pdfDownloadRouter.post("/generatePdf", validateLogin, pdfDownload)

export default pdfDownloadRouter