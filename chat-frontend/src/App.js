// import React, { useContext } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, AuthContext } from "./context/AuthContext";
// import Navbar from "./components/common/navbar";
// import RegisterPage from "./components/auth/RegisterPage";
// import LoginPage from "./components/auth/loginPage";
// import ChatDashboard from "./components/Pages/chatDashboard";

// // ProtectedRoute Component
// const ProtectedRoute = ({ element, redirectTo, reverse = false }) => {
//   const { user, loading } = useContext(AuthContext);
//   console.log("User in AuthContext, print from app.js file :", user, "loading:", loading); // Debugging 
//   if (loading) {
//     return <div>Loading...</div>; // Show a loading indicator while checking auth state
//   }

//   if (reverse) {
//     return user ? <Navigate to={redirectTo}  /> : element;
//   }
//   console.log("ProtectedRoute called: ", { user, redirectTo, reverse });

//   return user ? element : <Navigate to={redirectTo}  />;

  
// };

// function App() {
//   return (
//     <AuthProvider>
//       <div className="container">
//         <Navbar />
//         <Routes>
//         <Route
//               path="/"
//               element={
//                 <ProtectedRoute
//                   element={<ChatDashboard />}
//                   redirectTo="/register"
//                 />
//               }
//             />
//           {/* <Route path="/" element={<Navigate to="/register" replace />} /> */}
//           <Route
//             path="/register"
//             element={
//               <ProtectedRoute
//                 element={<RegisterPage />}
//                 redirectTo="/"
//                 reverse
//               />
//             }
//           />
//           {/* Login page route */}
//           <Route
//             path="/login"
//             element={
//               <ProtectedRoute
//                 element={<LoginPage />}
//                 redirectTo="/"
//                 reverse
//               />
//             }
//           />
//           {/* chat Dashboard page route */}
//           <Route
//             path="/chat"
//             element={
//               <ProtectedRoute element={<ChatDashboard />} redirectTo="/login" />
//             }
//           />
//           {/* Redirect unknown paths to RegisterPage */}
//           {/* <Route path="*" element={<Navigate to="/register" replace />} /> */}
//         </Routes>
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;








import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Navbar from "./components/common/navbar";
import RegisterPage from "./components/auth/RegisterPage";
import LoginPage from "./components/auth/loginPage";
import ChatDashboard from "./components/Pages/chatDashboard";

// ProtectedRoute Component
const ProtectedRoute = ({ element, redirectTo, reverse = false }) => {
  const { user, loading } = useContext(AuthContext);

  // Show a loading indicator while verifying auth state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Debugging user state
  console.log("ProtectedRoute:", { user, redirectTo, reverse });

  // Handle reverse route logic
  if (reverse) {
    return user ? <Navigate to={redirectTo} replace /> : element;
  }

  // Default behavior for authenticated routes
  return user ? element : <Navigate to={redirectTo} replace />;
};

function App() {
  return (
    <AuthProvider>
      <div className="container">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute element={<ChatDashboard />} redirectTo="/login" />
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute
                element={<RegisterPage />}
                redirectTo="/"
                reverse
              />
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute element={<LoginPage />} redirectTo="/" reverse />
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
