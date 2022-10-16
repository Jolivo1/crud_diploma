import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, doc, deleteDoc} from 'firebase/firestore';

const Formulario = () => {
    const [fruta, setFruta] = useState('');
    const [description, setDescription] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precio, setPrecio] = useState('');
    const [estado, setEstado] = useState('');
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
        if (fruta === "" || description === "" || cantidad === "" || precio === "" || estado  === "") {
            alert("llenar todos los campos")
            return
        }
        e.preventDefault()
        try{
       
           
            const data = await addDoc(collection(db,'frutas'),{
                
                nombreFruta: fruta,
                description: description,
                cantidadProducto: cantidad,
                precio:precio,
                estado: estado

            })

            setListaFrutas([
                ...listaFrutas,
                {nombreFruta:fruta, description:description, cantidadProducto:cantidad, precio:precio, estado:estado ,id:data.id}
            ])

            setFruta('')
            setDescription('')
            setCantidad('')
            setPrecio('')
            setEstado('')
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
                <div className="container">
                    <div className="row">
                {
                        listaFrutas.map(item =>(
                           
                                <div className="card col-5 m-2 " key={item.id}>
                                <div className="card-body" >
                                    <h2 className="card-title">{item.nombreFruta}</h2>
                                    <h4 className="card-text">{item.cantidadProducto}</h4>
                                    <p>{item.description}</p>
                                    <h5>{item.precio}</h5>
                                    <p>{item.estado}</p>
                                    
                                    <button className='btn btn-danger btn-sm float-center px-5' onClick={()=>eliminar(item.id)}>Eliminar</button>
                                </div>
                                </div>
                                
                           
                        ))
                    }
                    </div>
                </div>
            </div>
            <div className='col-4'>
                <h4 className="tex-center">Agregar Frutas</h4>
                <form onSubmit={guardarFrutas}>
                    <input type="text" placeholder='Ingrese Fruta' value={fruta} onChange={(e)=>setFruta(e.target.value)} className='form-control mb-2'/>
                    <input type="text" placeholder='Ingrese Description' value={description} onChange={(e)=>setDescription(e.target.value)} className='form-control mb-2'/>
                    <input type="text" placeholder='Ingrese Cantidad' value={cantidad} onChange={(e)=>setCantidad(e.target.value)} className='form-control mb-2'/>
                    <input type="text" placeholder='Ingrese Precio' value={precio} onChange={(e)=>setPrecio(e.target.value)} className='form-control mb-2'/>
                    <input type="text" placeholder='Como es el estado de su fruta?' value={estado} onChange={(e)=>setEstado(e.target.value)} className='form-control mb-2'/>
                    <button className='btn btn-primary btn-block' type='submit '>Agregar</button>
                </form>   
            </div>
       
        </div>
    </div>
  )
}

export default Formulario