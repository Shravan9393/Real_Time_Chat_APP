import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const socket = io(
    process.env.REACT_APP_SOCKET_URL || "http://localhost:3000"
  );

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, );

  const sendMessage = (message) => {
    socket.emit("sendMessage", message);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return { messages, sendMessage };
};

export default useChat;
