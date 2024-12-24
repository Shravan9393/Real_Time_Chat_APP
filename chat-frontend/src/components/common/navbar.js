import React, { useState } from "react";
import "./navbar.css";

const Navbar = ({ onToggleView }) => {
  const [isProfileView, setIsProfileView] = useState(false);

  // Handle the view toggle logic and call the onToggleView function passed from parent
  const handleToggle = () => {
    setIsProfileView((prev) => !prev);
    onToggleView(!isProfileView); // Pass the updated view state to parent component
  };

  return (
    <div className="navbar">
      <h1>{isProfileView ? "Profile Dashboard" : "Chat App"}</h1>
      <button onClick={handleToggle} className="toggle-button">
        {isProfileView ? "Go to Chat" : "View Profile"}
      </button>
    </div>
  );
};

export default Navbar;
