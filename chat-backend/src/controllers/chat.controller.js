import { Message } from "../models/chat.models.js";
import { ApiError } from "../utils/ApiError.js";;
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler}  from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

const getChatHistory = asyncHandler ( async (req, res) => {
    try {
        // get the userId and currentUserId form pramas and user
        const { userId } = req.params;
        const { currentUserId } = req.user;

        // validate users

        const sender = await User.findById(currentUserId).select("username avatar");
        const receiver = await User.findById(userId).select("username avatar");

        if(!sender || !receiver){
            throw new ApiError(404, "User not found")
        }

        // fetch chat history
        const messages = await Message.find({
            $or:[
                {
                    sender : currentUserId,
                    receiver: userId
                },
                {
                    sender: userId,
                    receiver: currentUserId
                }
            ],
        }).sort({timestamp: 1});

        return res
        .status(200)
        .json(
            new ApiResponse(200, { messages }, "message send and recevied successfully")
        );

    } catch (error) {
        throw new ApiError(500, "Failed to fetch chat history");
    }

});

const saveMessage = async(req, res) => {
    try {
        const { sender, receiver, message } = req.body;


        if(!sender || !receiver || !message){
            throw new ApiError(401, "sender , receiver and message are required for the req.body to save the message")
        }

        // validate sender and receiver

        const senderUser = await User.findById(sender);
        const receiverUser = await User.findById(receiver);

        // check we have got or not

        if(!senderUser || !receiverUser){
            throw new ApiError(401, "Invalid sender or receiver")
        }

        // save the message

        const newMessage = new Message({
          sender,
          receiver,
          message,
        });
        const savedMessage = await newMessage.save();

        return res
        .status(201)
        .json({
            success: true,
            message: savedMessage
        });

    } catch (error) {
        throw new ApiError(400, {error}, "failed to save message")
    }
}

export { getChatHistory, saveMessage };