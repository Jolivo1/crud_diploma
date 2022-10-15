import React, { useState } from 'react'

const Formulario = () => {
    const [fruta, setFruta] = useState('')
    const [description, setDescription] = useState('')
  return (
    <div className='container mt-5'>
        <h1 className='text-center'>CRUD BASICO</h1>
        <hr />

        <form action="">
            <input type="text" placeholder='Ingrese Fruta' className='form-control mb-2'/>
            <input type="text" placeholder='Ingrese Description' className='form-control mb-2'/>
            <button className='btn btn-primary btn-block'>Agregar</button>
        </form>
    </div>
  )
}

export default Formulario