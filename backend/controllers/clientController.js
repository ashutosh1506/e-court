import { asyncHandler } from "../utils/asyncHandler.js";
import { Client } from "../models/clientModel.js";
import bcrypt from "bcryptjs";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await Client.findById(userId);
    const Accesstoken = user.generateAccessToken();
    const RefeshToken = user.generateRefreshToken();
    user.refreshToken = RefeshToken; // ✅ match schema field (lowercase)
    await user.save({ validateBeforeSave: false });

    return { Accesstoken, RefeshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating refresh and access token"
    );
  }
};

const registerClient = asyncHandler(async (req, res) => {
  const {
    fullName,
    dob,
    email,
    phone,
    gender,
    state,
    password,
    confirm_password,
  } = req.body;

  if (
    !fullName ||
    !dob ||
    !email ||
    !phone ||
    !gender ||
    !state ||
    !password ||
    !confirm_password
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (password !== confirm_password) {
    throw new ApiError(400, "Passwords do not match");
  }

  const existingClient = await Client.findOne({ email });
  if (existingClient) {
    throw new ApiError(400, "Client already exists with this email");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const client = await Client.create({
    fullName,
    dob,
    email,
    phone,
    gender,
    state,
    password: hashedPassword,
    confirm_password: hashedPassword,
  });

  const createdClient = await Client.findById(client._id).select(
    "-password -confirm_password -refreshToken"
  );

  if (!createdClient) {
    throw new ApiError(
      500,
      "Something went wrong while registering the client"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdClient, "Client registered successfully")
    );
});

const loginClient = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const client = await Client.findOne({ email });
  if (!client) {
    throw new ApiError(404, "Client does not exist");
  }

  const isPasswordValid = await client.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  const { Accesstoken, RefeshToken } = await generateAccessAndRefreshToken(
    client._id
  );

  const loggedInClient = await Client.findById(client._id).select(
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
        { client: loggedInClient, Accesstoken, RefeshToken },
        "Client logged in successfully"
      )
    );
});

const clientLogout = asyncHandler(async (req, res) => {
  await Client.findByIdAndUpdate(
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
    .json(new ApiResponse(200, {}, "Client logged out successfully"));
});

const editClientProfile = asyncHandler(async (req, res) => {
  const loggedInClient = req.user._id;
  if (!loggedInClient) {
    throw new ApiError(401, "You must be logged in to edit profile");
  }

  const { fullName, dob, gender, phone, state } = req.body;

  const updateFields = {};
  if (fullName) updateFields.fullName = fullName;
  if (dob) updateFields.dob = dob;
  if (gender) updateFields.gender = gender;
  if (phone) updateFields.phone = phone;
  if (state) updateFields.state = state;

  const updatedProfileOfClient = await Client.findByIdAndUpdate(
    loggedInClient,
    updateFields,
    { new: true }
  ).select("-password -confirm_password -refreshToken");

  if (!updatedProfileOfClient) {
    throw new ApiError(500, "Something went wrong while updating profile");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedProfileOfClient,
        "Profile updated successfully"
      )
    );
});

const getClientDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const clientId = id || req.user?._id;

  const client = await Client.findById(clientId).select(
    "-password -confirm_password -refreshToken"
  );

  if (!client) {
    throw new ApiError(404, "Client not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, client, "Client details fetched successfully"));
});

export {
  registerClient,
  loginClient,
  clientLogout,
  editClientProfile,
  getClientDetails,
};
