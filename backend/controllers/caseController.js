import { Case } from "../models/caseModel";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const searchByCaseType = asyncHandler(async (req, res) => {

    const { caseType, caseNumber } = req.body

    if (!caseType?.trim()) {
        throw new ApiError(400, "Case type is required");
    }

    if (!caseNumber?.trim()) {
        throw new ApiError(400, "Case number is required");
    }

    const caseData = await Case.findOne({
        caseType: caseType.trim(),
        caseNumber: caseNumber.trim()
    })

    if (!caseData) {
        throw new ApiError(404, "Case not found with the provided details ");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, caseData, "Case found successfully")
        );
})

const searchByCnrNumber = asyncHandler(async (req, res) => {

    const cnrNumber = req.body

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
        cnrNumber: cnrNumber.toUpperCase()
    })

    if (!caseData) {
        throw new ApiError(404, "Case not found with the provided CNR number ");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, caseData, "Case found successfully")
        );
})

export {

    searchByCaseType,
    searchByCnrNumber
};