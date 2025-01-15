import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";

import API from "../../utils/api.js";
import "./auth.css";

const RegisterPage = () => {
  // const  login  = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start the loader
    console.log("Submitting registration form...");
    const formData = new FormData();
    formData.append("email", email);
    formData.append("fullName", fullName);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("avatar", avatar);
    formData.append("coverImage", coverImage);

    try {
      console.log("Submitting registration form...");
      console.log("Form Data:", Object.fromEntries(formData.entries()));

      const response = await API.post("/v1/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("registeration form submitted");
      alert("registeration form submitted");
      console.log("Server Response:", response.data); // Log the response for debugging
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err.response || err.message);
      alert(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false); // Stop the loader
    }
  };

  return (
    <div className="auth-container">
      {loading ? (
        <div className="loader">Loading...</div> // Display loader while loading
      ) : (
        <>
          <h2>Register</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Avatar</label>
            <input
              type="file"
              onChange={(e) => setAvatar(e.target.files[0])}
              required
            />
            <label>Cover Image</label>
            <input
              type="file"
              onChange={(e) => setCoverImage(e.target.files[0])}
              required
            />
            <button type="submit">Register</button>
          </form>
          <p>
            Already have an account? <a href="/login">Login here</a>
          </p>
        </>
      )}
    </div>
  );
};

export default RegisterPage;
