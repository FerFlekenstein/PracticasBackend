import prodModel from "../../models/prodModel.js";
class ProductosM{

    async save(obj) {
        try {
            await prodModel.create(obj);
            const prod = await prodModel.find(obj);
            return prod
        } catch (error) {
            return console.log(error);
        }
    }
    async getById(hash){
        try {
            return await prodModel.findById({_id: hash});
        } catch (error) {
            return error;
        }
    }
    async getAll(){
        try {
            return await prodModel.find({});
        } catch (error) {
            return error;
        }
    }
    async deleteById(hash){
        try {
            return await prodModel.deleteOne({_id: hash});
        } catch (error) {
            return error
        }
    }
    async deleteAll(){
        try {
            await prodModel.deleteMany({}); 
        } catch (error) {
            console.log(error);
        }
    }
    async update(obj){
        try {
            const {title, price, thumbnail, id} = obj;
            await prodModel.updateOne({_id : id}, {title, price, thumbnail})  
        } catch (error) {
            console.log(error);
        }
    }
}
export default ProductosM;