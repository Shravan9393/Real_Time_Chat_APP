import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

// imports routes

import userRouter from "./routes/user.routes.js";
import chatRouter from "./routes/chat.routes.js";
import messageRouter from "./routes/message.routes.js";


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
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
app.use("/api/v1/message", messageRouter);

// Socket.IO setup
io.on("connection", (socket) => {
  
  socket.on('setup', (userData) => {
    socket.join(userData._id);
    socket.emit('connected')
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
    var chat = newMessageRecieve.chatId;
    if(!chat.users){
      console.log("chats. users is not defined")
    }

    chat.users.forEach((user) => {
      if(user._id == newMessageRecieve.sender._id){
        return;
      }

      socket.in(user._id).emit("new message", newMessageRecieve);
    });
  });
});

export { app, server };
