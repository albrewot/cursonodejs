const db = require("../config/db");

const User = db.User;

class UserService {
    async getUser(id) {
        try {
            console.log("id", id);
            const user = await User.findById(id ).select("-lastname").populate("friends");
            console.log("respuesta de base de datos", user)
            return user
        } catch (err) {
            throw err
        }
    }

    async registerUser(params){
        try{
            
            const user = new User(params);
            user.save();
        }catch(err){
            throw err
        }
    }

    async updateUser(params){
        const user = await User.find();
        user.toObject()
        Object.assign(user, { name: params.name})
    }

    async delete(params){
        
        User.deleteById(id)
    }
}

module.exports = new UserService();