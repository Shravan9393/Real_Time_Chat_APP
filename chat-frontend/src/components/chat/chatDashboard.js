import React from "react";
import ChatWindow from "./chatWindow";
import "./chatDashboard.css";
import LogoutButton from "../auth/LogoutButton";

const ChatDashboard = () => {
  return (
    <div className="chat-dashboard">
      <header className="dashboard-header">
        <h1>Chat App</h1>
        <LogoutButton />
      </header>
      <div className="dashboard-body">
        <div className="sidebar">
          <h2>Chats</h2>
          <ul className="chat-list">
            {/* Dynamic list of chat users */}
            <li>John Doe</li>
            <li>Jane Smith</li>
            <li>React Dev</li>
          </ul>
        </div>
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatDashboard;
