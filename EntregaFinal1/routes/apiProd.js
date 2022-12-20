import { Router } from "express";
import productos from "../contenedor.js";
import multer from "multer";
const router = new Router();
const multerUpload = multer();
const admin = false;
router.get("/", async (req, res, next) => {
    try {
        const totalProductos = await productos.getAll()
        res.send(JSON.stringify(totalProductos));
    } catch (error) {
        next(error);
    }
});
router.get("/:id", async (req, res, next) => {
    const {id} = req.params;
    try {
        const resultado = await productos.getById(Number(id));
        res.send(JSON.stringify(resultado));
    } catch (error) {
        next(error);
    }
});
router.post("/",multerUpload.none(), async (req, res, next) => {
    try {
        await productos.save(req.body);
        res.send(JSON.stringify(req.body));
    } catch (error) {
        next(error);
    }
});
router.put("/:id", async (req, res, next) => {
    if (admin) {
        const { id } = req.params;
        const idNum = Number(id);
        const {title, price, thumbnail} = req.body;
        const productoActualizado = { title, price, thumbnail, id: idNum };
        try {
            productos.update(productoActualizado);
            res.send(`El producto ${id} fue actualizado`);
        } catch (error) {
            next(error);
        } 
    }else{
        const informacion = {
            error: -1,
            descripcion: "ruta /api/productos metodo PUT no autorizada"
        };
        const error = JSON.stringify(informacion, null, 2);
        res.send(error);
    }
});
router.delete("/:id", async (req, res, next) => {
    if(admin){
        const { id } = req.params;
        try {
            const respuesta = await productos.deleteById(Number(id));
            respuesta? res.send(`El producto ${id} fue eliminado`) : res.json({error: "producto no encontrado"});
        } catch (error) {
            next(error);
        }
    }else{
        const informacion = {
            error: -1,
            descripcion: "ruta /api/productos metodo DELETE no autorizada"
        };
        const error = JSON.stringify(informacion, null, 2);
        res.send(error);
    }
});
export default router;