import { asyncHandler } from "../utils/asyncHandler.js";
import { Lawyer } from "../models/lawyerModel.js";
import bcrypt from "bcryptjs";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await Lawyer.findById(userId);
    const Accesstoken = user.generateAccessToken();
    const RefeshToken = user.generateRefreshToken();
    user.refreshToken = RefeshToken;
    await user.save({ validateBeforeSave: false });
    return { Accesstoken, RefeshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating tokens");
  }
};

// REGISTER
const registerLawyer = asyncHandler(async (req, res) => {
  const {
    fullName,
    dob,
    email,
    phone,
    barAssociationNo,
    state,
    gender,
    password,
    confirm_password,
  } = req.body;

  if (
    !fullName ||
    !dob ||
    !email ||
    !phone ||
    !barAssociationNo ||
    !state ||
    !gender ||
    !password ||
    !confirm_password
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (password !== confirm_password) {
    throw new ApiError(400, "Passwords do not match");
  }

  const existingLawyer = await Lawyer.findOne({ email });
  if (existingLawyer) {
    throw new ApiError(400, "Lawyer already exists with this email");
  }

  const lawyer = await Lawyer.create({
    fullName,
    dob,
    email,
    phone,
    barAssociationNo,
    state,
    gender,
    password,
    confirm_password: password,
  });

  const createdLawyer = await Lawyer.findById(lawyer._id).select(
    "-password -confirm_password -refreshToken"
  );

  return res
    .status(201)
    .json(new ApiResponse(200, createdLawyer, "Lawyer registered successfully"));
});

// LOGIN
const loginLawyer = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const lawyer = await Lawyer.findOne({ email });
  if (!lawyer) {
    throw new ApiError(404, "Lawyer does not exist");
  }

  const isPasswordValid = await lawyer.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  const { Accesstoken, RefeshToken } = await generateAccessAndRefreshToken(
    lawyer._id
  );

  const loggedInLawyer = await Lawyer.findById(lawyer._id).select(
    "-password -confirm_password"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", Accesstoken, options)
    .cookie("refreshToken", RefeshToken, options)
    .json(
      new ApiResponse(
        200,
        { lawyer: loggedInLawyer, Accesstoken, RefeshToken },
        "Lawyer logged in successfully"
      )
    );
});

export { registerLawyer, loginLawyer };
