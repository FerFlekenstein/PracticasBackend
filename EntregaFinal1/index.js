import express from "express";
import productosApi from "./routes/apiProd.js";
import carritoApi from "./routes/apiCarrito.js";
const PORT = 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api/productos", productosApi);
app.use("/api/carrito", carritoApi);
app.get("/", (req, res, next) => {
    res.send("Hola")
});
//error Handler middleware
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send(`Error en ${err.message}`)
})
app.listen(PORT, () => console.log(`La URL del servidor es: http://localhost:${PORT}`))