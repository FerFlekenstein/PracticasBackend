import React from 'react'

const FormEmail = ({manejoEmail}) => {
  return (
      <div className='mb-3'>
          <form onSubmit={manejoEmail}>
              <label>Email</label>
              <input type="email" name="email" />
              <button className='btn btn-primary'>enviar</button>
          </form>
      </div>
  )
}

export default FormEmail