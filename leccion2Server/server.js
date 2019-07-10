// const http = require("http");

// http.createServer((request, response) => {
//     response.writeHead(200, { "Content-Type": "text/html" });
//     response.write("Hola mundo");
//     response.end();
// }).listen(4000, () => { console.log("Servidor esta escuchando en el puerto 4000") });

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const errorHelper = require("./middlewares/errorHelper");
const routes = require("./routes");
const edge = require("express-edge");
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
app.set("views", `${__dirname}/views`);

//Invocacion a las rutas del servidor
routes(app);

//Manejador de errores del servidor
app.use(errorHelper);

// app.get("/",(req, res, next) => {
//     console.log(req);
//     console.log(res);

//     res.send("Hola mundoSSS").status(200);
// })

// app.get("/usuarios", (req, res) => {
//     res.json({ message: "Se esta devolviendo un json", data: [{ data: 1 }, { data: 2 }] })
// })

// app.get("/prefiles", (req, res, next) => {
//     try {
//         throw "Este error se va a mostrar en consola"
//     } catch (error) {
//         next(error)
//     }
// })

// app.post("/json/:id", (req, res, next) => {
//     try {
//         console.log(req.body);
//         const { body } = req;
//         const response = acceso(body);
//         res.json(response)
//     } catch (error) {
//         next(error)
//         // console.log(error)
//     }
// })

// app.use(errorHelper);

// function acceso(request) {
//     return { data: request, message: "procesado" }

// }

app.listen(4001, () => {
  console.log("Servidor esta escuchando en el puerto 4001");
});
