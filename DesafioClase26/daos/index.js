import mongoose from "mongoose";
import User from "./Mongo/user.js";
//true --> MongoDB  false --> FileSystem
const PERSISTENCIA = true;
if(PERSISTENCIA){
    mongoose.connect('mongodb+srv://dbEcomm:35470482@clusterfer.vszgiqb.mongodb.net/?retryWrites=true&w=majority',{serverSelectionTimeoutMS: 5000}, (error) => {
        if(error) console.log(error);
        else console.log("Conectado a MongoDB Atlas");
    })
}
const rutaProd = PERSISTENCIA? "./Mongo/productos.js" : "./FileSystem/productos.js";
const { default: Productos} = await import(`${rutaProd}`);
export const productos = new Productos();
const rutaCart = PERSISTENCIA? "./Mongo/carrito.js" : "./FileSystem/carrito.js";
const { default: Carrito} = await import(`${rutaCart}`);
export const carrito = new Carrito();
export const userService = new User();