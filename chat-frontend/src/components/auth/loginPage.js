import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatState } from "../../context/chatContext";
import "../styles/login.css";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const navigate = useNavigate();
  const { setUser } = ChatState();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setNotification({
        message: "Please fill all the fields",
        type: "warning",
      });
      setLoading(false);
      return;
    }

    try {
      await login({ email, password });
      console.log("login successful");
      setNotification({ message: "Login Successful", type: "success" });
      navigate("/chat");
    } catch (error) {
      setError(error.message || "Invalid credentials. Please try again");
      setNotification({
        message: `Error Occurred: ${error.response.data.message}`,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const Notification = ({ message, type }) => {
    if (!message) return null;
    return <div className={`notification notification-${type}`}>{message}</div>;
  };

  return (
    <div className="login-page">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <div className="container">
        <form onSubmit={submitHandler} className="login-container">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="Enter Your Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password">
              <input
                id="password"
                type={show ? "text" : "password"}
                value={password}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <button
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
          }}
          className="guest-credentials-button"
        >
          Get Guest User Credentials
        </button>

        <div className="register-link">
          New user? <a href="/register">Register here</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
