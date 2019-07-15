const users = [];

module.exports = (socket, io) => {
  socket.room = socket.id;
  socket.emit("CONNECTED", `Te has conectado en el socket: ${socket.id}`);

  socket.broadcast.emit(
    "USER_CONNECTED",
    `El cliente con socket id: ${socket.id} se ha conectado`
  );

  socket.on("SET_USERNAME", username => {
    if (!users.includes(username)) {
      users.push(username);
      console.log("USER_SET", users);
      socket.emit("USER_SET", { username });
    } else {
      socket.emit(
        "USER_EXISTS",
        `Nombre de usuario [${username}] ya esta en uso`
      );
    }
  });

  socket.on("NEW_MESSAGE", message => {
    io.sockets.emit("NEW_MESSAGE", message);
  });

  socket.on("JOIN_ROOM", room => {
    socket.leave(socket.room);
    socket.join("room" + room);
    socket.room = "ROOM-" + room;
    socket.emit("JOINED_ROOM", room);
    console.log(`ROOM-${room}`);
  });

  socket.on("ROOM_MESSAGE", async info => {
    console.log(info);
    console.log(socket.rooms);
    io.sockets.in("room" + info.room).emit(`ROOM_MESSAGE-${info.room}`, info);
  });

  //Cuando un client se desconecta del socket
  socket.on("disconnect", function() {
    console.log(`Socket: ${socket.id} se ha desconectado`);
  });
};
