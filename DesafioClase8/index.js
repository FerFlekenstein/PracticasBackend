const express = require('express');
const app = express();
const PORT = 8080;
const svRoutes = require("./routes");
app.use("/", express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
svRoutes(app);
//error Handler middleware
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send(`Error en ${err.message}`)
})
app.listen(PORT, () => console.log(`La URL del servidor es: http://localhost:${PORT}`));