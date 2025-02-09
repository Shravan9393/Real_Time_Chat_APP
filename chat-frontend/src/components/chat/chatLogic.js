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



export const getSender = (loggedUser, chat) => {
  console.log("The current logged user in chatLogic.js file:", loggedUser);
  console.log("getSender received:", chat);
  console.log("Type of chat:", Array.isArray(chat) ? "Array" : "Object");

  if (!chat || Array.isArray(chat)) {
    console.error("❌ Invalid chat object received in getSender:", chat);
    return "Invalid Chat";
  }


   return (
     chat.users.find((u) => u._id !== loggedUser._id)?.fullName || "Unknown"
   );
};




export const getSenderFull = (loggedUser, chat) => {
  if (!chat || !Array.isArray(chat.users) || chat.users.length < 2) {
    console.error("❌ Invalid users array in getSenderFull:", chat);
    return { username: "Unknown", fullName: "Unknown", _id: "unknown" };
  }
  return chat.users[0]._id === loggedUser._id ? chat.users[1] : chat.users[0];
};
