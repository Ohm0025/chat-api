const selectUserToChat = (socket, io, username) => {
  try {
    console.log("selected user : " + username);
    io.emit("getOldMessages", "old message with " + username);
  } catch (err) {
    console.error("Error in join event " + err);
  }
};

module.exports = selectUserToChat;
