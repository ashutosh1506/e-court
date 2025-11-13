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
    image,
    lawyerType,
  } = req.body;

  // Required fields validation
  if (
    !fullName ||
    !dob ||
    !email ||
    !phone ||
    !barAssociationNo ||
    !state ||
    !gender ||
    !password ||
    !lawyerType
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Image Validation (optional but if provided, must be valid URL)
  if (image && !/^https?:\/\/.+/i.test(image)) {
    throw new ApiError(400, "Invalid image URL");
  }
  // Password match validation handled on frontend; backend doesn't require confirm password

  // Check for existing lawyer
  const existingLawyer = await Lawyer.findOne({ email });
  if (existingLawyer) {
    throw new ApiError(400, "Lawyer already exists with this email");
  }

  // Create lawyer
  const lawyer = await Lawyer.create({
    fullName,
    dob,
    email,
    phone,
    barAssociationNo,
    state,
    gender,
    image,
    lawyerType,
    password,
  });

  // Remove sensitive fields before sending response
  const createdLawyer = await Lawyer.findById(lawyer._id).select(
    "-password -confirm_password -refreshToken"
  );

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdLawyer, "Lawyer registered successfully")
    );
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

const lawyerLogout = asyncHandler(async (req, res) => {
  await Lawyer.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Lawyer logged out successfully"));
});

const editLawyerProfile = asyncHandler(async (req, res) => {
  const loggedInLawyer = req.user._id;
  if (!loggedInLawyer) {
    throw new ApiError(401, "You must be logged in to edit profile");
  }

  const {
    fullName,
    dob,
    gender,
    phone,
    state,
    barAssociationNo,
    image,
    lawyerType,
  } = req.body;

  // Validation helpers
  const isValidDate = (d) => {
    const date = new Date(d);
    return !Number.isNaN(date.getTime());
  };
  const isFutureDate = (d) => new Date(d) > new Date();
  const isValidURL = (u) =>
    typeof u === "string" && /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(u);
  const isValidPhone = (p) => typeof p === "string" && /^[0-9]{10,15}$/.test(p); // 10-15 digits

  // Allowed enums
  const allowedGenders = ["Male", "Female", "Other"];
  const allowedTypes = [
    "Criminal",
    "Civil",
    "Family",
    "Corporate",
    "Property",
    "Tax",
    "Others",
  ];

  // Collect validation errors
  const errors = [];

  if (dob) {
    if (!isValidDate(dob)) errors.push("Invalid dob format");
    else if (isFutureDate(dob)) errors.push("dob cannot be in the future");
  }

  if (gender && !allowedGenders.includes(gender)) {
    errors.push("Invalid gender value");
  }

  if (phone && !isValidPhone(phone)) {
    errors.push("Invalid phone number (expect 10-15 digits)");
  }

  if (image && !isValidURL(image)) {
    errors.push("Invalid image URL");
  }

  if (lawyerType && !allowedTypes.includes(lawyerType)) {
    errors.push(`Invalid lawyerType. Allowed: ${allowedTypes.join(", ")}`);
  }

  if (barAssociationNo) {
    const conflict = await Lawyer.findOne({
      barAssociationNo,
      _id: { $ne: loggedInLawyer },
    });
    if (conflict) errors.push("barAssociationNo already in use");
  }

  if (errors.length) {
    throw new ApiError(400, errors.join("; "));
  }

  const updateFields = {};
  if (fullName) updateFields.fullName = fullName;
  if (dob) updateFields.dob = new Date(dob);
  if (gender) updateFields.gender = gender;
  if (phone) updateFields.phone = phone;
  if (state) updateFields.state = state;
  if (barAssociationNo) updateFields.barAssociationNo = barAssociationNo;
  if (image) updateFields.image = image;
  if (lawyerType) updateFields.lawyerType = lawyerType;

  const updatedProfileOfLawyer = await Lawyer.findByIdAndUpdate(
    loggedInLawyer,
    { $set: updateFields },
    { new: true, runValidators: true }
  ).select("-password -confirm_password -refreshToken");

  if (!updatedProfileOfLawyer) {
    throw new ApiError(500, "Something went wrong while updating profile");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedProfileOfLawyer,
        "Profile updated successfully"
      )
    );
});

const getLawyerDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const lawyerId = id || req.user?._id;

  const lawyer = await Lawyer.findById(lawyerId).select(
    "-password -confirm_password -refreshToken"
  );

  if (!lawyer) {
    throw new ApiError(404, "Lawyer not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, lawyer, "Lawyer details fetched successfully"));
});
const getAllLawyers = asyncHandler(async (req, res) => {
  const lawyers = await Lawyer.find().select(
    "-password -confirm_password -refreshToken"
  );

  if (!lawyers || lawyers.length === 0) {
    throw new ApiError(404, "No lawyers found in the database");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, lawyers, "All lawyer details fetched successfully")
    );
});
export {
  registerLawyer,
  loginLawyer,
  lawyerLogout,
  editLawyerProfile,
  getLawyerDetails,
  getAllLawyers,
};
