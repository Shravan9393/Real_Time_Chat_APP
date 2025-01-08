import React, { useContext } from "react";
import { ChatContext } from "../../context/chatContext";
import MessageInput from "./messageInput";
import "./chatWindow.css";

const ChatWindow = () => {
  const { messages } = useContext(ChatContext);

  if (!messages) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "You" ? "sent" : "received"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatWindow;
