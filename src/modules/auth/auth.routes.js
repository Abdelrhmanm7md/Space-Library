import express from "express";
const authRouter = express.Router();

import * as authController from "./auth.controller.js";
import { validation } from "../../utils/middleWare/validation.js";
import { registerValidationSchema } from "./auth.validator.js";

authRouter.post("/signup", authController.signUp);
authRouter.post("/signin", authController.signIn);
authRouter.get("/otp", authController.sendOTP);
authRouter.post("/vierfy", authController.protectRoutes ,authController.vierfyVerificationCode);
authRouter.post("/forget", authController.forgetPassword);

export default authRouter;
