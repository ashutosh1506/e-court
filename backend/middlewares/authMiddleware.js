import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { Client } from "../models/clientModel.js";
import { Lawyer } from "../models/lawyerModel.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    let userDoc = await Client.findById(decodedToken?._id).select(
      "-password -confirm_password -refreshToken"
    );
    if (!userDoc) {
      userDoc = await Lawyer.findById(decodedToken?._id).select(
        "-password -confirm_password -refreshToken"
      );
    }

    if (!userDoc) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = userDoc;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
