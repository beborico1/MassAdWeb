import React, { useState } from 'react'
import AdjuntarArchivos from './crearcampana/AdjuntarArchivos';

export default function NoAdjuntos({adjuntos, setAdjuntos}) {
    const [showAddAdjunto, setShowAddAdjunto] = useState(false);

  return (
    <div className="text-center py-4 text-base text-gray-500 flex flex-col items-center w-full ">
        <p
            className=""
        >
            <span className="select-none mr-2">
                {!showAddAdjunto && "No hay adjuntos"}
            </span>
            <span
                className="text-adstream-500 cursor-pointer hover:text-adstream-300"
                onClick={() => !showAddAdjunto ? setShowAddAdjunto(true) : setShowAddAdjunto(false)}
            >
                {!showAddAdjunto ? "¿Deseas agregar uno?" : "Terminar"}
            </span>
        </p>
        <div
            className="mt-4 w-full flex flex-col items-center"
        >
            {showAddAdjunto && (
                <AdjuntarArchivos
                    adjuntos={adjuntos}
                    setAdjuntos={setAdjuntos}
                />
            )}
        </div>
    </div>
  )
}
