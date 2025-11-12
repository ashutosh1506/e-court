import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { searchByCaseType, searchByCnrNumber } from "../controllers/caseController.js";
import { createCase } from "../controllers/caseController.js";

const router = Router();

router.route("/searchByCnrNumber").post(verifyJWT, searchByCnrNumber);
router.route("/searchByCaseType").post(verifyJWT, searchByCaseType);

router.route("/registerCase").post(verifyJWT, createCase);

export default router;
 
