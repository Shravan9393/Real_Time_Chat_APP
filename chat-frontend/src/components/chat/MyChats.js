import { useEffect } from "react";
import { ChatState } from "../../context/chatContext";
import ChatLoading from "./chatLoading";
import { getSender } from "./chatLogic";
import axiosInstance from "../../utils/api";

const MyChats = ({ fetchAgain }) => {
  // Remove local loggedUser state; use the context "user" instead.
  const { selectedChat, setSelectedChat, chats, setChats, user } = ChatState();

  // Fetch Chat History
  const fetchChats = async () => {
    if (!user) return;
    console.log("Fetching chats for user:", user._id);
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      };
      const { data } = await axiosInstance.get("/chat/getChatHistory", config);

      console.log("Fetched chats:", data); // Debug: Check API response

      // Make sure you set the chats from the proper property.
      if (data.data.chats && data.data.chats.length > 0) {
        setChats(data.data.chats);
      } else {
        console.warn("⚠️ No chats received from server!");
        setChats([]); // Set empty array if none are received
      }
    } catch (error) {
      alert("❌ Error Occurred: Failed to load the chats");
      console.error("Fetch chats error:", error);
    }
  };

  // Re-fetch chats when "fetchAgain" or "user" changes
  useEffect(() => {
    if (user) {
      fetchChats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAgain, user]);

  // Render the sender's name using the helper.
  // Use the "user" from context instead of a separate "loggedUser".
  const renderSender = (chat) => {
    console.log("Rendering chat:", chat); // Debugging log
    if (user && chat) {
      return !chat.isGroupChat ? getSender(user, chat) : chat.chatName;
    } else {
      return "Loading..."; // This should not remain if user and chat are defined.
    }
  };

  return (
    <div
      style={{
        display: selectedChat ? "none" : "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
        backgroundColor: "white",
        width: "100%",
        maxWidth: "31%",
        borderRadius: "8px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          paddingBottom: "12px",
          paddingInline: "12px",
          fontSize: "28px",
          fontFamily: "Arial, sans-serif",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        My Chats
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "12px",
          backgroundColor: "#F8F8F8",
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          overflowY: "hidden",
        }}
      >
        {chats && chats.length > 0 ? (
          <div style={{ overflowY: "scroll", maxHeight: "100%" }}>
            {chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedChat && selectedChat._id === chat._id
                      ? "#38B2AC"
                      : "#E8E8E8",
                  color:
                    selectedChat && selectedChat._id === chat._id
                      ? "white"
                      : "black",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "8px",
                }}
              >
                <div>{renderSender(chat)}</div>
                {chat.latestMessage && (
                  <div style={{ fontSize: "12px" }}>
                    <b>{chat.latestMessage.sender.name}:</b>{" "}
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <ChatLoading />
        )}
      </div>
    </div>
  );
};

export default MyChats;
