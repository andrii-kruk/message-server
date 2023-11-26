import express from "express";

import authController from "../controllers/auth-controller.js";
import { validation } from "../middlewares/index.js";
const authRouter = express.Router();

authRouter.post("/sign-up", validation.signUpValidation, authController.signUp);
authRouter.post("/sign-in", validation.signInValidation, authController.signIn);
authRouter.post("/sign-out", authController.signOut);

authRouter.get("/verify/:verificationCode", authController.verify);
authRouter.get("/refresh", authController.refresh);

authRouter.get("/current", authController.getCurrent);

export default authRouter;
