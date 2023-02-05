import express from 'express';
import { Server as IOServer } from 'socket.io';
import http from 'http';
import cors from 'cors';
import { optionsSqlite } from './options/sqlite3.js';
import { optionsMaria } from './options/mariaDB.js';
import ClienteSQL from './sql.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const bdMensajes = new ClienteSQL(optionsSqlite, "mensajes");
const bdProductos = new ClienteSQL(optionsMaria, "productos");
//Crea la tabla de mensajes
try {
    const tabla = (table) => {
        table.increments('id').primary();
        table.string('email', 255).notNullable();
        table.string('fecha', 255).notNullable();
        table.string('body', 255).notNullable();
        table.string('from', 255).notNullable();
    }
    bdMensajes.crearTabla(tabla)
} catch (error) {
    console.log(error);
}
//Crea la tabla de productos
try {
    const otraTabla = (table) => {
        table.increments('id').primary();
        table.string('title', 255).notNullable();
        table.float('price');
        table.integer('stock');
        table.string('thumbnail', 255).notNullable();
    }
    await bdProductos.crearTabla(otraTabla);
} catch (error) {
    console.log(error);
}
const app = express();
const PORT = process.env.PORT || 4000;
//crea el servidor http puro. (el de express no sirve porque le agrega metadata)
const server = http.createServer(app);
//recibe un servidor http como parametro y configuro cors universalmente
const io = new IOServer(server, {
    cors: {
        origin: "*"
    }
});
app.use(cors());
//obtengo la ruta absoluta de donde se ejecute dirname (en este caso index.js) y la concateno hacia la carpeta build (front)
const dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(dirname, "/client/chatReact/dist")));
//escucha la conexion del cliente
io.on('connection', async (socket) => {
    //escucha el evento "mensaje" del cliente(socket)
    socket.on("mensaje", async (data) => {
        const infoMensaje = {
            ...data,
            from: socket.id,
        }
        try {
            await bdMensajes.save(infoMensaje);
        } catch (error) {
            console.log(error);
        }
        //genero un evento ("mensaje2") hacia los demas clientes (!= cliente que genero el evento "mensaje")
        socket.broadcast.emit("mensaje2", infoMensaje)
    })
    socket.on("producto", async (producto) => {
        try {
            await bdProductos.save(producto);
            const totalProductos= await bdProductos.getAll();
            io.sockets.emit("totalProductos", totalProductos)
        } catch (error) {
            console.log(error);
        }
    })
    //lista ambas bases y las envia al front
    try {
        const historialMensajes = await bdMensajes.getAll();
        const historialProductos= await bdProductos.getAll();
        socket.emit("initMsj", historialMensajes);
        socket.emit("initProd", historialProductos);
    } catch (error) {
        console.log(error);
    }
})
server.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`))