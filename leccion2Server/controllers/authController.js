const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { isAuth, goHome } = require("../middlewares/authGuard");
const userService = require("../services/userService");

router.post("/login", goHome, login);
router.get("/logout", isAuth, logout);

module.exports = router;

async function login(req, res, next) {
  console.log("LOGIN");
  console.log(req.session);
  const { username, password } = req.body;
  if (username && password) {
    const user = await userService.findUserByUsername(username);
    if (user) {
      console.log("passwords", password, user.password);
      const hash = await bcrypt.compare(password, user.password);
      if (hash) {
        console.log("Entro a guardar userId");
        req.session.userId = user.id;
        return res.redirect("/home");
      } else {
        next("Contraseña incorrecta");
      }
    }
  }
  return res.redirect("/login");
}

function logout(req, res, next) {
  console.log("LOGOUT");
  console.log(req.session);
  console.log(req.session.id);
  console.log(req.sessionID);
  req.session.destroy(err => {
    if (err) {
      res.redirect("/home");
    }
    res.clearCookie("sid");
  });
}
