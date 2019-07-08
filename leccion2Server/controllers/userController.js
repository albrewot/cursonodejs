const express = require("express");
const router = express.Router();

//Importar los servicios para el controlador o seccion de usuarios
const userService = require("../services/userService");

//Importar los middlewares para el controlador o seccion de usuarios

//Rutas de acceso para el seccion de usuarios
router.get("/find", findUserByName);
router.get("/:id", getUser);
router.post("/register", registerUser);
router.put("/edit/:id", editUser);
router.delete("/delete/:id", deleteUser);
router.put("/add_friends/:id", addFriends);
router.get("/get_friends/:id", getFriends);

module.exports = router;

async function getUser(req, res, next) {
  try {
    const response = await userService.getUser(req.params.id);
    res.json({
      message: "Se accedio al metodo de obtener un usuario",
      data: response
    });
  } catch (error) {
    next(error);
  }
}

async function registerUser(req, res, next) {
  try {
    const response = await userService.registerUser(req.body);
    res.json({
      message: "Se accedio al metodo de registro de usuario",
      data: response
    });
  } catch (error) {
    next(error);
  }
}

async function editUser(req, res, next) {
  try {
    const response = await userService.editUser(req.params.id, req.body);
    res.json({
      message: "Se accedio al metodo de editar usuario",
      data: response
    });
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const response = await userService.deleteUser(req.params.id);
    res.json({
      message: "Se accedio al metodo de eliminar un usuario",
      data: response
    });
  } catch (error) {
    next(error);
  }
}

async function addFriends(req, res, next) {
  try {
    const response = await userService.addFriends(req.params.id, req.body);
    res.json({
      message: "Se accedio al metodo de agregar amigos",
      data: response
    });
  } catch (error) {
    next(error);
  }
}

async function findUserByName(req, res, next) {
  try {
    const response = await userService.findUserByName(req.query.name);
    res.json({
      message: "Se accedio al metodo de buscar por nombre",
      data: response
    });
  } catch (error) {
    next(error);
  }
}

async function getFriends(req, res, next) {
  try {
    const response = await userService.getFriends(req.params.id);
    res.json({
      message: "Se accedio al metodo de obtener amigos",
      data: response
    });
  } catch (error) {
    next(error);
  }
}
