import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

// imports routes

import userRouter from "./routes/user.routes.js";
import chatRouter from "./routes/chat.routes.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});



// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || "*", credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes declaration

app.use("/api/v1/users", userRouter);
app.use("/api/v1/chat", chatRouter);

// Socket.IO setup
io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  socket.on("sendMessage", (message) => {
    socket.broadcast.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
  });
});

export { app, server };
