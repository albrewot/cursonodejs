const userService = require("../services/userService");

const isAuth = (req, res, next) => {
  console.log("isAuth middleware");
  console.log(req.session.userId);
  !req.session.userId ? res.redirect("/login") : next();
};

const goHome = (req, res, next) => {
  console.log("goHome middleware", req.session.userId);
  req.session.userId ? res.redirect("/home") : next();
};

const userInfo = async (req, res, next) => {
  const { userId } = req.session;
  if (userId) {
    res.locals.user = await userService.getUser(userId);
  }
  next();
};

module.exports = {
  isAuth,
  goHome,
  userInfo
};
