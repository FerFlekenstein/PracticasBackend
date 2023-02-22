import express from "express";
import productosApi from "./routes/apiProd.js";
import carritoApi from "./routes/apiCarrito.js";
import {Server as httpServer} from "http";
import {Server as IOServer} from "socket.io";
import { CURRENT_DIR } from "./utils.js";
import { productos, userService } from "./daos/index.js";
import session from 'express-session';
import MongoStore from "connect-mongo";
import loginRouter from "./routes/loginViewRouter.js"
import passport from "passport";
import initializeStrategy from "./config/passport.config.js";
const PORT = 8080;
const app = express();
//server socket.io
const serverHttp = new httpServer(app);
const io = new IOServer(serverHttp);
//cookies
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://dbEcomm:35470482@clusterfer.vszgiqb.mongodb.net/?retryWrites=true&w=majority',
        ttl: 60
    }),
    secret: "FraseSecreta",
    resave: false,
    saveUninitialized: false
}))
//passport
initializeStrategy();
app.use(passport.initialize());
app.use(passport.session());
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//motores de plantillas
app.set('view engine', 'ejs');
app.set('views', `${CURRENT_DIR}/views`);
app.use(express.static(`${CURRENT_DIR}/public`))
//rutas
app.use("/api/productos", productosApi);
app.use("/api/carrito", carritoApi);
app.use("/", loginRouter)
app.get("/ejs", async (req, res) => {
    const arrProd = await productos.getAll();
    res.render("productos", { objetos: arrProd, user: req.session.user})
});
//eventos socket
io.on('connection', async (socket) => {
    const historialProd = await productos.getAll()
    io.sockets.emit("productos", historialProd);
    socket.on("user", async (usr) => {
        await userService.save(usr)
    })
    socket.on("newProd", async (prod) => {
        await productos.save(prod);
        const resp = await productos.getAll();
        io.sockets.emit("actuProd", resp)
    })
})
serverHttp.listen(PORT, () => console.log(`La URL del servidor es: http://localhost:${PORT}`));