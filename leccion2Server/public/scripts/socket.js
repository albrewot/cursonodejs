//Socket
const socket = io.connect("http://localhost:4001");

let user;
let room = 0;

socket.on("CONNECTED", data => console.log(data));

socket.on("USER_CONNECTED", data => console.log(data));

socket.on("USER_SET", data => {
  user = data.username;
  console.log(user);
  document.body.innerHTML = `
    <h2>${user}</h2>
    <input type = "text" id = "message">
    <button type = "button" name = "button" onclick = "sendMessage()">Send</button>\
    <div id = "message-container"></div>
    <br>
    <input type="button" value="Room 1" name="room" id="room1" onclick="joinRoom('room1')">
    <input type="button" value="Room 2" name="room" id="room2" onclick="joinRoom('room2')">`;
});

socket.on("USER_EXISTS", response => {
  alert(response);
});

socket.on("NEW_MESSAGE", function(data) {
  if (user) {
    document.getElementById("message-container").innerHTML +=
      "<p><b>" + data.user + "</b>: " + data.message + "</p>";
  }
});

socket.on("room1", async info => {
  console.log(info);
  document.getElementById("message-container").innerHTML +=
    "<p style='color:red'><b>" + info.user + "</b>: " + info.message + "</p>";
});

socket.on("room2", async info => {
  console.log(info);
  document.getElementById("message-container").innerHTML +=
    "<p style='color:blue'><b>" + info.user + "</b>: " + info.message + "</p>";
});

socket.on("JOINED_ROOM", sala => {
  console.log(sala, room);
  console.log("Te uniste al room " + sala);
  room = sala;
});

const boton = document.getElementById("start");

boton.addEventListener("click", () => setUserName());

//Funciones

function setUserName() {
  socket.emit("SET_USERNAME", document.getElementById("user").value);
}

function sendMessage() {
  console.log(room);
  const msg = document.getElementById("message").value;
  if (msg && (room != "room1" && room != "room2")) {
    console.log("nor");
    socket.emit("NEW_MESSAGE", { message: msg, user });
  } else {
    console.log("r");
    socket.emit("ROOM_MESSAGE", { message: msg, room, user });
  }
}

function joinRoom(room) {
  socket.emit(`JOIN_ROOM`, room);
}
