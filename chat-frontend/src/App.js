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

const ProtectedRoute = ({ element, redirectTo, reverse = false }) => {
  const { user } = useContext(AuthContext);

  // Handle reverse condition for ProtectedRoute
  if (reverse) {
    return user ? <Navigate to={redirectTo} /> : element;
  }
  // Default ProtectedRoute check for authenticated user
  return user ? element : <Navigate to={redirectTo} />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={<ChatDashboard />}
                  redirectTo="/register"
                />
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
                <ProtectedRoute
                  element={<LoginPage />}
                  redirectTo="/"
                  reverse
                />
              }
            />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/chat"
              element={
                <ProtectedRoute
                  element={<ChatDashboard />}
                  redirectTo="/login"
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute element={<ProfilePage />} redirectTo="/login" />
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
