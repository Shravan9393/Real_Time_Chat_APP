// import React, { useState } from "react";
// import { ChatState } from "../../context/chatContext";
// import ChatLoading from "../chat/chatLoading";
// // import UserListItem from "../profile/UserListItem";
// import axiosInstance from "../../utils/api";

// function SideNav() {
//   const [search, setSearch] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingChat, setLoadingChat] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const { setSelectedChat, user, chats, setChats } = ChatState();

//   // Search for users

//   const handleSearch = async () => {
//     if (!search) {
//       alert("❌ Please enter a username to search.");
//       return;
//     }

//     try {
//       setLoading(true);
//       console.log("🔍 Searching user:", search);

//       const config = {
//         headers: { Authorization: `Bearer ${user.accessToken}` },
//       };

//       const { data } = await axiosInstance.get(
//         `/users/searchUser?search=${search}`,
//         config
//       );
//       console.log("✅ Search response Data from SideNav.js file :", data);

//       if (data.success && Array.isArray(data.data)) {
//         setSearchResult(data.data);
//         alert("✅ User search successful!");
//       } else {
//         alert("❌ Unexpected API response format.");
//       }

//       setLoading(false);
//     } catch (error) {
//       console.error("❌ Search user error in sidenav.js file:", error);
//       alert("❌ Failed to load search results.");
//       setLoading(false);
//     }
//   };

//   // ➕ Add User to "My Chats"

//   const addUserToChats = async (selectedUser) => {
//     try {
//       setLoadingChat(true);
//       console.log("➕ Adding user to chats:", selectedUser);

//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user.accessToken}`,
//         },
//       };

//       console.log("This is the current user id", user._id);
//       console.log(
//         "The user which has been selected to add in current user chat's as a friend",
//         selectedUser
//       );
//       console.log(
//         "The is the user which has been selected to add in current user chat's as a friend that id is :",
//         selectedUser._id
//       );

//       // Call POST to add or fetch the chat between the two users
//       await axiosInstance.post(
//         `/chat/addSearchedUserToChat`,
//         { userId: selectedUser._id },
//         config
//       );

//       const { data } = await axiosInstance.get(
//         `/chat/getChatAccess/${selectedUser._id}`,
//         // { userId },
//         config
//       );

//       console.log("✅ Chat access response:", data);

//       if (!data || !data.data.chat) {
//         console.error("❌ Invalid chat object received:", data);
//         alert("❌ Failed to add user. Invalid chat data received.");
//         return;
//       }

//       const chat = data.data.chat;

//       if (!chats.find((c) => c._id === chat._id)) {
//         setChats([chat, ...chats]); // Add to My Chats
//         // 1 selectedUser.fullName after checking add this
//         alert(`✅ ${selectedUser.fullName} has been added to My Chats.`);
//       } else {
//         alert(`⚠️ ${selectedUser.fullName} is already in My Chats.`);
//       }

//       console.log(
//         "✅ Extracted chat object before setting selectedChat:",
//         chat
//       );
//       setSelectedChat(chat);
//       // setSelectedChat(data.data.chat);
//       setLoadingChat(false);
//       setDrawerOpen(false);
//     } catch (error) {
//       console.error("❌ Add user error:", error);
//       alert("❌ Failed to add user to My Chats.");
//       setLoadingChat(false);
//     }
//   };

//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           padding: "16px",
//           backgroundColor: "#f5f5f5",
//           borderRight: "1px solid #ddd",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "16px",
//           }}
//         >
//           <button
//             style={{
//               background: "none",
//               border: "none",
//               fontSize: "16px",
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//             }}
//             onClick={() => setDrawerOpen(true)}
//           >
//             <i className="fas fa-search"></i>
//             <span>Search User</span>
//           </button>
//           <h2 style={{ fontSize: "18px", margin: 0 }}>Talk-A-Tive</h2>
//           <img
//             src={user.avatar}
//             alt={user.fullName}
//             title={user.fullName}
//             style={{
//               width: "40px",
//               height: "40px",
//               borderRadius: "50%",
//               cursor: "pointer",
//             }}
//           />
//         </div>
//       </div>

//       {/* 🔍 Search Drawer */}
//       {drawerOpen && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0,0,0,0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 1000,
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: "white",
//               padding: "20px",
//               borderRadius: "8px",
//               width: "400px",
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 marginBottom: "16px",
//               }}
//             >
//               <h3 style={{ margin: 0 }}>Search Users</h3>
//               <button
//                 onClick={() => setDrawerOpen(false)}
//                 style={{
//                   background: "none",
//                   border: "none",
//                   fontSize: "18px",
//                   cursor: "pointer",
//                 }}
//               >
//                 &times;
//               </button>
//             </div>

//             {/* 🔍 Search Input */}
//             <div style={{ marginBottom: "16px" }}>
//               <input
//                 type="text"
//                 placeholder="Search by name or email"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 style={{
//                   width: "calc(100% - 60px)",
//                   padding: "8px",
//                   marginRight: "8px",
//                   border: "1px solid #ddd",
//                   borderRadius: "4px",
//                 }}
//               />
//               <button onClick={handleSearch} style={{ padding: "8px 16px" }}>
//                 Go
//               </button>
//             </div>

