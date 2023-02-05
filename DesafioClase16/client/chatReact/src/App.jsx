import './App.css';
import io from 'socket.io-client';
import { useState, useEffect } from 'react';
import Chat from '../components/Chat';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tabla from '../components/Tabla';
import FormEmail from '../components/FormEmail';

//con io conecto al servidor del backend (lo paso sin uri porque se conecta directamente al ser todo una sola app) y me devuelve un objeto (socket) 
const socket = io("http://localhost:4000");

function App() {
  //state para guardar el mensaje
  const [mensaje, setMensaje] = useState();
  //state de mensajes
  const [mensajes, setMensajes] = useState([]);
  //state de email y fn del form
  const [email, setEmail] = useState(false);
  const manejoEmail = (e) => {
    e.preventDefault()
    setEmail(e.target.email.value);
  }
  //productos related
  const [productos, setProductos] = useState([]);
  const manejoProductos = (e) => {
    e.preventDefault();
    const producto = {
      title: e.target.title.value,
      price: e.target.price.value,
      stock: e.target.stock.value,
      thumbnail: e.target.thumbnail.value
    }
    socket.emit("producto", producto)
  }
  //recibe los mensajes del formulario y los manda al back 
  const manejoEnvio = (e) => {
    e.preventDefault();
    const date = new Date();
    const fecha = date.toLocaleString();
    const infoObj = {
      email: email,
      fecha: fecha,
      body: mensaje
    }
    socket.emit("mensaje", infoObj);
    //genera un obj para cambiar el from y setea el state mensajes
    const mensajePropio = {
      body: mensaje,
      from: "Yo",
      fecha: fecha,
      email: email
    }
    setMensajes([...mensajes, mensajePropio])
    setMensaje("");
  }
  //recibe los mensajes y productos para cargar el historial al iniciar
  socket.on("initMsj", (mensajes) => {
    setMensajes(mensajes)
  })
  socket.on("initProd", (productos) => {
    setProductos(productos)
  })
  //cuando se carga la app, escucha el evento "mensaje2" y despues desuscribo -la esucha- de ese evento "mensaje2"
  useEffect(() => {
    const recibirMensaje = (mensaje) => {
      setMensajes([...mensajes, mensaje])
    }
    socket.on("mensaje2", recibirMensaje);
    return () => {
      socket.off("mensaje2", recibirMensaje)
    }
  }, [mensajes]);
  useEffect(() => {
    const recibirProducto= (total) => {
      setProductos(total)
    }
    socket.on("totalProductos", recibirProducto);
    return () => {
      socket.off("totalProductos", recibirProducto)
    }
  }, [productos])

  return (
    <div className="App px-4">
      <div className="container row justify-content-center">
        <div className="container row justify-content-center">
          <form className="p-2 col-md-5" onSubmit={manejoProductos}>
            <legend className="form-legend">Datos del producto</legend>
            <label htmlFor="title" className="form-label">Nombre</label>
            <input type="text" className="form-control" id="title" name="title"/>
            <label htmlFor="price" className="form-label">Precio</label>
            <input type="number" className="form-control" id="price" name="price"/>
            <label htmlFor="thumbnail" className="form-label">Foto URL</label>
            <input type="text" className="form-control" id="thumbnail" name="thumbnail"/>
            <label htmlFor="stock" className="form-label">Stock</label>
            <input type="number" className="form-control" id="stock" name="stock"/>
            <button type="submit" className="btn btn-primary mt-2">Submit</button>
          </form>
        </div>
      </div>
      <div className="container row justify-content-center my-4">
        {productos? <Tabla productos={productos}/> : <h3 className="text-center alert alert-primary">No hay productos</h3>}
      </div>
      {email ? <Chat manejoEnvio={manejoEnvio} setMensaje={setMensaje} mensaje={mensaje} mensajes={mensajes} /> : <FormEmail manejoEmail={manejoEmail}/>}
    </div>
  )
}

export default App;
