import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Navbar from "./components/common/navbar";
import RegisterPage from "./components/auth/RegisterPage";
import LoginPage from "./components/auth/loginPage";
import ForgotPasswordPage from "./components/auth/ForgotPasswordPage";
import ChatDashboard from "./components/chat/chatDashboard";
import ProfilePage from "./components/profile/profilePage";

function App() {
  const { user } = useContext(AuthContext); // Destructure user from AuthContext

  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="container">
          <Routes>
            {/* If the user is already logged in, go directly to the chat dashboard */}
            <Route
              path="/"
              element={user ? <ChatDashboard /> : <Navigate to="/register" />}
            />
            <Route
              path="/register"
              element={user ? <Navigate to="/" /> : <RegisterPage />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <LoginPage />}
            />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/chat"
              element={user ? <ChatDashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={user ? <ProfilePage /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
