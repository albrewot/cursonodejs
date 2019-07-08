const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "ocurrio un error", info: err });
};

module.exports = errorHandler;
