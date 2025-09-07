import { Router } from "express";
import { loginLawyer, registerLawyer } from "../controllers/lawyerController.js";

const router = Router();

router.route("/register").post(registerLawyer);
router.route("/login").post(loginLawyer);

export default router;
