import React, { useState } from "react";
import "./chatWindow.css";

const ChatWindow = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "You", text: newMessage }]);
      setNewMessage("");
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
