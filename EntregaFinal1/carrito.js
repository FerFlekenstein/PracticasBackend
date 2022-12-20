import fs from "fs";
import CURRENT_DIR from "./utils.js";
import productos from "./contenedor.js";
class Carrito{
    constructor(){
        this.direccion = CURRENT_DIR + '/archivos/cart.json'
    }
    async getAll(){
        //verifico si existe la direccion (por ende el archivo) y devuelvo lo que tiene o un []
        if(fs.existsSync(this.direccion)){
            const info = await fs.promises.readFile(this.direccion, 'utf-8')
            const infoParseada = JSON.parse(info);
            return infoParseada
        }else{
            return []
        }
    }
    //crea un carrito y devuelve su id
    async createCart(){
        try {
            const info = await this.getAll()
            const cart = {
                timestamp: Date.now(),
            }
            cart.id = info.length === 0? 1 : info[info.length - 1].id + 1;
            cart.productos = [];
            info.push(cart);
            const infoJson = JSON.stringify(info, null, 2);
            await fs.promises.writeFile(this.direccion, infoJson)
            return cart.id
        } catch (error) {
            console.log(error);
        }
    }
    //vacía un carrito y lo elimina
    async deleteById(numero){
        try {
            const info = await this.getAll();
            //verifica si existe un cart con un id igual al numero pasado por parametro
            const hayCart = info.some((cart) => numero === cart.id);
            if(hayCart){
                //obtengo el id del cart y lo elimino del array
                const carro = info.find((cart) => numero === cart.id);
                const indice = info.indexOf(carro);
                info.splice(indice, 1);
                const infoJson = JSON.stringify(info, null, 2);
                await fs.promises.writeFile(this.direccion, infoJson);
            } else {
                console.log("no existe un carrito con ese numero de id");
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    }
    //lista todos los productos del carrito
    async getProductos(numero){
        try {
            const info = await this.getAll();
            //verifica si existe un cart con un id igual al numero pasado por parametro
            const hayCart = info.some((cart) => numero === cart.id);
            if(hayCart){
                const carro = info.find((cart) => numero === cart.id);
                return carro.productos;
            } else {
                console.log("no existe un carrito con ese numero de id");
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    }
    //agrega productos (por su id) al carrito
    async saveProduct(idCart, idProduct){
        try {
            const info = await this.getAll();
            //verifica si existe un cart con un id igual al idCart
            const hayCart = info.some((cart) => idCart === cart.id);
            if(hayCart){
                //busca el carrito y ve si ya tiene un producto con id igual a idProduct
                const cart = info.find((cart) => idCart === cart.id);
                const hayItem = cart.productos.some((item) => idProduct === item.id)
                const prod = await productos.getById(idProduct);
                //return temprano por si ya existe el producto
                if (hayItem) {
                    console.log("ya hay una copia de este producto en el carrito");
                    return
                }
                cart.productos.push(prod);
                const infoActualizada = info.map((item) => {
                    if(item.id === idCart) {
                      return cart  
                    }else{
                        return item
                    }
                })
                const infoJson = JSON.stringify(infoActualizada, null, 2);
                await fs.promises.writeFile(this.direccion, infoJson);
            } else {
                console.log("no existe un carrito con ese numero de id");
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    }
    //elimina un producto del carrito por su id de carrito y de producto
    async delProdById(idCart, idProduct) {
        try {
            const info = await this.getAll();
            //verifica si existe un cart con un id igual al idCart
            const hayCart = info.some((cart) => idCart === cart.id);
            if(!hayCart){
                console.log("no existe un carrito con ese numero de id");
                return null;
            }
            //busca el carrito, despues busca el item y lo elimina del carrito
            const cart = info.find((cart) => idCart === cart.id);
            const hayItem = cart.productos.some((item) => idProduct === item.id);
            if(!hayItem){
             console.log("No existe un producto con ese id en este carrito");
             return   
            }
            const producto = cart.productos.find((item) => idProduct === item.id);
            const indice = cart.productos.indexOf(producto);
            cart.productos.splice(indice, 1);
            //actualiza la informacion sobre los carritos y sobreescribe el archivo
            const infoActualizada = info.map((item) => {
                if(item.id === idCart) {
                  return cart  
                }else{
                    return item
                }
            })
            const infoJson = JSON.stringify(infoActualizada, null, 2);
            await fs.promises.writeFile(this.direccion, infoJson);
        } catch (error) {
            console.log(error);
        }
    }
}
export default Carrito;