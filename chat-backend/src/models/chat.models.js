import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    photo: {
      type: String,
      default: "https://www.w3schools.com/howto/img_avatar.png",
    },

    chatName: {
      type: String,
    },

    isGroupChat: {
      type: Boolean,
      default: false,
    },

    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    newMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },

    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);


export const Chat = mongoose.model("Chat", chatSchema);
