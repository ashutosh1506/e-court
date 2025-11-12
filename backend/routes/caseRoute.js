import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import {searchByCnrNumber , fetchCaseDetails } from "../controllers/caseController.js";
import { createCase } from "../controllers/caseController.js";

const router = Router();

router.route("/searchByCnrNumber").post(verifyJWT, searchByCnrNumber);
router.route("/registerCase").post(verifyJWT, createCase);
router.route("/fetchCaseDetails").post(verifyJWT, fetchCaseDetails);


export default router;
 
