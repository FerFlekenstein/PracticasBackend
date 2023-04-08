import { Router } from "express";
import cartController from "../controllers/cart.controller.js";
const router = new Router();
router.post("/", cartController.createCart);
router.get("/", cartController.findCart);
router.post("/add", cartController.sendEmail);
//vacía un carrito y lo elimina
router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    await carrito.deleteById(id);
    res.send("Carrito eliminado");
});
//lista todos los productos del carrito
router.get("/:id/productos", async (req, res, next) => {
    const { id } = req.params;
    const listado = await carrito.getProductos(id);
    res.send(JSON.stringify(listado));
});
//agrega productos (por su id) al carrito
router.post("/:id/productos", async (req, res, next) => {
    const { id } = req.params;
    const { idProduct } = req.body;
    await carrito.saveProduct(id, idProduct);
    res.send("Producto agregado")
});
//elimina un producto del carrito por su id de carrito y de producto
router.delete("/:id/productos/:id_prod", async (req, res, next) => {
    const { id } = req.params;
    const { id_prod } = req.params;
    await carrito.delProdById(id, id_prod);
    res.send("Producto borrado")
});
export default router;