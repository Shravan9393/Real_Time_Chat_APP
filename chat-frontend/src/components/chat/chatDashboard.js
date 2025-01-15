import React, { useState, useEffect } from "react";
import ChatWindow from "./chatWindow";
import "./chatDashboard.css";
import axios from "axios";

const ChatDashboard = () => {
  const [users, setUsers] = useState([]); // Existing chat users
  const [searchQuery, setSearchQuery] = useState(""); // Input for search bar
  const [searchResults, setSearchResults] = useState([]); // Search results for new users
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch existing users (current chats) on mount
  useEffect(() => {
    // Fetch existing chat users (ensure the token is added in headers)
    const accessToken = localStorage.getItem("accessToken"); // Get token from localStorage

    if (!accessToken) {
      console.error("Token is missing from localStorage.");
      return;
    }
    console.log("Sending token:", accessToken); // Log the token before sending it in the header

    axios
      .get("http://localhost:5000/api/v1/chat/getChatHistory", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setUsers(response.data); // Assuming response.data is the array of users
      })
      .catch((err) => {
        console.error("Failed to fetch chat history", err);
      });
  }, []);

  // Search for new users
   const handleSearch = async () => {
     if (!searchQuery) return;

     try {
       const response = await axios.get(
         `http://localhost:5000/api/v1/users/search?query=${searchQuery}`,
         {
           headers: {
             Authorization: `Bearer ${localStorage.getItem("token")}`,
           },
         }
       );
       setSearchResults(response.data);
     } catch (error) {
       console.error("Error searching for users:", error);
     }
   };

    const handleKeyPress = (event) => {
       if (event.key === "Enter") {
         handleSearch();
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
          <button onClick={handleSearch}>Search</button> {/* Optional search button */}
          <ul className="chat-list">
            {users.map((user) => (
              <li
                key={user._id} // Updated to match backend response
                className={`chat-item ${
                  selectedUser?._id === user._id ? "active" : ""
                }`}
                onClick={() => selectUser(user)}
              >
                {user.username}
              </li>
            ))}
          </ul>
          {searchResults.length > 0 && (
            <div className="search-results">
              <h3>Search Results</h3>
              <ul>
                {searchResults.map((user) => (
                  <li
                    key={user._id} // Updated to match backend response
                    className="search-result-item"
                    onClick={() => selectUser(user)}
                  >
                    {user.username}
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
