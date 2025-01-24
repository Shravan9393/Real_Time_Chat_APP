// import React, { useContext } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import "./navbar.css";

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, logout } = useContext(AuthContext);

//   const handleLogout = () => {
//     logout(); // Clear user data and context state
//     navigate("/login"); // Redirect to login page
//   };

//   const linksByPath = {
//     "/register": (
//       <>
//         <Link to="/login" className="nav-link">
//           Login
//         </Link>
//       </>
//     ),
//     "/login": (
//       <>
//         <Link to="/register" className="nav-link">
//           Register
//         </Link>
//         <Link to="/forgot-password" className="nav-link">
//           Forgot Password
//         </Link>
//       </>
//     ),
//     "/": (
//       <>
//         <Link to="/profile" className="nav-link">
//           Profile
//         </Link>
//         <button onClick={handleLogout} className="nav-link logout-button">
//           Logout
//         </button>
//       </>
//     ),
//     "/profile": (
//       <>
//         <Link to="/" className="nav-link">
//           Chat Dashboard
//         </Link>
//         <button onClick={handleLogout} className="nav-link logout-button">
//           Logout
//         </button>
//       </>
//     ),
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-title">
//         {location.pathname === "/" ? "Chat Dashboard" : "Real Time Chat App"}
//       </div>
//       <div className="navbar-links">
//         {linksByPath[location.pathname] || (
//           <>
//             <Link to="/login" className="nav-link">
//               Login
//             </Link>
//             <Link to="/register" className="nav-link">
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Clear user data and context state
    navigate("/login"); // Redirect to login page
  };

  const renderLinks = () => {
    if (user) {
      // If user is logged in
      return (
        <>
          {location.pathname !== "/chat" && (
            <Link to="/chat" className="nav-link">
              Chat Dashboard
            </Link>
          )}
          <button onClick={handleLogout} className="nav-link logout-button">
            Logout
          </button>
        </>
      );
    }

    //   // If user is not logged in
    //   switch (location.pathname) {
    //     case "/register":
    //       return (
    //         <Link to="/login" className="nav-link">
    //           Login
    //         </Link>
    //       );
    //     case "/login":
    //       return (
    //         <Link to="/register" className="nav-link">
    //           Register
    //         </Link>
    //       );
    //     default:
    //       return (
    //         <>
    //           <Link to="/login" className="nav-link">
    //             Login
    //           </Link>
    //           <Link to="/register" className="nav-link">
    //             Register
    //           </Link>
    //         </>
    //       );
    //   }
    // };

    if (location.pathname === "/register") {
      return (
        <Link to="/login" className="nav-link">
          Login
        </Link>
      );
    }

    if (location.pathname === "/login") {
      return (
        <Link to="/register" className="nav-link">
          Register
        </Link>
      );
    }

    return (
      <>
        <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </>
    );
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">
        {location.pathname === "/chat"
          ? "Chat Dashboard"
          : "Real Time Chat App"}
      </div>
      <div className="navbar-links">{renderLinks()}</div>
    </nav>
  );
};

export default Navbar;
