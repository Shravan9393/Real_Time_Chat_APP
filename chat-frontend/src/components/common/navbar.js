import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const location = useLocation();

  const renderLinks = () => {
    switch (location.pathname) {
      case "/register":
        return (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </>
        );
      case "/login":
        return (
          <>
            <Link to="/register" className="nav-link">
              Register
            </Link>
            <Link to="/forgot-password" className="nav-link">
              Forgot Password
            </Link>
          </>
        );
      case "/":
        return (
          <>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <Link to="/logout" className="nav-link">
              Logout
            </Link>
          </>
        );
      case "/profile":
        return (
          <>
            <Link to="/" className="nav-link">
              Chat Dashboard
            </Link>
            <Link to="/logout" className="nav-link">
              Logout
            </Link>
          </>
        );
      default:
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
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">
        {location.pathname === "/" ? "Chat Dashboard" : "Real Time Chat App"}
      </div>
      <div className="navbar-links">{renderLinks()}</div>
    </nav>
  );
};

export default Navbar;
