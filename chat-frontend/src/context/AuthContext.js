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
      const { token, user } = response.data;

      // Save token in localStorage
      localStorage.setItem("token", token);

      // Update user context
      setUser(user);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw new Error("Invalid credentials");
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
