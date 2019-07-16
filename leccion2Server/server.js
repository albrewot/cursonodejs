// const http = require("http");

// http.createServer((request, response) => {
//     response.writeHead(200, { "Content-Type": "text/html" });
//     response.write("Hola mundo");
//     response.end();
// }).listen(4000, () => { console.log("Servidor esta escuchando en el puerto 4000") });
const path = require("path");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io").listen(server);
const bodyParser = require("body-parser");
const session = require("express-session");
const errorHelper = require("./middlewares/errorHelper");
const routes = require("./routes");
const edge = require("express-edge");
const socketManager = require("./socket/socketManager");
require("dotenv").config();

//Socket.io
// namespaces
// const externo = io.of("/externo");
// externo.on("connection", socket => {
//   console.log(`Socket ${socket.id} se ha conectado ha externo`);
// });
io.on("connection", socket => socketManager(socket, io));

//Middlewares globales

app.use(
  session({
    name: "sid",
    saveUninitialized: false,
    resave: false,
    secret: "SECRET_SESSION_KEY",
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      sameSite: true,
      secure: process.env.NODE_ENV === "production"
    }
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(edge);
app.use(express.static(path.join(__dirname, "public")));
app.set("views", `${__dirname}/views`);

//Invocacion a las rutas del servidor
routes(app);

//Manejador de errores del servidor
app.use(errorHelper);

server.listen(4001, () => {
  console.log("Servidor esta escuchando en el puerto 4001");
});
