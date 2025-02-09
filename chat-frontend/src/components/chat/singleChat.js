import React, { useEffect, useState } from "react";
import { getSender } from "./chatLogic";
import ScrollChat from "./scrollChat";
import io from "socket.io-client";
import { ChatState } from "../../context/chatContext";
import "../styles/SingleChat.css";
import axiosInstance from "../../utils/api";

const ENDPOINT = "http://localhost:5000";

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

  console.table(
    "the selected chat is single chat.js file",
    selectedChat, // coming null just after logined
    "the type of selected chat is",
    typeof selectedChat, //object
    "the user is",
    user, //showing logined user
    "the type of user is",
    typeof user // object
  );

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };

      console.log(
        "Selected Chat ID from single chat.js before setLoading",
        selectedChat._id
      );

      setLoading(true);

      console.log(
        "selected Chat ID from single chat.js after setLoading",
        selectedChat._id
      );

      const { data } = await axiosInstance.get(
        `/message/getMessages/${selectedChat._id}`,
        config
      );

      console.log(
        "this is messages data of that chatId before in singleCHat.js file setMessages data",
        data
      );
      setMessages(data.data.messages);

      console.log(
        "this is messages data of that chatId after setMessages in singleChat.js file data",
        data
      );
      setLoading(false);

      console.log("done the setLoading false in single chat.js file");

      // socket.emit("join chat", selectedChat._id);

      if (selectedChat && selectedChat._id) {
        socket.emit("join chat", selectedChat._id);
      }
    } catch (error) {
      alert("❌ Failed to load messages.");
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      console.table(
        "this is selectedChat._id when sending a message ",
        selectedChat._id,
        "this is newMessage when sending a message ",
        newMessage
      );

      console.log("Doing socket.emit selectedChatid");

      socket.emit("stop typing", selectedChat._id);

      const messageToSend = newMessage; // Store newMessage before clearing

      console.log("this is messageToSend", messageToSend);

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
        };
        // setNewMessage("");

        console.log("checking befor sending the message to api ");
        console.log("the message content is : ", newMessage);
        console.log("the chatId is : ", selectedChat._id);

        const { data } = await axiosInstance.post(
          "/message/sendMessage",
          {
            chatId: selectedChat._id,
            message: newMessage,
          },

          config
        );

        console.table(
          "this is the message data which is going to send , it's printing before emitting the data",
          data,
          " and type of data is ",
          typeof data
        );

        // adding some new code
        // //////////////////////////////////////////

        // Get the actual message object from the API response
        const messageObj = data.data.message;

        // Optionally, if you want to change the property name to "chat", do:
        const messageToEmit = {
          ...messageObj,
          chat: messageObj.chatId, // duplicate the chat info under the property 'chat'
        };

        // //////////////////////////////////////////

        // socket.emit("new message", data);
        // socket.emit("new message", data.data.message);
        socket.emit("new message", messageToEmit);

        // setMessages([...messages, data]);
        // setMessages((prevMessages) => [...prevMessages, data]); // Update messages properly

        // Update the local state with the new message:

        setMessages((prevMessages) => [...prevMessages, messageToEmit]);
        setNewMessage("");
      } catch (error) {
        alert("❌ Failed to send message.");
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

    return () => {
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

 
  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        setNotification((prev) => {
          if (!prev.includes(newMessageReceived)) {
            return [newMessageReceived, ...prev];
          }
          return prev;
        });
        setFetchAgain((prev) => !prev);
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    });
    return () => {
      socket.off("message received");
    };
  }, [notification, fetchAgain]);

  

  return (
    <div className="single-chat-container">
      {selectedChat ? (
        <>
          <div className="chat-header">
            <button className="back-button" onClick={() => setSelectedChat("")}>
              &#8592;
            </button>
            <span>
              {!selectedChat.isGroupChat
                ? getSender(user, selectedChat)
                : selectedChat.chatName.toUpperCase()}
            </span>
          </div>
          <div className="chat-box">
            {loading ? (
              <div className="spinner">Loading...</div>
            ) : (
              <div className="messages">
                <ScrollChat messages={messages} />
              </div>
            )}
            {isTyping && <div className="typing-indicator">Typing...</div>}
            <input
              type="text"
              className="message-input"
              placeholder="Enter a message..."
              value={newMessage}
              onChange={typingHandler}
              onKeyDown={sendMessage}
            />
          </div>
        </>
      ) : (
        <div className="no-chat-selected">
          Click on a user to start chatting.
        </div>
      )}
    </div>
  );
};


export default SingleChat;
