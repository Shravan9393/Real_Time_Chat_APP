// import React, { useState } from "react";
// import "../styles/auth.css";

// const ForgotPasswordPage = () => {
//   const [email, setEmail] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you can add logic to handle password reset
//     console.log({ email });
//   };

//   return (
//     <div className="auth-container">
//       <h2>Forgot Password</h2>
//       <form onSubmit={handleSubmit} className="auth-form">
//         <label>Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <button type="submit">Reset Password</button>
//       </form>
//       <p>
//         Remembered your password? <a href="/login">Login here</a>
//       </p>
//     </div>
//   );
// };

// export default ForgotPasswordPage;
