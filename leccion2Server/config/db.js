const mongoose = require("mongoose");

mongoose.connect("mongodb://nodejs:nodejs@localhost:27017/test", {
    useCreateIndex: true,
    useNewUrlParser: true
})

mongoose.Promise = global.Promise;

module.exports = {
    User: require("../models/User")
}