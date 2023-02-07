import express from "express";
import productosApi from "./routes/apiProd.js";
import carritoApi from "./routes/apiCarrito.js";
import {Server as httpServer} from "http";
import {Server as IOServer} from "socket.io";
import { generateProd } from "./utils.js";
import { msj, productos, user } from "./daos/index.js";
import { normalize, schema } from "normalizr";
const PORT = 8080;
const app = express();
//server socket.io
const serverHttp = new httpServer(app);
const io = new IOServer(serverHttp);
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//motores de plantillas
app.set('view engine', 'ejs');
app.set('views', './views');
//rutas
app.use("/api/productos", productosApi);
app.use("/api/carrito", carritoApi);
app.get("/", async (req, res, next) => {
    const arrProd = await productos.getAll();
    res.render("productos", { objetos: arrProd })
});
app.get("/api/productos-test", (req, res, next) => {
    let productos = []
    for (let i = 0; i < 5; i++) {
        productos.push(generateProd());
    }
    res.send(productos)
})
//mensajes normalizados
const schemaAutores = new schema.Entity('autores');
const schemaMensajes = new schema.Entity('mensajes', {
    author : schemaAutores
});
const schemaAlgo = new schema.Entity('algo', {
    mensajes: [schemaMensajes]
})
app.get("/api/mensajes", async (req, res, next) => {
    const totalMensajes = await msj.getAll();
    let contador = 0;
    const mapeo = totalMensajes.map((obj) => {
        if(contador === 0){
            contador++
            return {
                id: contador,
                author: obj.author,
                date: obj.date,
                text: obj.text
            }
        } else{
            contador++
            return {
                id: contador,
                author: obj.author,
                date: obj.date,
                text: obj.text
            }
        }
    })
    const algo = {id: 1, mensajes: mapeo}
    const normalizedMsj = normalize(algo, schemaAlgo);
    console.log(normalizedMsj);
    res.send(JSON.stringify(normalizedMsj, null, 2));
})
app.get("/", (req, res, next) => {
    res.send("rutas /api/productos  ,  /api/carrito   ,  /api/productos-test   y   /api/mensajes")
});
//eventos socket
io.on('connection', async (socket) => {
    const historialProd = await productos.getAll()
    io.sockets.emit("productos", historialProd);
    const totalMensajes = await msj.getAll();
    io.sockets.emit("init", totalMensajes);
    socket.on("user", async (usr) => {
        await user.save(usr)
    })
    socket.on("msg", async (data) => {
        await msj.save(data);
        const historial = await msj.getAll()
        io.sockets.emit("historial", historial);
    })
    socket.on("newProd", async (prod) => {
        await productos.save(prod);
        const resp = await productos.getAll();
        io.sockets.emit("actuProd", resp)
    })
})

serverHttp.listen(PORT, () => console.log(`La URL del servidor es: http://localhost:${PORT}`));