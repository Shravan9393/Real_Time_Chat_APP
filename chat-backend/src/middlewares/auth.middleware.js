
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import JWT from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  console.log("Token received in auth.middleware.js file :", token);

  if (!token) {
    throw new ApiError(401, "Unauthorized request: Token is missing in auth.middleware.js file"); 
  }

  try {
    const decodedToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid Access Token: User not found");
    }

    req.user = user; // Attach user to the request object
    next();
  } catch (error) {
    console.error("Token verification error in auth.middleware.js file:", error.message);
    if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid Access Token");
    } else if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Access Token expired");
    } else {
      throw new ApiError(401, error.message || "Unauthorized request");
    }
  }
});
