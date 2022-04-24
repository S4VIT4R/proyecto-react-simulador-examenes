import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {cantidadCorrectas} from "./Preguntas";
import { db, collections, getDoc, setDocs, docs } from "../firebase";
import { idExamen, titleExa } from "./CardExamenes";


import './ExamenResultado.css'
var nombreExamen=titleExa;

function ExamenResultado(props) {
    const navigate = useNavigate()
    const salir = async() =>{
        const datos=[];
        const nombre=[];
        var int;

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

          for (let index = 0; index < nombre.length; index++) {
              if(nombre[index]=='intento'){
                  console.log("Entre a la asignacion de int")
                  int=datos[index];
              }else{
                  console.log(nombre[index]);
              }

          }

          console.log("El valor de int "+int);
          int++;
          console.log("Valor incrementado "+int);
          try {
            const ref = docs(
              db,
              "Calificaciones/" + nombreExamen + "/" + props.userName + "/" + int
            );
      
            await setDocs(ref, {
              calificacion: cantidadCorrectas*20,
            });
          } catch (error) {}
      
      
          try {
            const ref = docs(
              db,
              "Calificaciones/" + nombreExamen + "/" + props.userName + "/intentos"
            );
      
            await setDocs(ref, {
              intento: int,
            });
          } catch (error) {}

        navigate('/responderexamen');
    }
    
  return (
      
    <div className='content-result'>
        <div className='bg-transparent w-50 m-auto shadow rounded'>
            <div className='bg-white flow-root text-center'>
                <label className='font-serif p-1 text-center text-lg'>Alumno: {props.userName}</label>
                <button onClick={salir} className='float-right mr-1'>
                    <svg className="h-8 w-8 text-black"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/> <line x1="9" y1="9" x2="15" y2="15" />  <line x1="15" y1="9" x2="9" y2="15" /></svg>
                </button>
            </div>            
            <div className='text-center flow-root'>
                 {
                    cantidadCorrectas===1 && <label className='result-resp'>Tu calificación es 20/100 Respuestas correctas: {cantidadCorrectas}</label>
                 }
                 {
                    cantidadCorrectas===2 && <label className='result-resp'>Tu calificación es 40/100 Respuestas correctas: {cantidadCorrectas}</label>
                 }
                 {
                    cantidadCorrectas===3 && <label className='result-resp'>Tu calificación es 60/100 Respuestas correctas: {cantidadCorrectas}</label>
                 }
                 {
                    cantidadCorrectas===4 && <label className='result-resp'>Tu calificación es 80/100 Respuestas correctas: {cantidadCorrectas}</label>
                 }
                 {
                    cantidadCorrectas===5 && <label className='result-resp'>Tu calificación es 100/100 Respuestas correctas: {cantidadCorrectas}</label>
                 }             
            </div>            
            <div className='w-full  content-center h-full'>
                {
                    cantidadCorrectas === 1 && <div className='img-result'><img src='./1buena.jpg' alt='' width='400'></img></div>
                }
                {
                    cantidadCorrectas === 2 && <div className='img-result'><img src='./2buenas.jpg' alt='' width='400'></img></div>
                }
                {
                    cantidadCorrectas === 3 && <div className='img-result'><img src='./3buenas.jpg' alt='' width='400'></img></div>
                }
                {
                    cantidadCorrectas === 4 && <div className='img-result'><img src='./4buenas.jpg' alt='' width='400'></img></div>
                }
                {
                    cantidadCorrectas > 4 && <div className='img-result'><img src='./5buenas.jpg' alt='' width='400'></img></div>
                }
            </div>
        </div>
    </div>
  )
}

export default ExamenResultado