import { Router } from "express";
import {
  editLawyerProfile,
  lawyerLogout,
  loginLawyer,
  registerLawyer,
  getLawyerDetails,
} from "../controllers/lawyerController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

// Public routes
router.post("/register", registerLawyer);
router.post("/login", loginLawyer);

// Protected routes
router.get("/logout", verifyJWT, lawyerLogout);
router.put("/editLawyerProfile", verifyJWT, editLawyerProfile);

// Fetch lawyer details
router.get("/details", verifyJWT, getLawyerDetails);
router.get("/details/:id", verifyJWT, getLawyerDetails);

export default router;
