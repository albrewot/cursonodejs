const express = require("express");
const router = express.Router();
const { isAuth, goHome, userInfo } = require("../middlewares/authGuard");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

module.exports = app => {
  app.use(userInfo);

  app.get("/", (req, res, next) => {
    res.redirect("home");
  });

  //locahost:4000/api/users/*
  app.use("/api/users", userController);

  //locahost:4000/api/posts/*
  app.use("/api/auth", authController);

  app.get("/register", goHome, (req, res, next) => {
    res.render("register");
  });
  app.get("/login", goHome, (req, res, next) => {
    res.render("login");
  });
  app.get("/home", isAuth, (req, res, next) => {
    const { user } = res.locals;
    console.log(req.session.userId);

    res.render("home", user);
  });

  app.use(router);
  //Manejar cuando una ruta no existe
  app.use((req, res, next) => {
    res.status(404).json({
      message: `Error 404 - La ruta de acceso [${
        req.url
      }] no existe en el servidor`,
      code: 404
    });
  });
};
