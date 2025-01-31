import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [user, setUser] = useState(null); // Set to null instead of undefined
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      try {
        const parsedUserInfo = JSON.parse(userInfo);
        setUser(parsedUserInfo); // Set user info if it exists
      } catch (error) {
        console.error("Failed to parse user info from localStorage:", error);
      }
    }
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;





// // final code 


// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const ChatContext = createContext();

// const ChatProvider = ({ children }) => {
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [user, setUser] = useState(null);
//   const [notification, setNotification] = useState([]);
//   const [chats, setChats] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const userInfo = localStorage.getItem("userInfo");
//     if (userInfo) {
//       setUser(JSON.parse(userInfo));
//     } else {
//       navigate("/login");
//     }
//   }, [navigate]);

//   return (
//     <ChatContext.Provider
//       value={{
//         selectedChat,
//         setSelectedChat,
//         user,
//         setUser,
//         notification,
//         setNotification,
//         chats,
//         setChats,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };

// export const useChatContext = () => useContext(ChatContext);

// export default ChatProvider;
