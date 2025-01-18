import React, { useState, useEffect } from "react";
import ChatWindow from "./chatWindow";
import "./chatDashboard.css";
import axios from "axios";

const ChatDashboard = () => {
  const [users, setUsers] = useState([]); // Existing chat users
  const [searchQuery, setSearchQuery] = useState(""); // Input for search bar
  const [searchResults, setSearchResults] = useState([]); // Search results for new users
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);

  // Fetch existing users (current chats) on mount
  useEffect(() => {
    const fetchChatUsers = async () => {
      const accessToken = localStorage.getItem("accessToken"); // Get token from localStorage
      if (!accessToken) {
        console.error("Token is missing from localStorage.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/chat/getChatHistory",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
          setUsers([]); // Fallback to an empty array
        }
      } catch (err) {
        console.error("Failed to fetch chat history", err);
        setUsers([]); // Fallback to an empty array on error
      }
    };

    fetchChatUsers();
  }, []);

  // Search for new users
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Search query cannot be empty");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setError("No access token found. Please log in again.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/users/searchUser?search=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSearchResults(response.data || []);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Error searching for users");
      console.error(
        "Error searching for users:",
        error.response || error.message
      );
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Add a searched user to the chat dashboard
  const addUserToChats = async (user) => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      await axios.post(
        "http://localhost:5000/api/v1/chat/addSearchedUserToChat",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setUsers((prevUsers) => [...prevUsers, user]); // Update local state
      setSearchResults((prevResults) =>
        prevResults.filter((result) => result._id !== user._id)
      ); // Remove from search results
    } catch (error) {
      console.error(
        "Error adding user to chats:",
        error.response || error.message
      );
    }
  };

  // Select a user from either existing chats or search results
  const selectUser = (user) => {
    setSelectedUser(user);
    setSearchQuery(""); // Clear search when a user is selected
    setSearchResults([]); // Clear search results
  };

  return (
    <div className="chat-dashboard">
      <div className="dashboard-body">
        <div className="sidebar">
          <h2>Chats</h2>
          <input
            type="text"
            placeholder="Search for new users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress} // Handles Enter key press
            className="search-bar"
          />
          <button onClick={handleSearch}>Search</button>
          <ul className="chat-list">
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
                <li
                  key={user._id}
                  className={`chat-item ${
                    selectedUser?._id === user._id ? "active" : ""
                  }`}
                  onClick={() => selectUser(user)}
                >
                  {user.fullName || user.username}
                </li>
              ))
            ) : (
              <li>No chats available</li>
            )}
          </ul>
          {searchResults.length > 0 && (
            <div className="search-results">
              <h3>Search Results</h3>
              <ul>
                {searchResults.map((user) => (
                  <li key={user._id} className="search-result-item">
                    {user.username}
                    <button onClick={() => addUserToChats(user)}>Add</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
