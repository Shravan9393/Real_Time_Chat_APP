// import React, { useState, useContext } from "react";
// import { ChatContext } from "../../context/chatContext";

// const MessageInput = ({ onTyping }) => {
//   const [text, setText] = useState("");
//   const { sendMessage } = useContext(ChatContext);

//   const handleSend = () => {
//     if (text.trim()) {
//       sendMessage(text);
//       setText("");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSend();
//     }
//   };

//   const handleInputChange = (e) => {
//     setText(e.target.value);

//     // Notify the parent component about typing activity
//     if (onTyping) {
//       onTyping(e.target.value.trim() !== "");
//     }
//   };

//   return (
//     <div className="message-input">
//       <input
//         type="text"
//         value={text}
//         onChange={handleInputChange}
//         onKeyPress={handleKeyPress}
//         placeholder="Type a message..."
//       />
//       <button onClick={handleSend}>Send</button>
//     </div>
//   );
// };

// export default MessageInput;
