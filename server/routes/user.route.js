import express from "express"
import { getCurrentUser } from "../middleware/user.middleware.js";
import { validateLogin } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

// prefix : api/user

userRouter.get('/current', validateLogin, getCurrentUser)

export default userRouter;