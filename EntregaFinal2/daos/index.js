import mongoose from "mongoose";
import { stringConn } from "./stringconn";
//true --> MongoDB  false --> FileSystem
const PERSISTENCIA = true;
if(PERSISTENCIA){
    mongoose.connect(stringConn,{serverSelectionTimeoutMS: 5000}, (error) => {
        if(error) console.log(error);
        else console.log("Conectado a MongoDB Atlas");
    })
}
const rutaProd = PERSISTENCIA? "./Mongo/productos.js" : "./FileSystem/productos.js";
const { default: Productos} = await import(`${rutaProd}`);
export const productos = new Productos;
const rutaCart = PERSISTENCIA? "./Mongo/carrito.js" : "./FileSystem/carrito.js";
const { default: Carrito} = await import(`${rutaCart}`);
export const carrito = new Carrito;