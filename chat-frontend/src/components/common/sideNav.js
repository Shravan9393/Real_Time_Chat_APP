import React, { useState } from "react";
import { ChatState } from "../../context/chatContext";
import ChatLoading from "../chat/chatLoading";
import axiosInstance from "../../utils/api";
import "../styles/SideNav.css";

function SideNav() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { setSelectedChat, user, chats, setChats } = ChatState();

  // Handler to search for users by name or email.
  const handleSearch = async () => {
    if (!search) {
      alert("❌ Please enter a username to search.");
      return;
    }
    try {
      setLoading(true);
      console.log("🔍 Searching user:", search);
      const config = {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      };
      const { data } = await axiosInstance.get(
        `/users/searchUser?search=${search}`,
        config
      );
      console.log("✅ Search response Data from SideNav.js:", data);
      if (data.success && Array.isArray(data.data)) {
        setSearchResult(data.data);
        alert("✅ User search successful!");
      } else {
        alert("❌ Unexpected API response format.");
      }
      setLoading(false);
    } catch (error) {
      console.error("❌ Search user error in SideNav.js:", error);
      alert("❌ Failed to load search results.");
      setLoading(false);
    }
  };

  // Handler to add a searched user to the chat list.
  const addUserToChats = async (selectedUser) => {
    try {
      setLoadingChat(true);
      console.log("➕ Adding user to chats:", selectedUser);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      };
      console.log("Current user ID:", user._id);
      console.log("Selected user ID:", selectedUser._id);
      // First, add or fetch the chat using the POST endpoint.
      await axiosInstance.post(
        `/chat/addSearchedUserToChat`,
        { userId: selectedUser._id },
        config
      );
      // Then, verify chat access using the GET endpoint.
      const { data } = await axiosInstance.get(
        `/chat/getChatAccess/${selectedUser._id}`,
        config
      );
      console.log("✅ Chat access response:", data);
      if (!data || !data.data.chat) {
        console.error("❌ Invalid chat object received:", data);
        alert("❌ Failed to add user. Invalid chat data received.");
        setLoadingChat(false);
        return;
      }
      const chat = data.data.chat;
      // If the chat does not already exist in our chat list, add it.
      if (!chats.find((c) => c._id === chat._id)) {
        setChats([chat, ...chats]);
        alert(
          `✅ ${
            selectedUser.fullName || selectedUser.name
          } has been added to My Chats.`
        );
      } else {
        alert(
          `⚠️ ${
            selectedUser.fullName || selectedUser.name
          } is already in My Chats.`
        );
      }
      console.log("✅ Chat object:", chat);
      setSelectedChat(chat);
      setLoadingChat(false);
      setDrawerOpen(false);
    } catch (error) {
      console.error("❌ Add user error:", error);
      alert("❌ Failed to add user to My Chats.");
      setLoadingChat(false);
    }
  };

  return (
    <>
      <div className="sidenav-container">
        <div className="sidenav-header">
          <button
            className="sidenav-search-btn"
            onClick={() => setDrawerOpen(true)}
          >
            <i className="fas fa-search"></i>
            <span>Search User</span>
          </button>
          <h2 className="sidenav-title">Talk-A-Tive</h2>
          <img
            src={user.avatar}
            alt={user.fullName}
            title={user.fullName}
            className="sidenav-avatar"
          />
        </div>
      </div>

      {drawerOpen && (
        <div className="sidenav-drawer">
          <div className="sidenav-drawer-content">
            <div className="sidenav-drawer-header">
              <h3>Search Users</h3>
              <button
                className="sidenav-close-btn"
                onClick={() => setDrawerOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="sidenav-search-input">
              <input
                type="text"
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="sidenav-input"
              />
              <button className="sidenav-go-btn" onClick={handleSearch}>
                Go
              </button>
            </div>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((userItem) => (
                <div key={userItem._id} className="sidenav-user-item">
                  <div className="sidenav-user-info">
                    <p className="sidenav-user-name">
                      {userItem.fullName || userItem.name}
                    </p>
                    <p className="sidenav-user-email">{userItem.email}</p>
                  </div>
                  <button
                    className="sidenav-add-btn"
                    onClick={() => addUserToChats(userItem)}
                  >
                    Add
                  </button>
                </div>
              ))
            )}
            {loadingChat && <div className="sidenav-loading">Loading...</div>}
          </div>
        </div>
      )}
    </>
  );
}

export default SideNav;
