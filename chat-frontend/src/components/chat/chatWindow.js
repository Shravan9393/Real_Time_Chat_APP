import React, { useState, useEffect } from "react";
import "./chatWindow.css";
import { io } from "socket.io-client"; // Import Socket.IO client
import axios from "axios";

const ChatWindow = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize Socket.IO client and connect to the server
    const newSocket = io("http://localhost:5000", {
      transports: ["websocket"], // Ensure WebSocket transport is used
      withCredentials: true, // Allow credentials for CORS
    });
    setSocket(newSocket);

    // Handle successful connection
    newSocket.on("connect", () => {
      console.log("Connected to server with ID:", newSocket.id);

      // Join the user's chat room
      newSocket.emit("joinRoom", user.id);
    });

    // Handle new messages from the server
    newSocket.on("new message", (message) => {
      console.log("New message received:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Handle disconnection
    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Cleanup when component unmounts
    return () => {
      newSocket.emit("leaveRoom", user.id); // Leave the room
      newSocket.off(); // Remove all event listeners
      newSocket.close(); // Close the socket connection
    };
  }, [user.id]);

  const handleSendMessage = () => {
    if (newMessage.trim() && socket) {
      const messageData = {
        sender: "You",
        text: newMessage,
        chatId: user.id,
      };

      // Emit the message to the server
      socket.emit("new message", messageData);

      // Optimistically update the UI
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage("");

      // Save the message to the backend
      axios
        .post("http://localhost:5000/api/v1/message/sendMessage", messageData)
        .catch((err) => {
          console.error("Error sending message:", err);
        });
    }
  };

  return (
    <div className="chat-window">
      <header className="chat-header">
        <h2>Chat with {user.username}</h2>
      </header>
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender === "You" ? "sent" : "received"
            }`}
          >
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <footer className="chat-footer">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </footer>
    </div>
  );
};

export default ChatWindow;
