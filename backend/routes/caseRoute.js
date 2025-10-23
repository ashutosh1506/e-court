import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { searchByCaseType, searchByCnrNumber } from "../controllers/caseController.js";


const router = Router();

router.route("/searchByCnrNumber").post(verifyJWT, searchByCnrNumber);
router.route("/searchByCaseType").post(verifyJWT, searchByCaseType);

export default router;
 
