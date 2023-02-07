import msjModel from "../../models/msjModel.js";

class Mensaje{
    async save(msj) {
        try {
            await msjModel.create(msj);
            const message = await msjModel.find(msj);
            return message
        } catch (error) {
            return console.log(error);
        }
    }
    async getAll(){
        try {
            return await msjModel.find({});
        } catch (error) {
            return error;
        }
    }
}
export default Mensaje;