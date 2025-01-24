// import React, { useEffect, useState } from "react";
// import { getSender, getSenderFull } from "./chatLogic";
// import axios from "axios";
// import ScrollChat from "./scrollChat";
// import io from "socket.io-client";
// import { ChatState } from "../../context/chatContext";
// import "../styles/SingleChat.css";

// const ENDPOINT = "http://localhost:5000"; // Replace with your backend endpoint
// let socket, selectedChatCompare;

// const SingleChat = ({ fetchAgain, setFetchAgain }) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [newMessage, setNewMessage] = useState("");
//   const [socketConnected, setSocketConnected] = useState(false);
//   const [typing, setTyping] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);

//   const { selectedChat, setSelectedChat, user, notification, setNotification } =
//     ChatState();

//   const fetchMessages = async () => {
//     if (!selectedChat) return;

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.accessToken}`,
//         },
//       };

//       setLoading(true);
//       const { data } = await axios.get(
//         `/v1/message/getMessages/${selectedChat._id}`,
//         config
//       );
//       setMessages(data);
//       setLoading(false);
//       socket.emit("join chat", selectedChat._id);
//     } catch (error) {
//       alert("Failed to load messages.");
//     }
//   };

//   const sendMessage = async (event) => {
//     if (event.key === "Enter" && newMessage) {
//       socket.emit("stop typing", selectedChat._id);
//       try {
//         const config = {
//           headers: {
//             "Content-type": "application/json",
//             Authorization: `Bearer ${user.accessToken}`,
//           },
//         };
//         setNewMessage("");
//         const { data } = await axios.post(
//           "/v1/message/sendMessage",
//           {
//             content: newMessage,
//             chatId: selectedChat,
//           },
//           config
//         );
//         socket.emit("new message", data);
//         setMessages([...messages, data]);
//       } catch (error) {
//         alert("Failed to send message.");
//       }
//     }
//   };

//   const typingHandler = (e) => {
//     setNewMessage(e.target.value);

//     if (!socketConnected) return;

//     if (!typing) {
//       setTyping(true);
//       socket.emit("typing", selectedChat._id);
//     }
//     const lastTypingTime = new Date().getTime();
//     const timerLength = 3000;
//     setTimeout(() => {
//       const timeNow = new Date().getTime();
//       if (timeNow - lastTypingTime >= timerLength && typing) {
//         socket.emit("stop typing", selectedChat._id);
//         setTyping(false);
//       }
//     }, timerLength);
//   };

//   useEffect(() => {
//     socket = io(ENDPOINT);
//     socket.emit("setup", user);
//     socket.on("connected", () => setSocketConnected(true));
//     socket.on("typing", () => setIsTyping(true));
//     socket.on("stop typing", () => setIsTyping(false));
//   }, [user]);

//   useEffect(() => {
//     fetchMessages();
//     selectedChatCompare = selectedChat;
//   }, [selectedChat]);

//   useEffect(() => {
//     socket.on("message received", (newMessageReceived) => {
//       if (
//         !selectedChatCompare ||
//         selectedChatCompare._id !== newMessageReceived.chat._id
//       ) {
//         if (!notification.includes(newMessageReceived)) {
//           setNotification([newMessageReceived, ...notification]);
//           setFetchAgain(!fetchAgain);
//         }
//       } else {
//         setMessages([...messages, newMessageReceived]);
//       }
//     });
//   }, [
//     messages,
//     notification,
//     selectedChatCompare,
//     fetchAgain,
//     setFetchAgain,
//     setNotification,
//   ]);

//   return (
//     <div className="single-chat-container">
//       {selectedChat ? (
//         <>
//           <div className="chat-header">
//             <button className="back-button" onClick={() => setSelectedChat("")}>
//               &#8592;
//             </button>
//             {messages &&
//               (!selectedChat.isGroupChat ? (
//                 <>
//                   <span>{getSender(user, selectedChat.users)}</span>
//                   {/* Profile page link or modal */}
//                 </>
//               ) : (
//                 <span>{selectedChat.chatName.toUpperCase()}</span>
//               ))}
//           </div>
//           <div className="chat-box">
//             {loading ? (
//               <div className="spinner">Loading...</div>
//             ) : (
//               <div className="messages">
//                 <ScrollChat messages={messages} />
//               </div>
//             )}
//             {isTyping && <div className="typing-indicator">Typing...</div>}
//             <input
//               type="text"
//               className="message-input"
//               placeholder="Enter a message..."
//               value={newMessage}
//               onChange={typingHandler}
//               onKeyDown={sendMessage}
//             />
//           </div>
//         </>
//       ) : (
//         <div className="no-chat-selected">
//           Click on a user to start chatting.
//         </div>
//       )}
//     </div>
//   );
// };

// export default SingleChat;





import React, { useEffect, useState } from "react";
import { getSender } from "./chatLogic";
import axios from "axios";
import ScrollChat from "./scrollChat";
import io from "socket.io-client";
import { ChatState } from "../../context/chatContext";

const ENDPOINT = "http://localhost:5000"; // Replace with your backend endpoint
let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };

      setLoading(true);
      const { data } = await axios.get(
        `/v1/message/getMessages/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      alert("Failed to load messages.");
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/v1/message/sendMessage",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        alert("Failed to send message.");
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      if (timeNow - lastTypingTime >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, [user]);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  }, [
    messages,
    notification,
    selectedChatCompare,
    fetchAgain,
    setFetchAgain,
    setNotification,
  ]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "16px",
        boxSizing: "border-box",
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      {selectedChat ? (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 16px",
              backgroundColor: "#ddd",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          >
            <button
              style={{
                background: "none",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
              }}
              onClick={() => setSelectedChat("")}
            >
              &#8592;
            </button>
            <span style={{ fontWeight: "bold" }}>
              {selectedChat.isGroupChat
                ? selectedChat.chatName.toUpperCase()
                : getSender(user, selectedChat.users)}
            </span>
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "8px",
                marginBottom: "8px",
              }}
            >
              {loading ? (
                <div style={{ textAlign: "center" }}>Loading...</div>
              ) : (
                <ScrollChat messages={messages} />
              )}
            </div>
            {isTyping && (
              <div style={{ marginBottom: "8px", fontStyle: "italic" }}>
                Typing...
              </div>
            )}
            <input
              type="text"
              placeholder="Enter a message..."
              value={newMessage}
              onChange={typingHandler}
              onKeyDown={sendMessage}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxSizing: "border-box",
              }}
            />
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          Click on a user to start chatting.
        </div>
      )}
    </div>
  );
};

export default SingleChat;



