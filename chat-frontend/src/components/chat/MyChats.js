
import { useEffect, useState } from "react";
import { ChatState } from "../../context/chatContext";
import ChatLoading from "./chatLoading";
import { getSender } from "./chatLogic";
import axiosInstance from "../../utils/api";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  console.table("the logged user is", loggedUser, "the type of logged user is", typeof loggedUser);  // giving the undefined value for both the data and type

  const { selectedChat, setSelectedChat, chats, setChats, user } = ChatState();

  
  console.table(
    "the selected chat is", selectedChat,  //giving the null value
    "the type of selected chat is", typeof selectedChat,  // type of selected chat is object
    "the chats is", chats,  // somethis coming as array with length 0
    "the type of chats is", typeof chats, // object
    "the user is", user,  // logined user showing
    "the type of user is", typeof user  // object
  );

  // Fetch Chat History

  const fetchChats = async () => {
    console.log("this is user id from mychats whose chat history are fetched", user._id);
    try {
      const { data } = await axiosInstance.get("/chat/getChatHistory");

      console.log("✅ this is type of data , of chathistory , in mychat.js ",typeof data);
      console.log("Fetched chats:", data); // Debugging log: Check what the API returns

      console.log("this is chat data from mychat.js which is setChats", data.data.chat);
      setChats(data.data.chat || []);

      // console.log("API response in my chat.js file:", data);

      // if (Array.isArray(data.data.chats)) {
      //   setChats(data.data.chats);
      // } else {
      //   console.error(
      //     "Error: Expected chats to be an array but got:",
      //     typeof data.data.chats
      //   );
      //   setChats([]);
      // }

    } catch (error) {
      alert("❌Error Occurred: Failed to load the chats");
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("this is user info from mychats", userInfo);
    setLoggedUser(userInfo);
    
    if (userInfo) {
      fetchChats();
    }
    // eslint-disable-next-line
  }, [fetchAgain]);

  // // Make sure loggedUser and chat are available before calling getSender
  // chats.forEach((chat, index) => {
  //   console.log(`Chat ${index}:`, chat);
  //   console.log(`Type of Chat ${index}:`, typeof chat);
  // });

  const renderSender = (chat) => {
    if (loggedUser && chat) {
      return !chat.isGroupChat ? getSender(loggedUser, chat) : chat.chatName;
    } else {
      return "Loading..."; // Handle loading or missing data
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
        {chats ? (
          <div style={{ overflowY: "scroll" }}>
            {chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedChat === chat ? "#38B2AC" : "#E8E8E8",
                  color: selectedChat === chat ? "white" : "black",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "8px",
                }}
              >
                {/* <div>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat)
                    : chat.chatName}
                </div> */}

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

