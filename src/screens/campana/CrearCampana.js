import React from 'react'; // Importa el hook useState
import { FaArrowLeft } from 'react-icons/fa'; // Importa los iconos de flecha y pregunta
import Preguntas from '../../components/Preguntas';

export default function CrearCampana() { // Exporta la función CrearCampana
  return (
    <>
      <div className="flex w-full h-screen justify-center items-center p-8 bg-gray-200 overflow-y-hidden">   
        <div className="flex flex-col items-center w-full max-w-3xl">
          {/* BOTON PARA REGRESAR: */}
          <button onClick={() => window.history.back()} className='cursor-pointer bg-adstream-500 hover:bg-adstream-300 text-white py-2 px-8 text-center text-base font-semibold rounded-md transition duration-400 absolute top-2 left-2 justify-center items-center flex flex-row'>
            <FaArrowLeft size={20} style={{marginRight: '10px'}}/> Inicio
          </button>  

          <Preguntas />

        </div>
      </div>
    </>
  )
}
