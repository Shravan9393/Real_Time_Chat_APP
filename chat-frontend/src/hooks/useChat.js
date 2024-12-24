import { useContext } from "react";
import { ChatContext } from "../context/chatContext";

const useChat = () => useContext(ChatContext);

export default useChat;
