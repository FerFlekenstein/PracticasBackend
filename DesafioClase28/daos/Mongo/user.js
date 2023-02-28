import userModel from "../../models/userModel.js";

class User{
    async save(user) {
        try {
            await userModel.create(user);
            const userDB = await userModel.find(user);
            return userDB
        } catch (error) {
            return console.log(`Error en User.save ${error}`);
        }
    }
    async getBy(params){
        try {
            return await userModel.findOne(params)
        } catch (error) {
            console.log(error);
        }
    }
    async getAll(){
        try {
            return await userModel.find({});
        } catch (error) {
            return error;
        }
    }
}
export default User;