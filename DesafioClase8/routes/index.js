const { Router} = require("express");
const { productos } = require('../contenedor.js')
const multer = require('multer');
const router = new Router();

//multer middleware
const multerUpload = multer();

module.exports = app => {
    app.use("/api/productos", router);

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
            console.log("error en /api/productos/:id");
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
    })

    router.put("/:id", async (req, res, next) => {
        const { id } = req.params;
        const idNum = Number(id);
        const {title, price, thumbnail} = req.body;
        const productoActualizado = { title, price, thumbnail, id: idNum }
        try {
            productos.update(productoActualizado)
            res.send(`El producto ${id} fue actualizado`)
        } catch (error) {
            next(error)
        }
    })

    router.delete("/:id", async (req, res, next) => {
        const { id } = req.params;
        try {
            const respuesta = await productos.deleteById(Number(id));
            respuesta? res.send(`El producto ${id} fue eliminado`) : res.json({error: "producto no encontrado"});
        } catch (error) {
            next(error);
        }
    })

}
