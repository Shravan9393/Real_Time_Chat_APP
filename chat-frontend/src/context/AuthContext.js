import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login function to authenticate user and save token
const login = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/users/login",
      userData
    );
    console.log("Login API response:", response.data); // Debugging

    const { accessToken, refreshToken, user } = response.data.data; // Extract data correctly

    // Save tokens in localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    console.log("Tokens saved in localStorage:", accessToken, refreshToken); // Debugging
    console.log("before set user:", user); // Debugging
    // Update user context
    setUser(user);
    console.log("User context updated:", user); // Debugging
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error; // Pass error to the caller for handling
  }
};


  // Logout function to clear user data and token
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
