const socketIO = require("socket.io");
const express = require("express");
const http = require("http");
const app = express();
require("dotenv").config();

const server = http.createServer(app);

// Socket.IO Configuration
const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

const user = {};

io.on("connection", (socket) => {
  console.log("user connected ", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== "undefined") user[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(user));

  socket.on("sendMessage", (message) => {
    console.log("sendMessage", user[userId], message);
    Object.values(user).forEach((receiver) => {
      if (receiver !== user[userId]) {
        console.log("receiver", receiver);
        io.to(receiver).emit("receiveMessage", message);
      }
    });
  });

  socket.on("typing", (sender) => {
    Object.values(user).forEach((receiver) => {
      if (receiver !== user[userId]) {
        io.to(receiverSocketId).emit("typing", sender);
      }
    });
  });

  socket.on("stopTyping", (sender) => {
    Object.values(user).forEach((receiver) => {
      if (receiver !== user[userId]) {
        io.to(receiverSocketId).emit("typing", sender);
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected ", socket.id);
    delete user[userId];
    io.emit("getOnlineUsers", Object.keys(user));
  });
});

module.exports = { server, app, io };
