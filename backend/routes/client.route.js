import { Router } from "express";
import { registerClient } from "../controllers/client.controller.js";

const router = Router();
router.route("/register").post(registerClient);

export default router;
