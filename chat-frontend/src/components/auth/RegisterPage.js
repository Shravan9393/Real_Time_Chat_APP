// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// // import { AuthContext } from "../../context/AuthContext";


// const RegisterPage = () => {
//   const [show, setShow] = useState(false);
//   const [email, setEmail] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [username, setUsername] = useState("");
//   // const [confirmpassword, setConfirmpassword] = useState("");
//   const [password, setPassword] = useState("");
//   const [avatar, setAvatar] = useState(null);
//   const [coverImage, setCoverImage] = useState(null);
//   const [error, setError] = useState("null");
//   const [loading, setLoading] = useState(false);
//   const [notification, setNotification] = useState(null);

//   const navigate = useNavigate();

//   const submitHandler = async (e) => {
//     e.preventDefault(); // Prevent form submission from reloading the page
//     setError(null); // Clear previous errors
//     setLoading(true);
//     setNotification(null);

//     if (
//       !fullName ||
//       !username ||
//       !email ||
//       !password ||
//       // !confirmpassword ||
//       !avatar ||
//       !coverImage
//     ) {
//       setNotification({
//         message: "Please fill all the fields",
//         type: "warning",
//       });
//       setLoading(false);
//       return;
//     }

//     // if (password !== confirmpassword) {
//     //   setNotification({ message: "Passwords do not match", type: "error" });
//     //   setLoading(false);
//     //   return;
//     // }

//     try {
//       const formData = new FormData();
//       formData.append("fullName", fullName);
//       formData.append("username", username);
//       formData.append("email", email);
//       formData.append("password", password);
//       formData.append("avatar", avatar);
//       formData.append("coverImage", coverImage);

//       const config = {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       };
//       console.log("formData", formData);
//       const { data } = await axios.post(
//         "http://localhost:5000/api/v1/users/register",
//         formData,
//         config
//       );
//       console.log("data in register user", data);
//       setNotification({ message: "Registration successful!", type: "success" });
//       localStorage.setItem("userInfo", JSON.stringify(data));
//       // setLoading(false);

//       // Navigate to login page after 1 second (optional delay)
//       // setTimeout(() => {
//       navigate("/login");
//       // }, 1000);
//     } catch (error) {
//       setNotification({
//         message: error.response?.data?.message || "Something went wrong",
//         type: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const Notification = ({ message, type }) => {
//     if (!message) return null;

//     const style = {
//       padding: "10px",
//       margin: "10px 0",
//       backgroundColor:
//         type === "error"
//           ? "#ffcccc"
//           : type === "success"
//           ? "#ccffcc"
//           : "#fff4cc",
//       color:
//         type === "error"
//           ? "#ff0000"
//           : type === "success"
//           ? "#008000"
//           : "#996600",
//       border: `1px solid ${
//         type === "error"
//           ? "#ff0000"
//           : type === "success"
//           ? "#008000"
//           : "#996600"
//       }`,
//       borderRadius: "5px",
//     };

//     return <div style={style}>{message}</div>;
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
//       <h2>Register</h2>
//       {/* {notification && (
//         <Notification message={notification.message} type={notification.type} />
//       )} */}
//       {notification && (
//         <Notification message={notification.message} type={notification.type} />
//       )}

//       <form onSubmit={submitHandler}>
//         <div style={{ marginBottom: "15px" }}>
//           <label
//             htmlFor="fullName"
//             style={{ display: "block", marginBottom: "5px" }}
//           >
//             Full Name
//           </label>
//           <input
//             id="fullName"
//             type="text"
//             placeholder="Enter your full name"
//             onChange={(e) => setFullName(e.target.value)}
//             style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
//           />
//         </div>

//         <div style={{ marginBottom: "15px" }}>
//           <label
//             htmlFor="username"
//             style={{ display: "block", marginBottom: "5px" }}
//           >
//             Username
//           </label>
//           <input
//             id="username"
//             type="text"
//             placeholder="Enter your username"
//             onChange={(e) => setUsername(e.target.value)}
//             style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
//           />
//         </div>

//         <div style={{ marginBottom: "15px" }}>
//           <label
//             htmlFor="email"
//             style={{ display: "block", marginBottom: "5px" }}
//           >
//             Email Address
//           </label>
//           <input
//             id="email"
//             type="email"
//             placeholder="Enter your email"
//             onChange={(e) => setEmail(e.target.value)}
//             style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
//           />
//         </div>

//         <div style={{ marginBottom: "15px" }}>
//           <label
//             htmlFor="password"
//             style={{ display: "block", marginBottom: "5px" }}
//           >
//             Password
//           </label>
//           <input
//             id="password"
//             type={show ? "text" : "password"}
//             placeholder="Enter password"
//             onChange={(e) => setPassword(e.target.value)}
//             style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
//           />
//           <button
//             type="button"
//             onClick={() => setShow(!show)}
//             style={{
//               display: "block",
//               marginTop: "10px",
//               background: "none",
//               border: "none",
//               color: "blue",
//               cursor: "pointer",
//             }}
//           >
//             {show ? "Hide" : "Show"}
//           </button>
//         </div>

//         <div style={{ marginBottom: "15px" }}>
//           <label
//             htmlFor="confirmpassword"
//             style={{ display: "block", marginBottom: "5px" }}
//           >
//             Confirm Password
//           </label>
//           {/* <input
//             id="confirmpassword"
//             type="password"
//             placeholder="Confirm password"
//             onChange={(e) => setConfirmpassword(e.target.value)}
//             style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
//           /> */}
//         </div>

//         <div style={{ marginBottom: "15px" }}>
//           <label
//             htmlFor="avatar"
//             style={{ display: "block", marginBottom: "5px" }}
//           >
//             Upload Avatar
//           </label>
//           <input
//             id="avatar"
//             type="file"
//             accept="image/*"
//             onChange={(e) => setAvatar(e.target.files[0])}
//           />
//         </div>

//         <div style={{ marginBottom: "15px" }}>
//           <label
//             htmlFor="coverImage"
//             style={{ display: "block", marginBottom: "5px" }}
//           >
//             Upload Cover Image
//           </label>
//           <input
//             id="coverImage"
//             type="file"
//             accept="image/*"
//             onChange={(e) => setCoverImage(e.target.files[0])}
//           />
//         </div>

//         <button
//           type="submit"
//           style={{
//             width: "100%",
//             padding: "10px",
//             background: "blue",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//             marginBottom: "10px",
//           }}
//           disabled={loading}
//         >
//           {loading ? "Loading..." : "Sign Up"}
//         </button>
//       </form>
//       <div style={{ textAlign: "center", marginTop: "10px" }}>
//         Already registered? <a href="/login">Login</a>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";

import API from "../../utils/api.js";
// import "./auth.css";

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