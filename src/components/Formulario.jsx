import React, { useState } from 'react'

const Formulario = () => {
    const [fruta, setFruta] = useState('')
    const [description, setDescription] = useState('')
  return (
    <div className='container mt-5'>
        <h1 className='text-center'>CRUD BASICO</h1>
        <hr />
        <div className='row'>
            <div className='col-8'>
                <h4 className='text-center'>Listado de Frutas</h4>
                <ul className="list-grup">

                </ul>
            </div>
            <div className='col-4'>
                <h4 className="tex-center">Agregar Frutas</h4>
                <form>
                    <input type="text" placeholder='Ingrese Fruta' className='form-control mb-2'/>
                    <input type="text" placeholder='Ingrese Description' className='form-control mb-2'/>
                    <button className='btn btn-primary btn-block'>Agregar</button>
                </form>   
            </div>
       
        </div>
    </div>
  )
}

export default Formulario