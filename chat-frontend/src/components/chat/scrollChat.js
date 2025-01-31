import React, { useRef, useEffect, useMemo} from "react";
import { ChatState } from "../../context/chatContext";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../chat/chatLogic";

const ScrollChat = ({ messages }) => {
  const { user } = ChatState();

  // Extract actual messages array from API response
  // const messageArray = messages?.data?.messages || [];

  console.log("The user in scroll chat : ", user);
  console.log("The user is in scrollChat : ", user?._id);
  console.log("The messages in scroll chat : ", messages);
  // console.log("The messages length in scroll chat : ", messageArray.length);
  // console.log("The messages Id in scroll chat : ", messages._id);

  // Extract messages safely and ensure it's always an array
  const memoizedMessages = useMemo(() => {
    if (!messages) return []; // Default to empty array if messages is undefined
    if (Array.isArray(messages)) return messages; // If already an array, return it
    if (messages.data && Array.isArray(messages.data.messages)) {
      return messages.data.messages; // Extract from API response format
    }
    console.error("❌ Unexpected messages format:", messages);
    return []; // Fallback to empty array to prevent crashes
  }, [messages]);

  console.log("Memoized messages length:", memoizedMessages.length);


  const chatContainerRef = useRef(null);
  // console.log("The chat container ref in scroll chat : ", chatContainerRef);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [memoizedMessages]);

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
      {memoizedMessages.length > 0 ? (
        memoizedMessages.map((m, i) => (
          <div
            key={m._id}
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginTop: isSameUser(memoizedMessages, m, i, user._id)
                ? "3px"
                : "10px",
            }}
          >
            {(isSameSender(memoizedMessages, m, i, user._id) ||
              isLastMessage(memoizedMessages, i, user._id)) && (
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginRight: "8px",
                }}
                title={m.sender?.fullName}
              >
                <img
                  src={m.sender.avatar}
                  alt={m.sender.fullName}
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
                marginLeft: isSameSenderMargin(
                  memoizedMessages,
                  m,
                  i,
                  user._id
                ),
                maxWidth: "60%",
                alignSelf: "flex-start",
              }}
            >
              {m.content}
            </div>
          </div>
        ))
      ) : (
        <p>No messages yet.</p> // Display fallback message when there are no messages
      )}
    </div>
  );
};

export default ScrollChat;
