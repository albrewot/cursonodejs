//Socket
const socket = io.connect("http://localhost:4001");

let user;
let room = socket.id;

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
    <input type="button" value="Room 1" name="room" id="room1" onclick="joinRoom(1)">
    <input type="button" value="Room 2" name="room" id="room2" onclick="joinRoom(2)">`;
});

socket.on("USER_EXISTS", response => {
  alert(response);
});

socket.on("NEW_MESSAGE", function(data) {
  if (user) {
    document.getElementById("message-container").innerHTML +=
      "<div><b>" + data.user + "</b>: " + data.message + "</div>";
  }
});

socket.on(`ROOM_MESSAGE-${room}`, async info => {
  console.log(info);
  document.getElementById("message-container").innerHTML +=
    "<div><b>" + info.user + "</b>: " + info.message + "</div>";
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
  const msg = document.getElementById("message").value;
  if (msg && (room != 1 && room != 2)) {
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
