import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

// Import routes
import userRouter from "./routes/user.routes.js";
import chatRouter from "./routes/chat.routes.js";
import messageRouter from "./routes/message.routes.js";

const app = express();
const server = http.createServer(app);

// Setup Socket.IO with CORS and path configuration
const io = new Server(server, {
  path: "/socket.io/", // Ensure this matches the client configuration
  cors: {
    origin: "http://localhost:3000", // Replace with your client origin
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || "*", credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/message", messageRouter);

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });

  socket.on("stopTyping", (room) => {
    socket.in(room).emit("stopTyping");
  });

  socket.on("new message", (newMessageRecieve) => {
    const chat = newMessageRecieve.chatId;

    if (!chat.users) {
      console.log("Chat users not defined");
      return;
    }

    chat.users.forEach((user) => {
      if (user._id === newMessageRecieve.sender._id) {
        return;
      }

      socket.in(user._id).emit("new message", newMessageRecieve);
    });
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

export { app, server };
