const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/leccion", {
    useCreateIndex: true,
    useNewUrlParser: true
})

mongoose.Promise = global.Promise;

module.exports = {
    User: require("../models/User")
}