//             {/* 🔄 Loading Indicator */}
//             {loading ? (
//               <ChatLoading />
//             ) : (
//               searchResult?.map((user) => (
//                 <div
//                   key={user._id}
//                   style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     padding: "8px",
//                     borderBottom: "1px solid #ddd",
//                   }}
//                 >
//                   <div>
//                     <p style={{ margin: 0, fontWeight: "bold" }}>{user.name}</p>
//                     <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>
//                       {user.email}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => addUserToChats(user)}
//                     style={{
//                       padding: "4px 8px",
//                       background: "#4caf50",
//                       color: "white",
//                       border: "none",
//                       borderRadius: "4px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Add
//                   </button>
//                 </div>
//               ))
//             )}

//             {loadingChat && <div>Loading...</div>}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default SideNav;










































import React, { useState } from "react";
import { ChatState } from "../../context/chatContext";
import ChatLoading from "../chat/chatLoading";
import axiosInstance from "../../utils/api";

function SideNav() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { setSelectedChat, user, chats, setChats } = ChatState();

  // Handler to search for users by name or email.
  const handleSearch = async () => {
    if (!search) {
      alert("❌ Please enter a username to search.");
      return;
    }

    try {
      setLoading(true);
      console.log("🔍 Searching user:", search);

      const config = {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      };

      const { data } = await axiosInstance.get(
        `/users/searchUser?search=${search}`,
        config
      );
      console.log("✅ Search response Data from SideNav.js:", data);

      if (data.success && Array.isArray(data.data)) {
        setSearchResult(data.data);
        alert("✅ User search successful!");
      } else {
        alert("❌ Unexpected API response format.");
      }
      setLoading(false);
    } catch (error) {
      console.error("❌ Search user error in SideNav.js:", error);
      alert("❌ Failed to load search results.");
      setLoading(false);
    }
  };

  // Handler to add a searched user to the chat list.
  // It first calls the POST route to add or fetch the chat,
  // then calls the GET route to verify chat access,
  // and finally updates the chat list and sets the selected chat.
  const addUserToChats = async (selectedUser) => {
    try {
      setLoadingChat(true);
      console.log("➕ Adding user to chats:", selectedUser);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      };

      console.log("Current user ID:", user._id);
      console.log("Selected user ID:", selectedUser._id);

      // First, add or fetch the chat using the POST endpoint.
      await axiosInstance.post(
        `/chat/addSearchedUserToChat`,
        { userId: selectedUser._id },
        config
      );

      // Then, verify chat access using the GET endpoint.
      const { data } = await axiosInstance.get(
        `/chat/getChatAccess/${selectedUser._id}`,
        config
      );

      console.log("✅ Chat access response:", data);

      if (!data || !data.data.chat) {
        console.error("❌ Invalid chat object received:", data);
        alert("❌ Failed to add user. Invalid chat data received.");
        setLoadingChat(false);
        return;
      }

      const chat = data.data.chat;

      // If the chat does not already exist in our chat list, add it.
      if (!chats.find((c) => c._id === chat._id)) {
        setChats([chat, ...chats]);
        alert(
          `✅ ${
            selectedUser.fullName || selectedUser.name
          } has been added to My Chats.`
        );
      } else {
        alert(
          `⚠️ ${
            selectedUser.fullName || selectedUser.name
          } is already in My Chats.`
        );
      }

      console.log("✅ Chat object:", chat);
      setSelectedChat(chat);
      setLoadingChat(false);
      setDrawerOpen(false);
    } catch (error) {
      console.error("❌ Add user error:", error);
      alert("❌ Failed to add user to My Chats.");
      setLoadingChat(false);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          backgroundColor: "#f5f5f5",
          borderRight: "1px solid #ddd",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <button
            style={{
              background: "none",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onClick={() => setDrawerOpen(true)}
          >
            <i className="fas fa-search"></i>
            <span>Search User</span>
          </button>
          <h2 style={{ fontSize: "18px", margin: 0 }}>Talk-A-Tive</h2>
          <img
            src={user.avatar}
            alt={user.fullName}
            title={user.fullName}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
        </div>
      </div>

      {/* Search Drawer */}
      {drawerOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <h3 style={{ margin: 0 }}>Search Users</h3>
              <button
                onClick={() => setDrawerOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>
            </div>

            {/* Search Input */}
            <div style={{ marginBottom: "16px" }}>
              <input
                type="text"
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "calc(100% - 60px)",
                  padding: "8px",
                  marginRight: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                }}
              />
              <button onClick={handleSearch} style={{ padding: "8px 16px" }}>
                Go
              </button>
            </div>

            {/* Loading Indicator or Search Results */}
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((userItem) => (
                <div
                  key={userItem._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <div>
                    <p style={{ margin: 0, fontWeight: "bold" }}>
                      {userItem.fullName || userItem.name}
                    </p>
                    <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>
                      {userItem.email}
                    </p>
                  </div>
                  <button
                    onClick={() => addUserToChats(userItem)}
                    style={{
                      padding: "4px 8px",
                      background: "#4caf50",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Add
                  </button>
                </div>
              ))
            )}

            {loadingChat && <div>Loading...</div>}
          </div>
        </div>
      )}
    </>
  );
}

export default SideNav;
