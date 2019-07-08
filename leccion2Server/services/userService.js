const db = require("../config/db");

const User = db.User;

class UserService {
  async getUser(id) {
    try {
      //findById es un metodo que nos permite buscar un documento segun su id
      //para busquedas mas complejas usar find() que recibira como parametro un objeto que sera la estructura a buscar
      const user = await User.findById(id).select("name lastname username");
      console.log("usuario en db", user);
      if (!user) {
        throw { data: "usuario no encontrado" };
      }
      return user;
    } catch (error) {
      //recuerden que este error sera redirigido al catch padre en el controlador y luego dirigido al middleware para capturar errores
      throw error;
    }
  }

  async findUserByName(name) {
    console.log(name);
    try {
      const user = await User.find({ name: new RegExp(name, "i") }).select(
        "name lastname username"
      );
      if (!user) {
        throw { info: `ningun usuario con nombre [${name}]` };
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async registerUser(params) {
    try {
      const user = new User(params);
      //el metodo save de un modelo u objeto de mongodb va a guardar el documento en su respectiva coleccion
      return await user.save();
    } catch (error) {
      throw error;
    }
  }

  async editUser(id, params) {
    try {
      const user = await this.getUser(id);
      console.log("edit user", user);
      //Una forma de editar el documento de un usuario segun su id usando el metodo save()
      user.toObject();
      Object.assign(user, params);
      return await user.save();
      // Otra forma de editar usando updateOne()
      // este metodo no retorna el documento a diferencia de save()
      // Tambien se puede utilizar findByIdAndUpdate() y asi evitar buscar el usuario usando el metodo getUser()
      // return await User.updateOne({ _id: id }, { $set: params });
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      // const user = await this.getUser(id);
      // console.log("delete user", user);

      // Eliminando un usuario usando metodo remove()
      // await User.remove({ _id: id });

      // Eliminando un suario usando el metodo findByIdAndDelete()
      // El cual primero busca un documento opor su id y lo elimina
      const deletedUser = await User.findByIdAndDelete(id).select(
        "name lastname username"
      );
      console.log("usuario eliminado", deletedUser);
      return { info: `usuario con id [${id}] fue eliminado con exito` };
    } catch (error) {
      throw error;
    }
  }

  async addFriends(id, params) {
    try {
      let usersFound = [];
      const user = await User.findById(id).select("friends");
      for (let user of params.users) {
        const found = await this.getUser(user);
        if (found) {
          usersFound.push(found.id);
        }
      }
      user.toObject();
      Object.assign(user, { friends: [...user.friends, ...usersFound] });
      await user.save();
      return { info: "Usuarios agregados a la lista de amgios" };
    } catch (error) {
      throw error;
    }
  }

  async getFriends(id) {
    try {
      const friends = await User.findOne({ _id: id })
        .select("friends")
        .populate("friends", "name lastname username");
      console.log(friends);
      if (!friends) {
        throw { info: "usuario no existe" };
      }
      if (friends.friends.length == 0) {
        throw { info: "usuario no tiene amigos" };
      }
      return friends;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
