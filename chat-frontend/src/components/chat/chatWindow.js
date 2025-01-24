// import { Box } from "@chakra-ui/layout";
// // import "./chatStyle.css";
// import SingleChat from "./singleChat";
// import { ChatState } from "../../context/chatContext";

// const ChatWindow = ({ fetchAgain, setFetchAgain }) => {
//   const { selectedChat } = ChatState();

//   return (
//     <Box
//       d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
//       alignItems="center"
//       flexDir="column"
//       p={3}
//       bg="white"
//       w={{ base: "100%", md: "68%" }}
//       borderRadius="lg"
//       borderWidth="1px"
//     >
//       <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
//     </Box>
//   );
// };

// export default ChatWindow;




import SingleChat from "./singleChat";
import { ChatState } from "../../context/chatContext";

const ChatWindow = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <div
      style={{
        display: selectedChat ? "flex" : "none",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
        backgroundColor: "white",
        width: "100%",
        maxWidth: "68%",
        borderRadius: "8px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
      }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default ChatWindow;
