import React, { useState, useEffect } from "react";
import "./chatWindow.css";
import axios from "axios";
import socket from "../../utils/socekt";


const ChatWindow = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch messages when the component mounts or when the user changes
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/message/getMessages/${user.id}`
        );
        setMessages(response.data.messages);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();

    socket.emit("joinRoom", user.id);
    socket.on("new message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("new message");
      socket.emit("leaveRoom", user.id);
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
      try {
        axios.post("http://localhost:5000/api/v1/message/sendMessage", messageData);
      } catch (err) {
        console.error("Error sending message:", err);
      }
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
