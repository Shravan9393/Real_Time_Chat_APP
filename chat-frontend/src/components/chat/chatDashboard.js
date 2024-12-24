import React from "react";
import ChatWindow from "./chatWindow";
import "./chatDashboard.css";

const ChatDashboard = () => {
  return (
    <div className="chat-dashboard">
      <div className="sidebar">
        <h2>Chats</h2>
        <ul className="chat-list">
          <li>John Doe</li>
          <li>Jane Smith</li>
          <li>React Dev</li>
        </ul>
      </div>
      <ChatWindow />
    </div>
  );
};

export default ChatDashboard;
