import React, { useState, useEffect } from "react";
import ChatWindow from "./chatWindow";
import "./chatDashboard.css";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChatDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  // const navigate = useNavigate();

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

  const selectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="chat-dashboard">
      <div className="dashboard-body">
        <div className="sidebar">
          <h2>Chats</h2>
          <ul className="chat-list">
            {users.map((user) => (
              <li
                key={user.id}
                className={`chat-item ${
                  selectedUser?.id === user.id ? "active" : ""
                }`}
                onClick={() => selectUser(user)}
              >
                {user.username}
              </li>
            ))}
          </ul>
        </div>
        <div className="chat-window-container">
          {selectedUser ? (
            <ChatWindow user={selectedUser} />
          ) : (
            <div className="no-chat-selected">
              Select a chat to start messaging.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;
