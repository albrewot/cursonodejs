const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const moment = require("")

//importacion de subdocumentos o documentos embebidos

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Falta la propiedad [username]"]
    },
    name: {
        type: String,
        required: [true, "Falta la propiedad [name]"]
    },
    lastname: [UserSchema],
    
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
    // createAt
});

UserSchema.set("toJSON", { virtuals: true });

module.export = mongoose.model("User", UserSchema);

