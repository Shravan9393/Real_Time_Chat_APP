export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1]?.sender?._id === m.sender?._id;
};

// export const getSender = (loggedUser, chat) => {
//   console.log("The current loged user in chatLogic.js file: ", loggedUser);
//   console.log(
//     "The chat which has been selected to send message in chatLogic.js file : ",
//     chat
//   );
//   console.log("The chat users in chatLogic.js file: ", chat.users);
//   console.log("the chat id form chatLogic.js file: ", chat._id);

//   if (!chat || !Array.isArray(chat.users) || chat.users.length < 2) {
//     console.error("❌ Invalid chat object received in getSender:", chat);
//     return "Unknown User"; // Return default name to prevent crashes
//   }

//   // Ensure that the users array contains the expected number of users
//   const user1 = chat.users[0];
//   const user2 = chat.users[1];

//   if (!user1 || !user2 || !user1._id || !user2._id) {
//     console.error("❌ Invalid user data in chat:", chat);
//     return "Unknown User";
//   }

//   // Return the other user in the chat

//   return chat.users[0]._id === loggedUser._id
//     ? chat.users[1].username || chat.users[1].fullName
//     : chat.users[0].username || chat.users[0].fullName;
// };


// export const getSender = (loggedUser, chat) => {
//   if (!chat || !chat.users || !Array.isArray(chat.users)) {
//     console.error("❌ Invalid chat object received in getSender:", chat);
//     return "Unknown Sender";
//   }
//   return chat.users[0]._id === loggedUser._id ? chat.users[1] : chat.users[0];
// };


export const getSender = (loggedUser, chat) => {
  console.log("The current logged user in chatLogic.js file:", loggedUser);
  console.log("getSender received:", chat);
  console.log("Type of chat:", Array.isArray(chat) ? "Array" : "Object");

  if (!chat || Array.isArray(chat)) {
    console.error("❌ Invalid chat object received in getSender:", chat);
    return "Invalid Chat";
  }

  return chat.users[0]._id === loggedUser._id
    ? chat.users[1].name
    : chat.users[0].name;
};




export const getSenderFull = (loggedUser, chat) => {
  if (!chat || !Array.isArray(chat.users) || chat.users.length < 2) {
    console.error("❌ Invalid users array in getSenderFull:", chat);
    return { username: "Unknown", fullName: "Unknown", _id: "unknown" };
  }
  return chat.users[0]._id === loggedUser._id ? chat.users[1] : chat.users[0];
};








// export const getSender = (loggedUser, chat) => {
//   console.log("The current logged user in chatLogic.js file:", loggedUser);
//   console.log("Received chat object in getSender:", chat);

//   // Ensure chat is an object (not an array)
//   if (!chat || typeof chat !== "object" || Array.isArray(chat)) {
//     console.error("❌ Invalid chat object received in getSender:", chat);
//     return "Unknown User";
//   }

//   // Ensure chat.users exists and is an array
//   if (!Array.isArray(chat.users) || chat.users.length < 2) {
//     console.error("❌ Invalid users array in chat object:", chat);
//     return "Unknown User";
//   }

//   // Check if chat.users contains objects, not just IDs
//   const user1 = chat.users[0];
//   const user2 = chat.users[1];

//   if (typeof user1 === "string" || typeof user2 === "string") {
//     console.warn(
//       "⚠️ Chat users are strings, expected objects. Data might be incomplete:",
//       chat
//     );
//     return "Unknown User";
//   }

//   // Return the other user in the chat
//   return user1._id === loggedUser._id
//     ? user2.username || user2.fullName
//     : user1.username || user1.fullName;
// };

// export const getSenderFull = (loggedUser, chat) => {
//   if (!chat || !Array.isArray(chat.users) || chat.users.length < 2) {
//     console.error("❌ Invalid users array in getSenderFull:", chat);
//     return { username: "Unknown", fullName: "Unknown", _id: "unknown" };
//   }

//   const user1 = chat.users[0];
//   const user2 = chat.users[1];

//   if (typeof user1 === "string" || typeof user2 === "string") {
//     console.warn(
//       "⚠️ Chat users are strings, expected objects. Returning default:",
//       chat
//     );
//     return { username: "Unknown", fullName: "Unknown", _id: "unknown" };
//   }

//   return user1._id === loggedUser._id ? user2 : user1;
// };


