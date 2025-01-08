import React, { useState, useEffect } from "react";
import ChatWindow from "./chatWindow";
import "./chatDashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChatDashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.error("Failed to fetch users", err);
      });
  }, []);

  const handleViewProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="chat-dashboard">
      <header className="dashboard-header">
        <h1>Chat App</h1>
        <div className="nav-buttons">
          <button onClick={handleViewProfile}>View Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <div className="dashboard-body">
        <div className="sidebar">
          <h2>Chats</h2>
          <ul className="chat-list">
            {users.map((user) => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        </div>
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatDashboard;
