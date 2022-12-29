import React from 'react'

const Tabla = ({productos}) => {
  return (
      <table className="table table-dark table-hover col-10">
          <thead>
              <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Titulo</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Imagen</th>
                  <th scope="col">Stock</th>
              </tr>
          </thead>
          <tbody>
              {productos.map((producto, indice) => (
                  <tr key={indice}>
                      <th scope="row">{producto.id}</th>
                      <th scope="row">{producto.title}</th>
                      <td>${producto.price}</td>
                      <td>{producto.thumbnail}</td>
                      <td>{producto.stock}</td>
                  </tr>
              ))}
          </tbody>
      </table>
  )
}

export default Tabla