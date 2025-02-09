import React, { useRef, useEffect, useMemo } from "react";
import { ChatState } from "../../context/chatContext";
import { isLastMessage, isSameSender, isSameUser } from "../chat/chatLogic";
import "../styles/scrollChat.css";

const ScrollChat = ({ messages }) => {
  const { user } = ChatState();

  console.log("User in ScrollChat:", user);
  console.log("Messages in ScrollChat:", messages);

  // Ensure we always have an array for messages.
  const memoizedMessages = useMemo(() => {
    if (!messages) return [];
    if (Array.isArray(messages)) return messages;
    if (messages.data && Array.isArray(messages.data.messages)) {
      return messages.data.messages;
    }
    console.error("❌ Unexpected messages format:", messages);
    return [];
  }, [messages]);

  console.log("Memoized messages length:", memoizedMessages.length);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [memoizedMessages]);

  return (
    <div className="chat-container" ref={chatContainerRef}>
      {memoizedMessages.length > 0 ? (
        memoizedMessages.map((m, i) => {
          const isSentByUser = m.sender && m.sender._id === user._id;
          return (
            <div
              key={m._id}
              className={`message-row ${isSentByUser ? "sent" : "received"}`}
              style={{
                marginTop: isSameUser(memoizedMessages, m, i, user._id)
                  ? "3px"
                  : "10px",
              }}
            >
              {/* Only display avatar for incoming messages */}
              {!isSentByUser &&
                (isSameSender(memoizedMessages, m, i, user._id) ||
                  isLastMessage(memoizedMessages, i, user._id)) && (
                  <div className="avatar" title={m.sender?.fullName}>
                    <img src={m.sender.avatar} alt={m.sender.fullName} />
                  </div>
                )}
              <div className="message-content">
                <div
                  className="message-bubble"
                  style={{
                    backgroundColor: isSentByUser ? "#DCF8C6" : "#fff",
                    border: isSentByUser
                      ? "1px solid #34B7F1"
                      : "1px solid #ddd",
                  }}
                >
                  {m.message}
                </div>
                <div className="message-timestamp">
                  {new Date(m.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No messages yet.</p>
      )}
    </div>
  );
};

export default ScrollChat;
