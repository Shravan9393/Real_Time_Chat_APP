// import React, { useRef, useEffect } from "react";
// import "../styles/scrollChat.css"; // Custom CSS file
// import { ChatState } from "../../context/chatContext";
// import {
//   isLastMessage,
//   isSameSender,
//   isSameSenderMargin,
//   isSameUser,
// } from "../chat/chatLogic";

// const ScrollChat = ({ messages }) => {
//   const { user } = ChatState();
//   const chatContainerRef = useRef(null);

//   // Auto-scroll to the bottom when new messages arrive
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <div className="chat-container" ref={chatContainerRef}>
//       {messages &&
//         messages.map((m, i) => (
//           <div className="message-row" key={m._id}>
//             {(isSameSender(messages, m, i, user._id) ||
//               isLastMessage(messages, i, user._id)) && (
//               <div className="avatar" title={m.sender.name}>
//                 <img
//                   src={m.sender.pic}
//                   alt={m.sender.name}
//                   className="avatar-image"
//                 />
//               </div>
//             )}
//             <div
//               className={`message-bubble ${
//                 m.sender._id === user._id ? "sent" : "received"
//               }`}
//               style={{
//                 marginLeft: isSameSenderMargin(messages, m, i, user._id),
//                 marginTop: isSameUser(messages, m, i, user._id)
//                   ? "3px"
//                   : "10px",
//               }}
//             >
//               {m.content}
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default ScrollChat;




// import React, { useRef, useEffect } from "react";
// import { ChatState } from "../../context/chatContext";
// import {
//   isLastMessage,
//   isSameSender,
//   isSameSenderMargin,
//   isSameUser,
// } from "../chat/chatLogic";

// const ScrollChat = ({ messages }) => {
//   const { user } = ChatState();
//   const chatContainerRef = useRef(null);

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         overflowY: "auto",
//         padding: "16px",
//         maxHeight: "400px", // Adjust as needed
//         backgroundColor: "#f9f9f9",
//         border: "1px solid #ddd",
//         borderRadius: "8px",
//       }}
//       ref={chatContainerRef}
//     >
//       {messages &&
//         messages.map((m, i) => (
//           <div
//             key={m._id}
//             style={{
//               display: "flex",
//               alignItems: "flex-start",
//               marginTop: isSameUser(messages, m, i, user._id) ? "3px" : "10px",
//             }}
//           >
//             {(isSameSender(messages, m, i, user._id) ||
//               isLastMessage(messages, i, user._id)) && (
//               <div
//                 style={{
//                   width: "40px",
//                   height: "40px",
//                   borderRadius: "50%",
//                   overflow: "hidden",
//                   marginRight: "8px",
//                 }}
//                 title={m.sender.name}
//               >
//                 <img
//                   src={m.sender.pic}
//                   alt={m.sender.name}
//                   style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                 />
//               </div>
//             )}
//             <div
//               style={{
//                 backgroundColor: m.sender._id === user._id ? "#DCF8C6" : "#fff",
//                 border:
//                   m.sender._id === user._id
//                     ? "1px solid #34B7F1"
//                     : "1px solid #ddd",
//                 padding: "10px",
//                 borderRadius: "10px",
//                 marginLeft: isSameSenderMargin(messages, m, i, user._id),
//                 maxWidth: "60%",
//                 alignSelf: "flex-start",
//               }}
//             >
//               {m.content}
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default ScrollChat;



import React, { useRef, useEffect } from "react";
import { ChatState } from "../../context/chatContext";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../chat/chatLogic";

const ScrollChat = ({ messages }) => {
  const { user } = ChatState();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        padding: "16px",
        maxHeight: "400px", // Adjust as needed
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
      ref={chatContainerRef}
    >
      {messages &&
        messages.map((m, i) => (
          <div
            key={m._id}
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginTop: isSameUser(messages, m, i, user._id) ? "3px" : "10px",
            }}
          >
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginRight: "8px",
                }}
                title={m.sender.name}
              >
                <img
                  src={m.sender.pic}
                  alt={m.sender.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            )}
            <div
              style={{
                backgroundColor: m.sender._id === user._id ? "#DCF8C6" : "#fff",
                border:
                  m.sender._id === user._id
                    ? "1px solid #34B7F1"
                    : "1px solid #ddd",
                padding: "10px",
                borderRadius: "10px",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                maxWidth: "60%",
                alignSelf: "flex-start",
              }}
            >
              {m.content}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ScrollChat;
