const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Address = require("./Embebed/Address");

//importacion de subdocumentos o documentos embebidos

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Falta la propiedad [username]"]
  },
  password: {
    type: String,
    unique: true,
    require: [true, "Falta la propiedad [password]"]
  },
  name: {
    type: String,
    required: [true, "Falta la propiedad [name]"]
  },
  lastname: String,
  //Arreglo de Documentos address el cual es un subdocumento o documento embebido
  address: [Address],
  //Arreglo de referencias por ObjectId las cuales son Ids de usuarios, estos son documentos referenciados
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

UserSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", UserSchema);
