const users = [];

module.exports = (socket, io) => {
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
    console.log(socket);
    console.log(room);

    socket.join(room);
    socket.room = room;
    socket.emit("JOINED_ROOM", room);
    console.log(`Socket ${room}`);
  });

  socket.on("ROOM_MESSAGE", async info => {
    console.log(info);
    console.log(socket.rooms);
    console.log("variable room", socket.room);
    io.sockets.to(info.room).emit(info.room, info);
  });

  //Cuando un client se desconecta del socket
  socket.on("disconnect", function () {
    console.log(`Socket: ${socket.id} se ha desconectado`);
  });
};
