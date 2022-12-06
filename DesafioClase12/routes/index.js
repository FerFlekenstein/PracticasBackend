const { Router } = require("express");
const { productos } = require('../contenedor.js')
const multer = require('multer');
const router = new Router();
const multerUpload = multer();

module.exports = app => {
    app.use("/productos", router);

    app.get("/", async (req, res, next) => {
        const arrProd = await productos.getAll();
        res.render("productos", { objetos: arrProd })
    });

    router.get("/", async (req, res, next) => {
        try {
            const arrProd = await productos.getAll();
            res.render("productos", { objetos: arrProd })
        } catch (error) {
            console.log("error en get /productos");
            next(error)
        }
    });

    router.post("/", multerUpload.none(), async (req, res, next) => {
        try {
            await productos.save(req.body);
            res.redirect("/");
        } catch (error) {
            next(error);
        }
    })

    router.delete("/:id", async (req, res, next) => {
        const { id } = req.params;
        try {
            const respuesta = await productos.deleteById(Number(id));
            respuesta ? res.send(`El producto ${id} fue eliminado`) : res.json({ error: "producto no encontrado" });
        } catch (error) {
            next(error);
        }
    })
}
