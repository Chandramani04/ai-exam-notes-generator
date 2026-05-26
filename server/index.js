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


const app = express();
const PORT = process.env.PORT || 3000

// middlewares

app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin: process.env.CLIENT_URL, // allow requests only from this origin
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


app.listen(PORT, () => {
    console.log("server running on PORT = ", PORT);
    dbConnect();
    console.log("GEMINI_API_KEY from index.js:", process.env.GEMINI_API_KEY); // log the API key to verify it's being read correctly
})