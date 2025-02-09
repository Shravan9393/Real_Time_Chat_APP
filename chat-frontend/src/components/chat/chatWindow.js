

import React from "react";
import SingleChat from "./singleChat";
import { ChatState } from "../../context/chatContext";
import "../styles/chatWindow.css"; // Import the separate CSS file

const ChatWindow = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <div className={`chat-window ${selectedChat ? "active" : ""}`}>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default ChatWindow;