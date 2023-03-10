import express from 'express';
const PORT = process.env.PORT || 8080
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => { 
      res.send(`Esta peticion fue ejecutada en el puerto ${PORT} y en el pid (${process.pid})`)
})

app.listen(PORT, () => {
      console.log(`PORT:${PORT}`, `PID:${process.pid}`)
})