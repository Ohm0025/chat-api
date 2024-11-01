const sendMessage = (socket, io, message) => {
  console.log("send message at : " + message);
  io.emit("message", "sample message");
};

module.exports = sendMessage;
