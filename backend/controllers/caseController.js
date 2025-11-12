import { Case } from "../models/caseModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
 

const searchByCnrNumber = asyncHandler(async (req, res) => {
  const cnrNumber = req.body;

  if (!cnrNumber?.trim()) {
    throw new ApiError(400, "CNR number is required");
  }

  const cnrPattern = /^[A-Za-z0-9]{16}$/;

  if (!cnrPattern.test(cnrNumber)) {
    throw new ApiError(
      400,
      "Invalid CNR format — must be a 16-character alphanumeric value"
    );
  }

  const caseData = await Case.findOne({
    cnrNumber: cnrNumber.toUpperCase(),
  });

  if (!caseData) {
    throw new ApiError(404, "Case not found with the provided CNR number ");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, caseData, "Case found successfully"));
});

const createCase = asyncHandler(async (req, res) => {
  const { caseType, caseNumber, cnrNumber, nextHearingDate, status, court } = req.body;

  // Check Required Fields
  if (!caseType?.trim()) {
    throw new ApiError(400, "Case type is required");
  }

  if (!caseNumber) {
    throw new ApiError(400, "Case number is required");
  }

  if (!cnrNumber?.trim()) {
    throw new ApiError(400, "CNR number is required");
  }

  if (!nextHearingDate) {
    throw new ApiError(400, "Next hearing date is required");
  }

  // CNR Format Validation (16 Alphanumeric)
  const cnrPattern = /^[A-Za-z0-9]{16}$/;
  if (!cnrPattern.test(cnrNumber)) {
    throw new ApiError(400, "Invalid CNR format — must be a 16-character alphanumeric value");
  }

  // Check if Case Already Exists (caseNumber or cnrNumber duplicate)
  const existingCase = await Case.findOne({
    $or: [{ caseNumber }, { cnrNumber: cnrNumber.toUpperCase() }]
  });

  if (existingCase) {
    throw new ApiError(400, "Case already exists with this Case Number or CNR Number");
  }

  // Create Case
  const newCase = await Case.create({
    caseType: caseType.trim(),
    caseNumber,
    cnrNumber: cnrNumber.toUpperCase(),
    nextHearingDate,
    status: status?.trim() || "Pending",
    court: court?.trim() || "Not Assigned"
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newCase, "New case registered successfully"));
});


export { searchByCnrNumber, createCase };


