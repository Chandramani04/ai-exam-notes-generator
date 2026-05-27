import dotenv from "dotenv"
dotenv.config()
/*-------------------------------------*/
import express from "express"
import { dbConnect } from "./lib/db.js";
import authRouter from "./routes/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import notesRouter from "./routes/notes.route.js";
import pdfDownloadRouter from "./routes/pdfDownload.route.js";
import creditsRouter from "./routes/credits.routes.js";
import { stripeWebhook } from "./controllers/credits.controller.js";


const app = express();
const PORT = process.env.PORT || 3000

// stripe webhook needs raw body, so we need to add this middleware before express.json() 
app.post('/api/credits/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

// middlewares
app.use(express.json())
app.use(cookieParser())

// let origin = process.env.CLIENT_URL;
// if (!origin) {
//     origin = "http://localhost:5173";
// }
app.use(cors(
    {
        origin: "https://ai-exam-notes-generator-client-zmxe.onrender.com", // allow requests only from this origin
        credentials: true, // allow cookies to be sent in cross-origin requests
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // OPTIONS is needed for preflight request
    }
))


app.get("/", (req, res) => {
    res.json({
        message: "Server is running successfully"
    })
})

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/notes', notesRouter)
app.use('/api/pdf', pdfDownloadRouter);
app.use('/api/credits', creditsRouter);


const startServer = async () => {
    try {
        await dbConnect();

        app.listen(PORT, () => {
            console.log(`Server running on PORT ${PORT}`);
        });

    } catch (error) {
        console.log("DB Connection Error:", error);
    }
};

startServer();