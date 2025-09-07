import { asyncHandler } from "../utils/asyncHandler.js";
import { Client } from "../models/client.model.js";
import bcrypt from "bcryptjs";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

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

export { registerClient };
