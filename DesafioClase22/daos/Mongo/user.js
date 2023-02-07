import userModel from "../../models/userModel.js";

class User{
    async save(user) {
        try {
            await userModel.create(user);
            const usr = await userModel.find(user);
            return usr
        } catch (error) {
            return console.log(error);
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