import {asyncHandler} from"../utils/asyncHandler.js";
import {Client} from"../models/clientModel.js";
import bcrypt from"bcryptjs";
import jwt from"jsonwebtoken";
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"

const generateAccessAndRefreshToken=async(userId)=> {
  try {
 const user= await Client.findById(userId)

 const Accesstoken= user.generateAccessToken()

 const RefeshToken= user.generateRefreshToken()

 // reffresh token in db daalo
 user.RefeshToken=RefeshToken
 await user.save({validateBeforeSave:false})

 return {Accesstoken,RefeshToken}

  } catch (error) {
    throw new ApiError(500,"something went wrong while generating refresh and access token")
  }
}

const registerClient=asyncHandler(async(req,res)=>{
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
    throw new ApiError(400, 'All fields are required');
  }

  if (password !== confirm_password) {
    throw new ApiError(400, 'Passwords do not match');
  }

 
  const existingClient = await Client.findOne({ email });
  if (existingClient) {
    throw new ApiError(400, 'Client already exists with this email');
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
    '-password -confirm_password -refreshToken'
  );

  if (!createdClient) {
    throw new ApiError(500, 'Something went wrong while registering the client');
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdClient, 'Client registered successfully')
    );
});

const loginClient=asyncHandler(async(req,res)=>{
     const { email, password } = req.body;

  // 1. Validate input
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // 2. Find client by email
  const client = await Client.findOne({ email });

  if (!client) {
    throw new ApiError(404, "Client does not exist");
  }

  // 3. Validate password
  const isPasswordValid = await client.isPasswordCorrect(password); 
  // Make sure to implement isPasswordCorrect method in Client model

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  // 4. Generate tokens
  const { Accesstoken, RefeshToken } = await generateAccessAndRefreshToken(client._id);

  // 5. Remove sensitive data from response
  const loggedInClient = await Client.findById(client._id).select("-password -confirm_password");

  // 6. Cookie options
  const options = {
    httpOnly: true,
    secure: true, // Set to true in production (HTTPS)
  };

  // 7. Send response
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
})

export { registerClient ,loginClient};