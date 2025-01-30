import React from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import axiosInstance from "../../utils/api";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the backend to handle logout
      await axiosInstance.post(
        "http://localhost:5000/api/v1/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Send the token if needed
          },
        }
      );

      // Clear local storage or token
      localStorage.removeItem("token");

      // Redirect to the login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        padding: "10px 20px",
        cursor: "pointer",
        borderRadius: "5px",
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
