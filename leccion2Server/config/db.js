const mongoose = require("mongoose");
require('dotenv').config();

console.log(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/test`);

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/test`, {
  useCreateIndex: true,
  useNewUrlParser: true
});

mongoose.Promise = global.Promise;

module.exports = {
  User: require("../models/User")
};
