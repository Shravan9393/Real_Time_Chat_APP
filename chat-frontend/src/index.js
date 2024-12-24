import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // Import the AuthProvider

const root = ReactDOM.createRoot(document.getElementById("root"));

// Wrap the App component with AuthProvider
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
