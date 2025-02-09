import React, { useState } from "react";
import ChatWindow from "../chat/chatWindow";
import MyChats from "../chat/MyChats";
import SideNav from "../common/sideNav";
import { ChatState } from "../../context/chatContext";
import "./chatDashboard.css";

const ChatDashboard = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div className="chat-dashboard">
      {user && <SideNav />}
      <div className="chat-main">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatWindow fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </div>
    </div>
  );
};

export default ChatDashboard;
