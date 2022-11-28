const express = require('express');
const hbs = require('express-handlebars');
const pug = require('pug');
const { productos } = require('./contenedor');
const svRoutes = require("./routes");
const app = express();
const PORT = 3001;
//middlewares para leer cualquier tipo de dato
app.use(express.json());
app.use(express.urlencoded({extended: true}));

svRoutes(app);

//Hbs
// app.engine("hbs", hbs.engine({extname: "hbs"}));
// app.set('view engine', "hbs");
// app.set('views', './views/hbs');

//pug
// app.set('view engine', 'pug');
// app.set('views', './views/pug');

//ejs
app.set('view engine', 'ejs');
app.set('views', './views/ejs');


//error handler middleware
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send(`Error en ${err.message}`)
})
app.listen(PORT, () => console.log(`URL del server: http://localhost:${PORT}`))