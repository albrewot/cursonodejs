const express = require("express")
const router = express.Router();

const userController = require("../controllers/userController");

module.exports = (app) => {
    app.get("/", (req, res, next) => {
        res.json({ message: "Esta es la ruta raiz de nuestro servidor" })
    });

    //locahost:4000/api/users/*
    app.use("/api/users", userController)

    //locahost:4000/api/posts/*
    // app.use("/api/posts", postController)

    app.use(router);
    //Manejar cuando una ruta no existe
    app.use((req, res, next) => {
        res.status(404).json({ message: `Error 404 - La ruta de acceso [${req.url}] no existe en el servidor`, code: 404 })
    })
}