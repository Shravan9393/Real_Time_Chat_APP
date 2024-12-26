import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import path from "path";


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

})

export { registerUser };