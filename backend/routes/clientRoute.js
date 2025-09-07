import { Router } from "express";
import {
  loginClient,
  registerClient,
} from "../controllers/clientController.js";

const router = Router();
router.route("/register").post(registerClient);
router.route("/login").post(loginClient);

export default router;
