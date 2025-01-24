// import dotenv from "dotenv";
// import { app, server } from "./app.js";
// import connectDB from "./db/index.js";


// dotenv.config({
//   path: "./.env",
// });

// connectDB()
// .then(()=>{
//     server.listen(process.env.PORT || 5000, ()=>{
//         console.log(`Server is running at port : ${process.env.PORT}`);
//     })
// })
// .catch((err) => {
//     console.log("Mongo db connection failed !!!",err)
// })


import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import path from "path";

// Import routes
import userRouter from "./routes/user.routes.js";
import chatRouter from "./routes/chat.routes.js";
import messageRouter from "./routes/message.routes.js";

dotenv.config({
  path: "./.env",
});



const app = express();

const server = http.createServer(app);

connectDB()
  .then(() => {
    server.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo db connection failed !!!", err);
  });


// Setup Socket.IO
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});


// Middleware
const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsConfig));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

// Routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/message", messageRouter);


// Socket.IO connection handler
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle user setup
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  // Handle joining a chat room
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // Handle typing events
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // Handle new messages
  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });

  // Clean up after a user leaves
  socket.off("setup", (userData) => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});



