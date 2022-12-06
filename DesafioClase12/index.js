const express = require("express");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const { productos } = require('./contenedor.js');
const svRoutes = require("./routes");
const PORT = 3001;
const app = express();
const serverHttp = new HttpServer(app);
const io = new IOServer(serverHttp);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');
svRoutes(app);

let mensajes = [];
io.on('connection', async (socket) => {
    const histoialProd = await productos.getAll()
    io.sockets.emit("productos", histoialProd);
    io.sockets.emit("init", mensajes);

    socket.on("msg", data => {
        mensajes.push(data);
        io.sockets.emit("historial", mensajes);
    })
    socket.on("newProd", async (producto) => {
        await productos.save(producto);
        const resp = await productos.getAll();
        io.sockets.emit("actuProd", resp)
    })
})
//error handler middleware
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send(`Error en ${err.message}`)
})

serverHttp.listen(PORT, () => console.log(`El servidor es http://localhost:${PORT}`));