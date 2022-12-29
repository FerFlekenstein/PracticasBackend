import React from 'react'

const Historial = ({mensajes}) => {
  return (
    <div>
        {mensajes.map((mensaje, indice) => (
        <div key={indice}>
          <p><b>{mensaje.from}</b>({mensaje.email}) [{mensaje.fecha}]: <i>{mensaje.body}</i></p>
        </div>
        ))}
    </div>
  )
}

export default Historial