import { Message } from "../models/message.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Chat } from "../models/chat.models.js";
import { User } from "../models/user.models.js";
import { model } from "mongoose";

// send message

const sendMessage = asyncHandler( async (req, res) => {
    const {chatId , message} = req.body;
    if(!chatId || !message){
        throw new ApiError(401, "chatId and message are required to send a message");
    }

    try {
        let message = await Message.create({
            sender : req.user._id,
            message,
            chatId,
        });

        message = await (
          await Message.populate(
            "sender",
            "fullName avatar username",
            "-password"
          )
        ).populate({
          path: "chatId",
          select: "chatName isGroupChat users",
          model : Chat,
          populate: {
            path: "users",
            select: "fullName username email avatar",
            model: User,
          }
        });

        await Chat.findByIdAndUpdate(chatId, {
            newMessage: message,
        })

        return res
        .status(201)
        .json(
            new ApiResponse(201, { message }, "Message sent successfully")
        );
    } catch (error) {
        throw new ApiError(500, error, "Failed to send message");
    }
});


// handler to get messages

const getMessages = asyncHandler( async (req, res) => {
    const { chatId } = req.params;
    if(!chatId){
        throw new ApiError(401, "chatId is required to get messages");
    }

try {
        let messages = await Message.find({ chatId })
        .populate({
            path: "sender",
            select: "fullName username email avatar",
            model: User,
        })
        .populate({
            path: "chatId",
            select: "chatName isGroupChat users",
            model: Chat,
        });
        return res
        .status(200)
        .json(
            new ApiResponse(200, { messages }, "Messages fetched successfully")
        );
    
} catch (error) {
    throw new ApiError(500, error, "Failed to get messages");
}    

});

export { sendMessage, getMessages };
