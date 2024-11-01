require("dotenv").config();

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const corsOption = require("./configs/cors.config");
const { createNewMessage } = require("./fileTest/handleSampleDBjson");
const selectUserToChat = require("./socketEvents/selectUser");
const sendMessage = require("./socketEvents/sendMessage");

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

io.on("connect", async (socket) => {
  console.log("User connected : ", socket.id);

  socket.on("selectUserToChat", (username) =>
    selectUserToChat(socket, io, username)
  );

  socket.on("sendMessage", (message) => sendMessage(socket, io, message));

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
