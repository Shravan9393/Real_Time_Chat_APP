import React, { useContext } from "react";
import { ChatContext } from "../../context/chatContext";
import MessageInput from "./messageInput";
import "./chatWindow.css";

const ChatWindow = () => {
  const context = useContext(ChatContext);

  if (!context) {
    return <div>Error: Chat context is not available.</div>;
  }

  const { messages } = context;

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
