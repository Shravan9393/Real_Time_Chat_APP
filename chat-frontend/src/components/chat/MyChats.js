// // import { AddIcon } from "@chakra-ui/icons";
// import { Box, Stack, Text } from "@chakra-ui/layout";
// import { useToast } from "@chakra-ui/toast";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { getSender } from "./chatLogic";
// import ChatLoading from "./chatLoading";
// // import GroupChatModal from "./miscellaneous/GroupChatModal";
// // import { Button } from "@chakra-ui/react";
// import { ChatState } from "../../context/chatContext";

// const MyChats = ({ fetchAgain }) => {
//   const [loggedUser, setLoggedUser] = useState();

//   const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

//   const toast = useToast();

//   const fetchChats = async () => {
//     console.log(user._id);
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.accessToken}`,
//         },
//       };

//       const { data } = await axios.get("/v1/chat/getChatHistory", config);
//       setChats(data);
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: "Failed to Load the chats",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//     }
//   };

//   useEffect(() => {
//     setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
//     fetchChats();
//     // eslint-disable-next-line
//   }, [fetchAgain]);

//   return (
//     <Box
//       d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
//       flexDir="column"
//       alignItems="center"
//       p={3}
//       bg="white"
//       w={{ base: "100%", md: "31%" }}
//       borderRadius="lg"
//       borderWidth="1px"
//     >
//       <Box
//         pb={3}
//         px={3}
//         fontSize={{ base: "28px", md: "30px" }}
//         fontFamily="Work sans"
//         d="flex"
//         w="100%"
//         justifyContent="space-between"
//         alignItems="center"
//       >
//         My Chats
//         {/* <GroupChatModal>
//           <Button
//             d="flex"
//             fontSize={{ base: "17px", md: "10px", lg: "17px" }}
//             rightIcon={<AddIcon />}
//           >
//             New Group Chat
//           </Button>
//         </GroupChatModal> */}
//       </Box>
//       <Box
//         d="flex"
//         flexDir="column"
//         p={3}
//         bg="#F8F8F8"
//         w="100%"
//         h="100%"
//         borderRadius="lg"
//         overflowY="hidden"
//       >
//         {chats ? (
//           <Stack overflowY="scroll">
//             {chats.map((chat) => (
//               <Box
//                 onClick={() => setSelectedChat(chat)}
//                 cursor="pointer"
//                 bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
//                 color={selectedChat === chat ? "white" : "black"}
//                 px={3}
//                 py={2}
//                 borderRadius="lg"
//                 key={chat._id}
//               >
//                 <Text>
//                   {!chat.isGroupChat
//                     ? getSender(loggedUser, chat.users)
//                     : chat.chatName}
//                 </Text>
//                 {chat.latestMessage && (
//                   <Text fontSize="xs">
//                     <b>{chat.latestMessage.sender.name} : </b>
//                     {chat.latestMessage.content.length > 50
//                       ? chat.latestMessage.content.substring(0, 51) + "..."
//                       : chat.latestMessage.content}
//                   </Text>
//                 )}
//               </Box>
//             ))}
//           </Stack>
//         ) : (
//           <ChatLoading />
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default MyChats;



// import { useEffect, useState } from "react";
// import axios from "axios";
// import { getSender } from "./chatLogic";
// import ChatLoading from "./chatLoading";
// import { ChatState } from "../../context/chatContext";

// const MyChats = ({ fetchAgain }) => {
//   const [loggedUser, setLoggedUser] = useState();

//   const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

//   const fetchChats = async () => {
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.accessToken}`,
//         },
//       };

//       const { data } = await axios.get("/v1/chat/getChatHistory", config);
//       setChats(data);
//     } catch (error) {
//       alert("Error Occurred: Failed to load the chats");
//     }
//   };

//   useEffect(() => {
//     setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
//     fetchChats();
//   }, [fetchAgain]);

//   return (
//     <div
//       style={{
//         display: selectedChat ? "none" : "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         padding: "16px",
//         backgroundColor: "white",
//         width: "100%",
//         maxWidth: "31%",
//         borderRadius: "8px",
//         border: "1px solid #ccc",
//         boxSizing: "border-box",
//       }}
//     >
//       <div
//         style={{
//           paddingBottom: "12px",
//           paddingInline: "12px",
//           fontSize: "28px",
//           fontFamily: "Arial, sans-serif",
//           display: "flex",
//           width: "100%",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         My Chats
//       </div>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           padding: "12px",
//           backgroundColor: "#F8F8F8",
//           width: "100%",
//           height: "100%",
//           borderRadius: "8px",
//           overflowY: "hidden",
//         }}
//       >
//         {chats ? (
//           <div style={{ overflowY: "scroll" }}>
//             {chats.map((chat) => (
//               <div
//                 key={chat._id}
//                 onClick={() => setSelectedChat(chat)}
//                 style={{
//                   cursor: "pointer",
//                   backgroundColor:
//                     selectedChat === chat ? "#38B2AC" : "#E8E8E8",
//                   color: selectedChat === chat ? "white" : "black",
//                   padding: "12px",
//                   borderRadius: "8px",
//                   marginBottom: "8px",
//                 }}
//               >
//                 <div>
//                   {!chat.isGroupChat
//                     ? getSender(loggedUser, chat.users)
//                     : chat.chatName}
//                 </div>
//                 {chat.latestMessage && (
//                   <div style={{ fontSize: "12px" }}>
//                     <b>{chat.latestMessage.sender.name}:</b>{" "}
//                     {chat.latestMessage.content.length > 50
//                       ? chat.latestMessage.content.substring(0, 51) + "..."
//                       : chat.latestMessage.content}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <ChatLoading />
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyChats;



import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ChatState } from "../../context/chatContext";
import { AuthContext } from "../../context/AuthContext";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const { logout } = useContext(AuthContext); // Add logout if needed

  const fetchChats = async () => {
    if (!user) return; // Make sure user is defined

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:5000/api/v1/chat/getChatHistory",
        config
      );
      setChats(data);
    } catch (error) {
      alert("Error Occurred: Failed to load the chats");
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain, user]); // Add user as a dependency

  // Helper function to get the sender's name
  const getSender = (loggedUser, users) => {
    return users.find((user) => user._id !== loggedUser._id).name;
  };

  return (
    <div
      style={{
        display: selectedChat ? "none" : "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "16px",
        backgroundColor: "white",
        width: "100%",
        maxWidth: "31%",
        borderRadius: "8px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          paddingBottom: "12px",
          paddingInline: "12px",
          fontSize: "28px",
          fontFamily: "Arial, sans-serif",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        My Chats
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "12px",
          backgroundColor: "#F8F8F8",
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          overflowY: "hidden",
        }}
      >
        {chats ? (
          <div style={{ overflowY: "scroll" }}>
            {chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedChat === chat ? "#38B2AC" : "#E8E8E8",
                  color: selectedChat === chat ? "white" : "black",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "8px",
                }}
              >
                <div>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </div>
                {chat.latestMessage && (
                  <div style={{ fontSize: "12px" }}>
                    <b>{chat.latestMessage.sender.name}:</b>{" "}
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>No chats available</div>
        )}
      </div>
    </div>
  );
};

export default MyChats;
