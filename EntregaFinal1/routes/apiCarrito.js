import { Router } from "express";
import Carrito from "../carrito.js";
const router = new Router();
const carrito = new Carrito();
//crea un carrito y devuelve su id
router.post("/", async (req, res, next) => {
    try {
        const id = await carrito.createCart();
        res.send(JSON.stringify(id));
    } catch (error) {
        console.log(error);
    }
});
//vacía un carrito y lo elimina
router.delete("/:id", async (req, res, next) => {
    const {id} = req.params;
    await carrito.deleteById(Number(id));
    res.send("Carrito eliminado");
});
//lista todos los productos del carrito
router.get("/:id/productos", async (req, res, next) => {
    const {id} = req.params;
    const listado = await carrito.getProductos(Number(id));
    res.send(JSON.stringify(listado));
});
//agrega productos (por su id) al carrito
router.post("/:id/productos", async (req, res, next) => {
    const {id} = req.params;
    const {idProduct} = req.body;
    await carrito.saveProduct(Number(id), Number(idProduct));
    res.send("Producto agregado")
});
//elimina un producto del carrito por su id de carrito y de producto
router.delete("/:id/productos/:id_prod", async (req, res, next) => {
    const {id} = req.params;
    const {id_prod} = req.params;
    await carrito.delProdById(Number(id), Number(id_prod));
    res.send("Producto borrado")
});
export default router;