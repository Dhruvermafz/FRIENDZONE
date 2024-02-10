const socket = require("socket.io");
require("dotenv").config();
let io;
let users = [];
let admins = [];

const initializeSocketIO = (server) => {
  io = socket(server, {
    cors: {
      origin: process.env.API_BASE_URL,
    },
  });

  io.on("connection", (socket) => {
    console.log("user connected (socket)");

    socket.on("disconnect", () => {
      console.log("user Disconnected (d socket)");
    });
  });
};

const getIO = () => io;

module.exports = { initializeSocketIO, getIO };
