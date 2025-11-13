import { Case } from "../models/caseModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import crypto from "crypto";

//SEARCH BY CNR NUMBER

const searchByCnrNumber = asyncHandler(async (req, res) => {
  const { cnrNumber } = req.body;

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
    throw new ApiError(404, "Case not found with the provided CNR number");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, caseData, "Case found successfully"));
});

// CREATE CASE — CNR + CASE NUMBER AUTO GENERATE

const createCase = asyncHandler(async (req, res) => {
  const {
    court,
    caseType,
    shortCaseTitle,

    petitionerName,
    petitionerAddress,
    petitionerContact,
    petitionerAadhar,

    advocateName,
    advocateBarReg,
    advocateContact,
  } = req.body;

  // VALIDATION
  if (!court?.trim()) throw new ApiError(400, "Court name is required");
  if (!caseType?.trim()) throw new ApiError(400, "Case type is required");
  if (!shortCaseTitle?.trim())
    throw new ApiError(400, "Short case title is required");

  if (!petitionerName?.trim())
    throw new ApiError(400, "Petitioner name is required");
  if (!petitionerAddress?.trim())
    throw new ApiError(400, "Petitioner address is required");
  if (!petitionerContact?.trim())
    throw new ApiError(400, "Petitioner contact is required");
  if (!petitionerAadhar?.trim())
    throw new ApiError(400, "Petitioner Aadhar is required");

  if (!advocateName?.trim())
    throw new ApiError(400, "Advocate name is required");
  if (!advocateBarReg?.trim())
    throw new ApiError(400, "Advocate Bar Council Reg. No is required");
  if (!advocateContact?.trim())
    throw new ApiError(400, "Advocate contact is required");

  // AUTO-GENERATE CASE NUMBER
  const lastCase = await Case.findOne().sort({ caseNumber: -1 });
  const caseNumber = lastCase ? lastCase.caseNumber + 1 : 1;

  // AUTO-GENERATE CNR NUMBER (16 char alphanumeric)
  const cnrNumber = crypto.randomBytes(8).toString("hex").toUpperCase();

  // DEFAULT NEXT HEARING DATE = 30 DAYS FROM NOW
  const nextHearingDate = new Date();
  nextHearingDate.setDate(nextHearingDate.getDate() + 30);

  // CREATE CASE
  const newCase = await Case.create({
    court,
    caseType,
    shortCaseTitle,

    petitioner: {
      name: petitionerName.trim(),
      address: petitionerAddress.trim(),
      contact: petitionerContact.trim(),
      aadhar: petitionerAadhar.trim(),
    },

    advocate: {
      name: advocateName.trim(),
      barRegNo: advocateBarReg.trim(),
      contact: advocateContact.trim(),
    },

    caseNumber,
    cnrNumber,
    nextHearingDate,
    status: "Pending",
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        newCase,
        "New case registered successfully — CNR generated"
      )
    );
});

// FETCH CASE DETAILS USING CNR

const fetchCaseDetails = asyncHandler(async (req, res) => {
  const { cnrNumber } = req.body;

  if (!cnrNumber?.trim()) throw new ApiError(400, "CNR number is required");

  const cnrPattern = /^[A-Za-z0-9]{16}$/;
  if (!cnrPattern.test(cnrNumber))
    throw new ApiError(400, "Invalid CNR format");

  const caseData = await Case.findOne({
    cnrNumber: cnrNumber.toUpperCase(),
  }).lean();

  if (!caseData)
    throw new ApiError(404, "No case found with the provided CNR number");

  const caseDetails = {
    caseType: caseData.caseType,
    cnrNumber: caseData.cnrNumber,
    court: caseData.court,
    petitionerName: caseData.petitioner?.name,
    petitionerAddress: caseData.petitioner?.address,
    petitionerContact: caseData.petitioner?.contact,
    advocateName: caseData.advocate?.name,
    advocateBarRegNo: caseData.advocate?.barRegNo,
    advocateContact: caseData.advocate?.contact,
    filingDate: caseData.createdAt,
    status: caseData.status,
  };

  return res
    .status(200)
    .json(
      new ApiResponse(200, caseDetails, "Case details fetched successfully")
    );
});

export { searchByCnrNumber, createCase, fetchCaseDetails };
