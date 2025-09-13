import { Router } from "express";
import {
  clientLogout,
  editClientProfile,
  loginClient,
  registerClient,
  getClientDetails,   
} from "../controllers/clientController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

// Public routes
router.route("/register").post(registerClient);
router.route("/login").post(loginClient);

// Protected routes
router.get("/logout", verifyJWT, clientLogout);
router.put("/editClientProfile", verifyJWT, editClientProfile);

// Fetch client details
router.get("/details", verifyJWT, getClientDetails);      
router.get("/details/:id", verifyJWT, getClientDetails);

export default router;
