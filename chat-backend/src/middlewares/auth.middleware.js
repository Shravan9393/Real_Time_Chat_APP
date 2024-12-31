import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import JWT from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      console.log("Token not provided");
      throw new ApiError(401, "Unauthorized request");
    }

    console.log("Token received:", token);

    const decodedToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);

    console.log("Decoded Token:", decodedToken);

const user = await User.findById(decodedToken?._id).select(
  " -password -refreshToken"
);

    if (!user) {
      console.log("User not found for token:", decodedToken?._id);
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

