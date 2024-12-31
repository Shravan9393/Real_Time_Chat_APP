import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import path from "path";
import mongoose from "mongoose";

// function to generate access token and refresh token

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId); // Find user by ID
    const accessToken = user.generateAccessToken(); // Generate access token
    const refreshToken = user.generateRefreshToken(); // Generate refresh token

    user.refreshToken = refreshToken; // Save refresh token to user
    await user.save({ validateBeforeSave: false }); // Save user without validation

    return { accessToken, refreshToken }; // Return tokens
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};



// Handler to register a new user.

const registerUser = asyncHandler( async (req, res) => {
    const { fullName, email, password, username} = req.body;
    console.log("fullName : ", fullName);
    console.log("email : ", email);
    console.log("username : ", username);
    console.log("password : ", password);


    // ensure all required fields are provide or not
    if([fullName, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // check if user already exists or not

    const existedUser = await User.findOne({ $or: [{email}, {username}]});
    if(existedUser) {
        throw new ApiError(400, "User already exists");
    }

    console.log("req.files : ", req.files);

    // Normalize avatar and cover image paths

    const avatarLocalPath = req?.files?.avatar?.[0]?.path
         ? path.normalize(req.files.avatar[0].path) 
         : null;
    const coverImageLocalPath = req?.files?.coverImage?.[0]?.path
         ? path.normalize(req.files.coverImage[0].path) 
         : null;

    if(!avatarLocalPath){
        console.log("Avatar is required, file is missing");
        throw new ApiError(400, "Avatar is required, file is missing");
    }

    // Upload avatar and cover image to cloudinary

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = coverImageLocalPath
        ? await uploadOnCloudinary(coverImageLocalPath)
        : null;

    if(!avatar){
        console.log("Avatar upload failed");
        throw new ApiError(500, "Avatar upload failed");
    }

    // create new user entry in database

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    });


    // retrive the created user without password and refresh token
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if(!createdUser){
        console.log("User not found");
        throw new ApiError(500, "User not found");
    }

    return res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", createdUser));

});

// handler to login the registered user;

const loginUser = asyncHandler( async(req, res) => {
  // 1. gets the email id or username and password from req.body
  const { email, username, password } = req.body;

  // 2. check if got email or password or not
  if (!(username || email)) {
    throw new ApiError(400, "Username or email  are required");
  }

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  // 3. Ensure you use await here
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  // 4. check if user exists or not

  if (!user) {
    throw new ApiError(400, "User does not exists , user not registered");
  }

  // 5. if already registered then validate username or email and password.
  // validate password

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid user credentials");
  }

  // Generate tokens , access token and refresh token

  // Generate tokens //  access and refresh token
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // send cookie

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

// Handler to logout the user

const logoutUser = asyncHandler( async (req , res) => {
  // clear the refresh token in the database
  await User.findByIdAndUpdate(
    req.user._id,
     {
      $set: { refreshToken: undefined }, 
    }, 
    {
      new: true
    }
  );

    const options = {
      httpOnly: true,
      secure: true,
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
})

// Handler to refresh Access token using the refresh token 

const refreshAccessToken = asyncHandler(async (req, res) => {
  // get the refresh token from cokkies or body
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if(!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized access");
  }

  try {
    const decodedToken = JsonWebTokenError.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if(!user) {
      throw new ApiError(401, "Invalid refresh token");  //user not found
    }

    if(incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used"); // refresh token not matched
    }

    // cokkies options

    const options = {
      httpOnly: true,
      secure: true,
    }

    // generate new access token and refresh token
    const { accessToken, newrefreshToken } =
      await generateAccessAndRefreshToken(user._id);  // generate new access and refresh token
    
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newrefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, newrefreshToken },
          "Access token refreshed successfully"
        )
      );

  } catch (error) {
      throw new ApiError(402, error?.message || "Invalid refresh token");
  }

});

export { registerUser, loginUser, logoutUser, refreshAccessToken };