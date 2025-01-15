import React, { useState, useEffect } from "react";
import "./chatWindow.css";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:5000", {
  path: "/socket.io/", // Ensure this matches your server configuration
  transports: ["websocket"], // Use WebSocket for real-time communication
});

const ChatWindow = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Fetch messages when the component mounts or when the user changes
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/message/getMessages/${user.id}`)
      .then((response) => {
        setMessages(response.data.messages);
      })
      .catch((err) => console.error("Error fetching messages:", err));

    // Listen for incoming messages
    socket.emit("joinRoom", user.id);
    socket.on("new message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("new message");
    };
  }, [user]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        sender: "You",
        text: newMessage,
        chatId: user.id,
      };

      // Emit the message to the server
      socket.emit("new message", messageData);

      // Update the local message state
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage("");

      // Optionally, send the message to the backend
      axios
        .post("http://localhost:5000/api/v1/message/sendMessage", messageData)
        .catch((err) => console.error("Error sending message:", err));
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", user.id);
    }

    setTimeout(() => {
      setIsTyping(false);
      socket.emit("stopTyping", user.id);
    }, 2000);
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
        {isTyping && (
          <div className="typing-indicator">
            <p>{user.username} is typing...</p>
          </div>
        )}
      </div>
      <footer className="chat-footer">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={handleTyping}
        />
        <button onClick={handleSendMessage}>Send</button>
      </footer>
    </div>
  );
};

export default ChatWindow;
