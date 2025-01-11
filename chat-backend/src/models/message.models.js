import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        sender : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
        },
        message : {
            type : String,
            trim : true,
        },

        chatId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Chat",
        },
    },{timestamps:true});

export const Message = mongoose.model("Message", messageSchema);