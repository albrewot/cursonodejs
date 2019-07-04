const express = require("express");
const router = express.Router();

//Importar los servicios para el controlador o seccion de usuarios
const userService = require("../services/userService");

//Importar los middlewares para el controlador o seccion de usuarios


//Rutas de acceso para el seccion de usuarios
router.get("/:id", getUser);


// router.get("/user/:id", getUserById)

module.exports = router;

async function getUser(req, res, next) {
    try {
        const response = await userService.getUser(req.params.id);
        res.json({ message: "Se accedio a la raiz de usuarios", data: response });
    } catch (err) {
        next(next)
    }
}




