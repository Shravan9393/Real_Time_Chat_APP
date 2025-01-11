import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const LoginPage = () => {
  const { login } = useContext(AuthContext); // Access the login function from AuthContext
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // For error handling
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setLoading(true); // Start loading

    try {
      // Call the login function from AuthContext
      await login({ username, password });
      console.log("Login successful!" , login);
      // Navigate to the chat dashboard on successful login
      navigate("/chat");
    } catch (err) {
      // Handle login errors
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {/* Display error message if there's an error */}
        {error && <p className="error-message">{error}</p>}

        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p>
        Forgot password? <a href="/forgot-password">Reset it here</a>
      </p>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default LoginPage;
