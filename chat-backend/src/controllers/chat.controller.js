import Message from "../models/chat.models.js";
import { ApiError } from "../utils/ApiError.js";;
import { ApiResponse } from "../utils/ApiResponse.js";
import  { asyncHandler } from "../utils/ApiResponse.js";


export const getChatHistory = asyncHandler ( async (requestAnimationFrame, res) => {
    try {
        const { userId } = req.params;
        const currentUderId = req.user;

        const messages = await CharacterData.find({
    
        })
        
    } catch (error) {
        throw new ApiError(500, "Failed to fetch chat history");


    }
})