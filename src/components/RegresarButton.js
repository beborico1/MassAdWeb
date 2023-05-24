import React from 'react';

const RegresarButton = ({etapa, handleContinuar}) => {
  return (
    <>
        {etapa > 1 && (
            <button onClick={() => handleContinuar(-1)} className="bg-transparent border-none text-adstream-600 cursor-pointer hover:underline hover:bg-transparent">
              Regresar
            </button>
        )}
    </>
  )
}

export default RegresarButton;
