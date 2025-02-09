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
