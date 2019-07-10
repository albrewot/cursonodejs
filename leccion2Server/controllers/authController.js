const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { isAuth, goHome } = require("../middlewares/authGuard");
const userService = require("../services/userService");

router.post("/login", goHome, login);
router.get("/logout", isAuth, logout);
router.post('/token', getAccessToken)

module.exports = router;

async function getAccessToken(req,res, next){

  const { username, password } = req.body;
  
  try{
    if (username && password) {
      const user = await userService.findUserByUsername(username);
      if (user) {
        const hash = await bcrypt.compare(password, user.password);
        if (hash) {
          const { JWT_SECRET, JWT_EXPIRE_AT } = process.env;
          const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: JWT_EXPIRE_AT });

          res.json({
            message: "Se accedio al método de solicitud de token",
            token,
          });
        } else {
          throw { error: "Contraseña incorrecta" };
        }
      }
    }

  } catch(err){

  }

}

async function login(req, res, next) {
  console.log("LOGIN");
  console.log(req.session);
  const { username, password } = req.body;
  try {
    if (username && password) {
      console.log(username, password);
      const user = await userService.findUserByUsername(username);
      if (user) {
        console.log("passwords", password, user.password);
        const hash = await bcrypt.compare(password, user.password);
        if (hash) {
          console.log("Entro a guardar userId");
          req.session.userId = user.id;
          return res.redirect("/home");
        } else {
          throw { error: "Contraseña incorrecta" };
        }
      }
    }
  } catch (err) {
    next(err);
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
    res.redirect('/login')
  });
}
