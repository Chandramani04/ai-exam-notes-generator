import express from "express"
import { googleAuth, logout } from "../controllers/auth.cotroller.js";

const authRouter = express.Router();

// prefix - /api/auth

// when user hit api/auth/google -> call googleAuth controller function
authRouter.post("/google", googleAuth);
authRouter.post("/logout", logout);

export default authRouter;