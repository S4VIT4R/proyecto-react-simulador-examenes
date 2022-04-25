import React from 'react'
import NavBarAlumno from "./NavBarAlumno";
import { db, collections, getDoc, setDocs, docs } from "../firebase";
import { idExamen, titleExa } from "./CardExamenes";
import { useEffect, useState } from "react";
import Resultados from './Resultados';




function Editar(props) {
  const datos=[];
  const nombre=[];
  var promedio =0;

  const obtenerPromedio = () =>{
    for (let index = 0; index < datos.length; index++) {
      promedio = promedio + datos[index];
      
    }

    promedio = promedio/datos.length;

  }

    useEffect(()=>{
      const recuperarDatos = async() =>{
        const nombresExamenes= [];
        try{

          const querySnapshot = await getDoc(collections(db, "Examenes/"))
              querySnapshot.forEach((doc) => {
                      // Metodo para obtener los valores con el formato clave valor
                      for (var [key, value] of Object.entries(doc.data())) {
                        nombresExamenes.push(doc.data())
                      }             
              })

              // console.log(datos);
              // console.log(nombre);
              console.log(nombresExamenes[0].examen[0].title);
            }catch(e){console.log(e)}


        try{
          for (let index = 0; index < nombresExamenes.length; index++) {
            const querySnapshot = await getDoc(collections(db, "Calificaciones/"+nombresExamenes[index].examen[0].title+"/"+props.userName))
            querySnapshot.forEach((doc) => {
              // Metodo para obtener los valores con el formato clave valor
              for (var [key, value] of Object.entries(doc.data())) {
                 datos.push(value);
                 nombre.push(key);
              } 
              console.log(datos[0]);              
      })
          }
            // console.log(datos);
            // console.log(nombre);
          }catch(e){console.log(e)}

          obtenerPromedio();
    
      }
        recuperarDatos();




    },[]);


  return (
    <div className='w-full'>
      <NavBarAlumno userName={props.userName}></NavBarAlumno>
      <h1 className='text-center font-bold mt-12'>Editar {datos[0]}</h1>
      <h2>{datos[0]}</h2>
      
      

    </div>

    
  )
}

export default Editar