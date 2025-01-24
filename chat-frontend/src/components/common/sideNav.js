// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/SideNav.css";
// import { ChatState } from "../../context/chatContext";
// import ChatLoading from "../chat/chatLoading";
// import UserListItem from "../profile/UserListItem";
// // import { getSender } from "../../config/ChatLogics";

// function SideNav() {
//   const [search, setSearch] = useState("");
//   const [searchResult, setSearchResult] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingChat, setLoadingChat] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const {
//     setSelectedChat,
//     user,
//     notification,
//     // setNotification,
//     chats,
//     setChats,
//   } = ChatState();

//   const navigate = useNavigate();

//   const logoutHandler = () => {
//     localStorage.removeItem("userInfo");
//     navigate("/login");
//   };

//   const handleSearch = async () => {
//     if (!search) {
//       alert("Please enter a username in the search");
//       return;
//     }
//     try {
//       setLoading(true);
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.accessToken}`,
//         },
//       };
//       const { data } = await axios.get(
//         `/v1/users/searchUser?search=${search}`,
//         config
//       );
//       setLoading(false);
//       setSearchResult(data);
//     } catch (error) {
//       alert("Failed to load the search results");
//       setLoading(false);
//     }
//   };

//   const getChatAccess = async (userId) => {
//     try {
//       setLoadingChat(true);
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${user.accessToken}`,
//         },
//       };
//       const { data } = await axios.post(
//         "/v1/chat/getChatAccess",
//         { userId },
//         config
//       );

//       if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

//       setSelectedChat(data);
//       setLoadingChat(false);
//       setDrawerOpen(false);
//     } catch (error) {
//       alert("Failed to load the chat");
//       setLoadingChat(false);
//     }
//   };

//   return (
//     <>
//       <div className="sidenav-container">
//         <div className="sidenav-header">
//           <button className="search-button" onClick={() => setDrawerOpen(true)}>
//             <i className="fas fa-search"></i>
//             <span className="search-text">Search User</span>
//           </button>
//           <h2 className="app-title">Talk-A-Tive</h2>
//           <div className="menu-icons">
//             <div className="notifications">
//               <span className="notification-badge">{notification.length}</span>
//               <i className="fas fa-bell"></i>
//             </div>
//             <div className="profile-menu">
//               <img
//                 className="avatar"
//                 src={user.pic}
//                 alt={user.name}
//                 title={user.name}
//               />
//               <div className="dropdown-menu">
//                 <button onClick={() => alert("Show profile page")}>
//                   My Profile
//                 </button>
//                 <button onClick={logoutHandler}>Logout</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {drawerOpen && (
//         <div className="drawer-overlay">
//           <div className="drawer">
//             <div className="drawer-header">
//               <h3>Search Users</h3>
//               <button
//                 className="close-button"
//                 onClick={() => setDrawerOpen(false)}
//               >
//                 &times;
//               </button>
//             </div>
//             <div className="drawer-body">
//               <div className="search-box">
//                 <input
//                   type="text"
//                   placeholder="Search by name or email"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                 />
//                 <button onClick={handleSearch}>Go</button>
//               </div>
//               {loading ? (
//                 <ChatLoading />
//               ) : (
//                 searchResult?.map((user) => (
//                   <UserListItem
//                     key={user._id}
//                     user={user}
//                     handleFunction={() => getChatAccess(user._id)}
//                   />
//                 ))
//               )}
//               {loadingChat && <div className="spinner">Loading...</div>}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default SideNav;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChatState } from "../../context/chatContext";
import ChatLoading from "../chat/chatLoading";
import UserListItem from "../profile/UserListItem";

function SideNav() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { setSelectedChat, user, notification, chats, setChats } = ChatState();

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const handleSearch = async () => {
    if (!search) {
      alert("Please enter a username in the search");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      };
      const { data } = await axios.get(
        `/v1/users/searchUser?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      alert("Failed to load the search results");
      setLoading(false);
    }
  };

  const getChatAccess = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      };
      const { data } = await axios.post(
        "/v1/chat/getChatAccess",
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      setDrawerOpen(false);
    } catch (error) {
      alert("Failed to load the chat");
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
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "12px",
                }}
              >
                {notification.length}
              </span>
              <i className="fas fa-bell" style={{ fontSize: "20px" }}></i>
            </div>
            <img
              src={user.pic}
              alt={user.name}
              title={user.name}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>

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
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => getChatAccess(user._id)}
                />
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
