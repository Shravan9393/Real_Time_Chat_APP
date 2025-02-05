import { Chat } from "../models/chat.models.js";
import { ApiError } from "../utils/ApiError.js";;
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler}  from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

// Hndler to add the Searched user to the chat dashboard

// Handler to add the searched user to the chat dashboard
const addSearchedUserToChat = asyncHandler(async (req, res) => {
    const { userId } = req.body; // The ID of the user to add
    const currentUserId = req.user._id; // Current logged-in user's ID

    if (!userId) {
        throw new ApiError(400, "User ID is required to add a user to the chat dashboard");
    }

    try {
        // Check if a chat already exists between the users
        let existingChat = await Chat.findOne({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: userId } } },
                { users: { $elemMatch: { $eq: currentUserId } } }
            ],
        })
            .populate("users", "-password")
            .populate("newMessage");

        // Populate sender details in the latest message
        existingChat = await User.populate(existingChat, {
            path: "newMessage.sender",
            select: "username email fullName avatar",
        });

        if (existingChat) {
            return res.status(200).json(
                new ApiResponse(200, { chat: existingChat }, "Chat already exists")
            );
        }

        // If no chat exists, create a new one
        const newChat = await Chat.create({
            // chatName: "user.fullName",
            users: [userId, currentUserId],
            isGroupChat: false,
        });

        const populatedChat = await Chat.findById(newChat._id).populate("users", "-password");

        return res.status(201).json(
            new ApiResponse(201, { chat: populatedChat }, "Chat created successfully")
        );
    } catch (error) {
        throw new ApiError(500, "Failed to add the user to the chat dashboard");
    }
});

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
            {users: { $elemMatch: { $eq: req.user._id }}},
        ],
    })
    .populate("users", "-password")
    .populate("newMessage");

    chatExists = await User.populate(chatExists, {
      path: "newMessage.sender",
      select: "username email fullName  avatar",
    });
    let newChatData;
    if(chatExists.length > 0){
        return res
        .status(200)
        .json(
            new ApiResponse(200, { chat: chatExists[0] }, "Chat exists")
        );
    }else{
        newChatData = {
        //   chatName: "sender",
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
            console.log("Fetched chat history from DB:", finalChat);
            return res.status(200).json(
              new ApiResponse(200, { chats: finalChat }, "Chat history fetched successfully")
            );

    
    } catch (error) {
        throw new ApiError(500,error, "Failed to fetch chat history");
        console.log(error);
    }
});

// create group.
const createGroup = asyncHandler( async (req, res) => {
        const { chatName, users } = req.body;
        if(!chatName || !users){
            throw new ApiError(401, "chatName and users are required to create a group");   
        }

        const parsedUsers = JSON.parse(users);
        if(parsedUsers.length < 2){
            throw new ApiError(401, "Group must have atleast 2 users");
        }

        parsedUsers.push(req.user._id);

        try {
            const chat = await Chat.create({
                chatName : chatName,
                users: parsedUsers,
                isGroupChat: true,  
                groupAdmin: req.user._id,
            });

            const finalChat = await Chat.findById(chat?._id)
              .populate("users", "-password")
              .populate("groupAdmin", "-password");
            
            return res
            .status(201)
            .json(
                new ApiResponse(201, { chat: finalChat }, "Group created successfully")
            );
        } catch (error) {
            throw new ApiError(500, error, "Failed to create group");
        }

});

// add user or new member to the group

const addGroupMember = asyncHandler( async (req, res) => {
    const {userId, chatId} = req.body;

    if(!userId || !chatId){
        throw new ApiError(401, "userId and chatId are required to add a memebr to the group");
    }

    const existingChat = await Chat.findById(chatId);
    if (!existingChat.users.includes(userId)) {
      const chat = await Chat.findByIdAndUpdate(chatId, {
        $push: { users: userId },
      })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      if (!chat) {
        throw new ApiError(500, "Failed to add user to the group");
      }

      return res
        .status(200)
        .json(
          new ApiResponse(200, { chat }, "User added to the group successfully")
        );
    } else {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { chat: existing },
            "User already exists in the group"
          )
        );
    }
});

// remove user from the group

const removegroupMember = asyncHandler( async (req, res) => {
    const { userId, chatId } = req.body;

    if(!userId || !chatId){
        throw new ApiError(401, "UserId and chatId are required to remove a member from the group");
    }

    const existingChat = await Chat.findById(chatId);
    if(existingChat.users.includes(userId)){
        try {
            const chat = await Chat.findByIdAndUpdate(chatId, {
                $pull: { users: userId },
            })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

            return res
            .status(200)
            .json(
                new ApiResponse(200, { chat }, "User removed from the group successfully")
            );
        } catch (error) {
            throw new ApiError(500,  "Failed to remove user from the group");
        }
    }else{
        return res
        .status(400)
        .json(
            new ApiResponse(200, { chat: existingChat}, "User does not exist in the group")
        )
    }
});


export {
    addSearchedUserToChat,
    getChatAccess,
    getChatHistory,
    createGroup,
    addGroupMember,
    removegroupMember,
 };