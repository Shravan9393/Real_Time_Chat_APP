import React, {  useState, useContext } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatState } from "../../context/chatContext";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // For error handling
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const navigate = useNavigate();
  const { setUser } = ChatState();

  const submitHandler = async (e) => {
    e.preventDefault(); // Prevent form default submission
    setError(null); // Clear previous errors
    setLoading(true); // Start loading
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
      // const config = {
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      // };

      // const { data } = await axios.post(
      //   "http://localhost:5000/api/v1/users/login",
      //   { email, password },
      //   config
      // );

      await login({ email, password });
      console.log("login successful");
      // console.log("the data before set user", data);
      setNotification({ message: "Login Successful", type: "success" });
      // setUser(data);
      // console.log("the data after set user", data);
      // localStorage.setItem("userInfo", JSON.stringify(data));
      // setLoading(false);
      navigate("/chat");
    } catch (error) {
      setError(error.message || "Invalid credentials. Please try again");
      setNotification({
        message: `Error Occurred: ${error.response.data.message}`,
        type: "error",
      });
      
    }finally{
      setLoading(false);
    }
  };

  const Notification = ({ message, type }) => {
    if (!message) return null;
    const style = {
      padding: "10px",
      margin: "10px 0",
      color: type === "error" ? "red" : type === "success" ? "green" : "orange",
      border: `1px solid ${
        type === "error" ? "red" : type === "success" ? "green" : "orange"
      }`,
    };
    return <div style={style}>{message}</div>;
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}

      <form onSubmit={submitHandler}>
        {" "}
        {/* Wrap the form elements */}
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="Enter Your Email Address"
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Password
          </label>
          <div style={{ position: "relative" }}>
            <input
              id="password"
              type={show ? "text" : "password"}
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                boxSizing: "border-box",
              }}
            />
            <button
              onClick={() => setShow(!show)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button
          type="submit" // Change to type submit for form handling
          style={{
            width: "100%",
            padding: "10px",
            background: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginBottom: "10px",
          }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      <button
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
        style={{
          width: "100%",
          padding: "10px",
          background: "red",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Get Guest User Credentials
      </button>

      <div style={{ textAlign: "center", marginTop: "10px" }}>
        New user? <a href="/register">Register here</a>
      </div>
    </div>
  );
};

export default LoginPage;
