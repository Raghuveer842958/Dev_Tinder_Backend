const socket = require("socket.io");

const initilizeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    //handle events
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = [userId, targetUserId].sort().join("$");
      console.log(`${firstName} created this room : ${roomId}`);
    });

    socket.on("sendMessage", ({ firstName, userId, targetUserId, text }) => {
      const roomId = [userId, targetUserId].sort().join("$");
      console.log(firstName + ": " + text);
      io.to(roomId).emit("messageRecived", { firstName, text });
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initilizeSocket;
