import React, { useState, useContext } from "react";
import { ChatContext } from "../../context/chatContext";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { sendMessage } = useContext(ChatContext);

  const handleSend = () => {
    if (text.trim()) {
      sendMessage(text);
      setText("");
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default MessageInput;
