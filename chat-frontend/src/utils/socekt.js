// src/utils/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  path: "/socket.io/", // Ensure this matches your backend configuration
  // transports: ["websocket"],
});

export default socket;
