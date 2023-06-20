import React, { useState } from 'react'
import AdjuntarArchivos from './crearcampana/AdjuntarArchivos';

export default function NoAdjuntos({adjuntos, setAdjuntos}) {
    const [showAddAdjunto, setShowAddAdjunto] = useState(false);

  return (
    <div className="text-center p-20 text-base text-gray-500 flex flex-col items-center w-full">
        <p
            className="mb-4"
        >
            <span className="select-none">
                {!showAddAdjunto && "No hay adjuntos"}
            </span>
            <span
                className="text-adstream-500 cursor-pointer hover:text-adstream-300 ml-2"
                onClick={() => !showAddAdjunto ? setShowAddAdjunto(true) : setShowAddAdjunto(false)}
            >
                {!showAddAdjunto ? "¿Deseas agregar uno?" : "Terminar"}
            </span>
        </p>
        {showAddAdjunto && (
            <AdjuntarArchivos
                adjuntos={adjuntos}
                setAdjuntos={setAdjuntos}
            />
        )}
    </div>
  )
}
