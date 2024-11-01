require("dotenv").config();

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const corsOption = require("./configs/cors.config");
const { createNewMessage } = require("./fileTest/handleSampleDBjson");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.ENV === "dev" ? "*" : process.env.BASE_URL,
    methods: ["GET", "POST"],
  },
});

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on("connection", async (socket) => {
  console.log("User connected : ", socket.id);

  socket.on("join", async (username, content) => {
    try {
      // createNewMessage(username, content);
      console.log("user joined at socket on" + content);

      io.emit("userJoined", username);

      console.log("user joined at io emit");

      socket.emit("loadMessage", "hello from server");

      io.emit("activeUsers", "list active user");
    } catch (err) {
      console.error("Error in join event " + err);
    }
  });

  socket.on("sendMessage", async (message) => {
    try {
      console.log("send message at socket on");

      io.emit("message", "sample message");
    } catch (err) {
      console.error("Error in sendMessage event : " + err);
    }
  });

  socket.on("disconnect", async () => {
    try {
      console.log("disconnect at socket on");

      io.emit("userLeft", "user left at io emit");
    } catch (err) {
      console.error("Error in disconnect event : " + err);
    }
  });
});

server.listen(process.env.PORT, () => {
  console.log("server run on port : " + process.env.PORT);
});
