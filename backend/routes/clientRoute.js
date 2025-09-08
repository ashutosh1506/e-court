import { Router } from "express";

import {
  clientLogout,
  editClientProfile,
  loginClient,
  registerClient,
} from "../controllers/clientController.js";

import { verifyJWT } from "../middlewares/authMiddleware.js";
const router = Router();

router.route("/register").post(registerClient);
router.route("/login").post(loginClient);
router.route("/logout").get(verifyJWT,clientLogout)
router.route("/editClientProfile").put(verifyJWT,editClientProfile)

export default router;
