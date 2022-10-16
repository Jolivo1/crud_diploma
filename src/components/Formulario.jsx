import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, doc, deleteDoc} from 'firebase/firestore';

const Formulario = () => {
    const [fruta, setFruta] = useState('');
    const [description, setDescription] = useState('');
    const [listaFrutas, setListaFrutas] = useState([])


    useEffect(() => {

        const obtenerDatos = async () => {    
          try {
            await onSnapshot(collection(db, "frutas"), (querySnapshot) => {    
              setListaFrutas(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            });
          } catch (err) {
            console.log(err);
          }
        };
        obtenerDatos();
      }, []);

    const guardarFrutas = async (e) =>{
        e.preventDefault()
        try{
       
           
            const data = await addDoc(collection(db,'frutas'),{
                
                nombreFruta: fruta,
                nombreDescripcion: description
            })

            setListaFrutas([
                ...listaFrutas,
                {nombreFruta:fruta, nombreDescripcion:description, id:data.id}
            ])

            setFruta('')
            setDescription('')
            e.target.reset()
        }catch(error){
            console.log(error)
        }
    }

    const eliminar = async id => {
        console.log(id)
        try{
            await deleteDoc(doc(db,'frutas',id))
        }catch(error){
            console.log(error)
        }
    }

  return (
    <div className='container mt-5'>
        <h1 className='text-center'>CRUD BASICO</h1>
        <hr />
        <div className='row'>
            <div className='col-8'>
                <h4 className='text-center'>Listado de Frutas</h4>
                <ul className="list-grup">
                {
                        listaFrutas.map(item =>(
                            <li className='list-group-item' key={item.id}>
                                <span className='lead'>{item.nombreFruta}-{item.nombreDescripcion}</span>
                                <button className='btn btn-danger btn-sm float-end mx-2' onClick={()=>eliminar(item.id)}>Eliminar</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className='col-4'>
                <h4 className="tex-center">Agregar Frutas</h4>
                <form onSubmit={guardarFrutas}>
                    <input type="text" placeholder='Ingrese Fruta' value={fruta} onChange={(e)=>setFruta(e.target.value)} className='form-control mb-2'/>
                    <input type="text" placeholder='Ingrese Description' value={description} onChange={(e)=>setDescription(e.target.value)} className='form-control mb-2'/>
                    <button className='btn btn-primary btn-block' type='submit '>Agregar</button>
                </form>   
            </div>
       
        </div>
    </div>
  )
}

export default Formulario