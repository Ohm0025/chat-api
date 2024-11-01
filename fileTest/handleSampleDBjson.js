const fs = require("fs");
const pathToFolderLog = "/messageLog";

exports.createNewMessage = (username, content, recieve) => {
  if (fs.existsSync(pathToFolderLog + `/log_${username}`)) {
    console.log("exist user log");
  } else {
    const newLogFile = fs.writeFileSync(
      pathToFolderLog + `/log_${username}`,
      content,
      { flag: "a+" }
    );
    console.log(newLogFile);
  }
};
