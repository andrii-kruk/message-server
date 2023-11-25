import express from "express";
import authController from "../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/sign-up", authController.signUp);
authRouter.post("/sign-in", authController.signIn);
authRouter.post("/sign-out", authController.signOut);

authRouter.get("/verify:verificationLink", authController.verify);
authRouter.get("/refresh", authController.refresh);

authRouter.get("/current", authController.getCurrent);

export default authRouter;
