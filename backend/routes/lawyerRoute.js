import { Router } from "express";
import {
  editLawyerProfile,
  lawyerLogout,
  loginLawyer,
  registerLawyer,
} from "../controllers/lawyerController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
const router = Router();

router.route("/register").post(registerLawyer);
router.route("/login").post(loginLawyer);
router.route("/logout").get(verifyJWT, lawyerLogout);
router.route("/editLawyerProfile").put(verifyJWT, editLawyerProfile);
export default router;
