import { useEffect } from "react";
import { ChatState } from "../../context/chatContext";
import ChatLoading from "./chatLoading";
import { getSender } from "./chatLogic";
import axiosInstance from "../../utils/api";
import "../styles/myChats.css"; // Import the separate CSS file

const MyChats = ({ fetchAgain }) => {
  // Use the context’s user instead of a separate loggedUser state.
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
      console.log("Fetched chats:", data);

      if (data.data.chats && data.data.chats.length > 0) {
        setChats(data.data.chats);
      } else {
        console.warn("⚠️ No chats received from server!");
        setChats([]);
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
  // Use the "user" from context.
  const renderSender = (chat) => {
    console.log("Rendering chat:", chat);
    if (user && chat) {
      return !chat.isGroupChat ? getSender(user, chat) : chat.chatName;
    } else {
      return "Loading...";
    }
  };

  return (
    <div className="mychats-container" style={{ display: selectedChat ? "none" : "flex" }}>
      <div className="mychats-header">My Chats</div>
      <div className="mychats-list-container">
        {chats && chats.length > 0 ? (
          <div className="mychats-scroll-container">
            {chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                className={`chat-item ${
                  selectedChat && selectedChat._id === chat._id ? "selected" : ""
                }`}
              >
                <div>{renderSender(chat)}</div>
                {chat.latestMessage && (
                  <div className="chat-latest-message">
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





