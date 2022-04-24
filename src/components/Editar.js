import React from 'react'
import NavBarAlumno from "./NavBarAlumno";
import { db, collections, getDoc, setDocs, docs } from "../firebase";
import { idExamen, titleExa } from "./CardExamenes";
import { useEffect, useState } from "react";

var nombreExamen = titleExa;
const datos=[];
const nombre=[];


function Editar(props) {
  const [resultados, setResultados] = useState([]);

    useEffect(()=>{
      const recuperarDatos = async() =>{

    
        try {
            const querySnapshot = await getDoc(collections(db, 'Calificaciones/'+nombreExamen+'/'+props.userName))
            querySnapshot.forEach((doc) => {
                    // Metodo para obtener los valores con el formato clave valor
                    for (var [key, value] of Object.entries(doc.data())) {
                       datos.push(value);
                       nombre.push(key);
                    }               
            })
            console.log(datos);
            console.log(nombre);
  
          }catch(e){}
    
      }
        recuperarDatos();

    },[]);


  return (
    <div className='w-full'>
      <NavBarAlumno userName={props.userName}></NavBarAlumno>
      <h1 className='text-center font-bold mt-12'>Editar Datos</h1>

      <div>
        {
          datos.map((element)=>{
            return(
              <div key={0}>
                <label>Nombre:{element}</label>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default Editar