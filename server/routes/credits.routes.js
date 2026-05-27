
import express from "express";
import { validateLogin } from "../middleware/auth.middleware.js";
import { creditCreditsOrder } from "../controllers/credits.controller.js";

const creditsRouter = express.Router();


// api/credits/order 

creditsRouter.post("/order", validateLogin, creditCreditsOrder);



export default creditsRouter;



