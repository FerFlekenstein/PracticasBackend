import React from 'react'
import Historial from '../Historial'

const Chat = ({manejoEnvio, setMensaje, mensaje, mensajes}) => {
  return (
      <div>
          <Historial className='container my-2 border-top' mensajes={mensajes} />
          <form onSubmit={manejoEnvio}>
              <input type="text" onChange={e => setMensaje(e.target.value)} value={mensaje} />
              <button className='btn btn-primary'>enviar</button>
          </form>
      </div>
  )
}

export default Chat