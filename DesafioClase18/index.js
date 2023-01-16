import mongoose from "mongoose";
//Se crea un esquema para la coleccion
const mensajesSchema = new mongoose.Schema({
    email: {type: String, required: true},
    fecha: {type: String, required: true},
    body: {type: String, required: true},
    from: {type: String, required: true},
});
const prodSchema = new mongoose.Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number},
    thumbnail: {type: String, required: true}
});
const mensajes = [
    {email: "a@a.com", fecha: "11/01/23", body: "MsjA1", from: "a@a.com"},
    {email: "b@b.com", fecha: "11/01/23", body: "MsjB1", from: "b@b.com"},
    {email: "b@b.com", fecha: "11/01/23", body: "MsjB2", from: "b@b.com"},
    {email: "a@a.com", fecha: "11/01/23", body: "MsjA2", from: "a@a.com"},
    {email: "b@b.com", fecha: "11/01/23", body: "MsjB3", from: "b@b.com"},
    {email: "b@b.com", fecha: "11/01/23", body: "MsjB4", from: "b@b.com"},
    {email: "a@a.com", fecha: "11/01/23", body: "MsjA3", from: "a@a.com"},
    {email: "a@a.com", fecha: "11/01/23", body: "MsjA4", from: "a@a.com"},
    {email: "b@b.com", fecha: "11/01/23", body: "MsjB5", from: "b@b.com"},
    {email: "a@a.com", fecha: "11/01/23", body: "MsjA5", from: "a@a.com"}
];
const productos = [
    {title: "Fideos", price: 350, thumbnail: "fideos.png"},
    {title: "Arroz", price: 250, thumbnail: "arroz.png"},
    {title: "Polenta", price: 2000, thumbnail: "polenta.png"},
    {title: "Agua", price: 1350, thumbnail: "agua.png"},
    {title: "Milanesas", price: 2600, thumbnail: "milanesas.png"},
    {title: "Pan", price: 100, thumbnail: "Pan.png"},
    {title: "Frutas", price: 4090, thumbnail: "frutas.png"},
    {title: "Verduras", price: 5000, thumbnail: "verduras.png"},
    {title: "Queso", price: 3880, thumbnail: "queso.png"},
    {title: "Carne", price: 870, thumbnail: "carne.png"}
]
const msjModel = mongoose.model("mensajes", mensajesSchema);
const prodModel = mongoose.model("productos", prodSchema);
await mongoose.connect('mongodb://localhost:27017/ecommerce', {
    serverSelectionTimeoutMS: 5000,
})
try {
    //insertar los documentos
    await msjModel.create(mensajes);
    await prodModel.create(productos);
    //listar ambas colecciones
    let consulta = await msjModel.find({});
    console.log(`coleccion mensajes ${consulta}`);
    consulta = await prodModel.find({});
    console.log(`coleccion productos ${consulta}`);
    //contar la cantidad de docs guardados
    consulta = await msjModel.countDocuments({});
    console.log(`cantidad de mensajes: ${consulta}`);
    consulta = await prodModel.countDocuments({});
    console.log(`cantidad de productos: ${consulta}`);
    //CRUD
    await prodModel.create({title: "Aquarius", price: 400, thumbnail: "aquarius.png"});
    consulta = await prodModel.find({price: {$lt: 1000}})
    console.log(`Productos con precio menor a $1000 ${consulta}`);
    consulta = await prodModel.find({price: {$lt: 3000, $gt: 1000}});
    console.log(`Productos con precio mayor a $1000 y menor a $3000 ${consulta}`);
    consulta = await prodModel.find({price: {$gt: 3000}});
    console.log(`Productos con precio mayor a $3000 ${consulta}`);
    consulta = await prodModel.find({}, {_id: 0, __v: 0, price: 0, thumbnail: 0}).sort({price: 1}).limit(1).skip(2);
    console.log(`Titulo del tercer producto mas barato: ${consulta}`);
    await prodModel.updateMany({}, {$set: {stock: 100}});
    consulta = await prodModel.find({});
    console.log(`coleccion productos con stock ${consulta}`);
    await prodModel.updateMany({price: {$gt: 4000}}, {stock: 0});
    consulta = await prodModel.find({price : {$gt: 4000}});
    console.log(`productos > $4000 con stock en 0 ${consulta}`);
    await prodModel.deleteMany({price: {$lt: 1000}});
    consulta = await prodModel.find({});
    console.log(`coleccion productos (los < $1000 fueron eliminados) ${consulta}`);
    //Creacion de usuario con permiso solo lectura
    await mongoose.connection.db.addUser("pepe", "asd456", {roles: "read"})
} catch (error) {
    console.log(error);
}
await mongoose.disconnect();