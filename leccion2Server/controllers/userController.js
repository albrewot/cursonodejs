const express = require("express");
const router = express.Router();
const { checkJWT } = require("../middlewares/authGuard");

//Importar los servicios para el controlador o seccion de usuarios
const userService = require("../services/userService");

//Importar los middlewares para el controlador o seccion de usuarios

//Rutas de acceso para el seccion de usuarios
router.get('/', checkJWT, getUsers);
router.get("/find", findUserByName);
router.get("/:id", getUser);
router.post("/register", registerUser);
router.put("/edit/:id", editUser);
router.delete("/delete/:id", deleteUser);
router.put("/add_friends/:id", addFriends);
router.get("/get_friends/:id", getFriends);
router.get("/usuarios/lista", showUsers);

router.get("/hello/world", function(req,res,next) {
  res.render("hello", {username: req.query.name});
});

module.exports = router;

async function showUsers(req, res, next){
  try {
    const users = await userService.getUsers();
    res.render("userlist", { users });
  } catch (error) {
    next(error);
  }

}

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

async function getUsers(req,res, next){
  try{
  const users = await userService.getUsers();

  res.json({
    message: "Se accedio al metodo de obtener todos los usuarios",
    data: users
  });

  }catch(error){
    next(error)
  }
}

async function registerUser(req, res, next) {
  console.log(req.body);
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

    const { params, body } = req;

    const response = await userService.addFriends(params.id, body);
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
