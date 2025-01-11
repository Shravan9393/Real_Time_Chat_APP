import { Chat } from "../models/chat.models.js";
import { ApiError } from "../utils/ApiError.js";;
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler}  from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

// acess the chat 

const getChatAccess = asyncHandler( async (req, res) => {
    // get the userId from the req.params
    const { userId } = req.params;

    if(!userId){
        throw new ApiError(401, "userId is required to get chat access");
    }
    // let there some chat Exist
    let chatExists = await Chat.find({
        isGroupChat: false,
        $and:[
            {users: { $elemMatch: { $eq: userId }}},
            {users: { $elemMatch: { $eq: req.User._id }}},
        ],
    })
    .populate("users", "-password")
    .populate("newMessage");

    chatExists = await User.populate(chatExists, {
      path: "newMessage.sender",
      select: "username email fullName  avatar",
    });

    if(chatExists.length > 0){
        return res
        .status(200)
        .json(
            new ApiResponse(200, { chat: chatExists[0] }, "Chat exists")
        );
    }else{
        let newChatData = {
          chatName: "sender",
          users: [userId, req.user._id],
          isGroupChat : false,
        };
    }

    try {
        const newMessage = await Chat.create(newChatData);
        const chat = await Chat.findById(newMessage?._id).populate("users", "-password")
        return res
        .status(201)
        .json(
            new ApiResponse(201, { chat }, "Chat created successfully") 
        );
    } catch (error) {
        throw new ApiError(500,error ,"Failed to create chat , or getting the chat data");
    }

});

// get chat history and all chat

const getChatHistory = asyncHandler ( async (req, res) => {
    try {
            const chat = await Chat.find({
                users: { $elemMatch: { $eq: req?.user?._id }},
            })
            .populate("users", "-password")
            .populate("newMessage")
            .populate("groupAdmin")
            .sort({updatedAt: -1});
    
            const finalChat = await User.populate(chat, {
                path: "newMessage.sender",
                select: "username email fullName avatar",
            });
            return res
            .status(200)
            .json(
                new ApiResponse(200, { chat: finalChat }, "Chat history fetched successfully")
            );
    
    } catch (error) {
        throw new ApiError(500,error, "Failed to fetch chat history");
        console.log(error);
    }
});

// create group.

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