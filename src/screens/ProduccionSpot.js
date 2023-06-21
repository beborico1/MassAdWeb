import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import Title from '../components/TitleComponent'

const ProduccionSpot = () => {
  return (
    <div className="flex flex-col w-full h-screen justify-center items-center p-8 bg-gray-200 overflow-y-hidden">
        <button onClick={() => window.history.back()} className='cursor-pointer bg-adstream-500 hover:bg-adstream-300 text-white py-2 px-8 text-center text-base font-semibold rounded-md transition duration-400 absolute top-2 left-2 justify-center items-center flex flex-row'>
          <FaArrowLeft size={20} style={{marginRight: '10px'}}/> Detalle
        </button>

      <Title title="Produccion Spot" />
      <p className="text-center text-xl font-semibold text-gray-600 select-none">
        Pronto en esta seccion podras generar tus propios spots.
      </p>
    </div>
  )
}

export default ProduccionSpot

// -1. Generacion de ideas gpt

// 0. Generacion de audio

// 1. **Formulario de Detalles del Spot:** Este formulario podría contener campos para información como la duración del spot, el contenido del script, el estilo deseado, etc.

// 2. **Panel de Aprobación:** Un panel que muestra el estado de aprobación actual del spot y permite al usuario aprobarlo o solicitar cambios.

// 3. **Reproductor de Audio:** Un componente que permita al usuario escuchar una versión preliminar del spot.

// 4. **Cargador de Archivos:** Un componente para cargar y manejar archivos, como scripts o audios.

// 5. **Programador de Tiempo de Producción:** Un componente que permita al usuario seleccionar fechas y horas para la producción del spot.

// 6. **Lista de Verificación de Producción:** Un componente que muestre una lista de verificación de las tareas necesarias para completar la producción del spot.

// 7. **Sección de Comentarios:** Un lugar donde los usuarios pueden dejar comentarios o feedback sobre el spot.

// 8. **Panel de Control de Producción:** Un panel que permita al usuario gestionar todos los aspectos de la producción del spot, como la asignación de personal, la gestión de los recursos, etc.

// 9. **Gráfico de Progreso:** Un componente que muestre el progreso de la producción del spot.

// 10. **Galería de Audios:** Un lugar donde los usuarios puedan escuchar y seleccionar música o efectos de sonido para su spot.

// 11. **Integración de Mensajería:** Un chat o una funcionalidad de mensajería que permita la comunicación en tiempo real entre los diferentes miembros del equipo de producción.

// 12. **Tablero de Tareas:** Un tablero Kanban o similar que muestre las tareas necesarias para la producción del spot y su estado actual.

// 13. **Selector de Locutor:** Un componente que permita seleccionar al locutor que grabará el spot.

// 14. **Sección de Historial:** Un lugar donde se registren y muestren todas las revisiones y cambios realizados durante el proceso de producción.

// 15. **Panel de Exportación:** Un componente que permita exportar el spot finalizado en diferentes formatos de audio.