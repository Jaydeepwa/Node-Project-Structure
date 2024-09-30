import { Router } from "express";
import * as authController from "../controller/authController";
const router = Router();

router.post("/auth/signin", authController.signInUser);

router.post("/auth/signup", authController.signUpUser);

export default router;