const userService = require("../services/userService");
const jwt = require('jsonwebtoken');

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

const checkJWT = (req, res, next ) => {
  const token = req.header('Authorization');
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    next();
  }catch(error){
    return res.status(401).json({
      status: 401,
      message: "Ocurrió un error al verificar token",
      data: error.message
  });
}


}

module.exports = {
  isAuth,
  goHome,
  userInfo,
  checkJWT
};
