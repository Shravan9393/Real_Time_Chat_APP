// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import "../styles/HomePage.css"; // Create a CSS file for styling

// function HomePage() {
//   const navigate = useNavigate();
//   const [selectedTab, setSelectedTab] = useState("login");

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("userInfo"));
//     if (user) {
//       navigate("/chats");
//     }
//   }, [navigate]);

//   return (
//     <div className="container">
//       {/* Header */}
//       <div className="header">
//         <h1 className="title">Talk-A-Tive</h1>
//       </div>

//       {/* Tabs */}
//       <div className="tabs">
//         <Link
//           to="/login"
//           className={`tab-button ${selectedTab === "login" ? "active" : ""}`}
//         >
//           Login
//         </Link>
//         <Link
//           to="/register"
//           className={`tab-button ${selectedTab === "register" ? "active" : ""}`}
//         >
//           Register
//         </Link>
//       </div>

//       {/* Content */}
//       <div className="tab-content">
//         {selectedTab === "login" && <p>Please click "Login" to proceed.</p>}
//         {selectedTab === "register" && (
//           <p>Please click "Register" to proceed.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default HomePage;
