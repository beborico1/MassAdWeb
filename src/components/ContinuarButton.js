import React from 'react';

const ContinuarButton = ({loading, etapa, numeroDeEtapas, title, handleContinuar}) => {
  return (
        <button onClick={() => handleContinuar(1)} className="p-2 bg-adstream-500 text-white border-none rounded-md cursor-pointer text-xl font-semibold shadow-md hover:shadow-xl hover:bg-adstream-300 w-full max-w-2xl mb-3 mt-3">
          {loading ? (
            <div role="status">
              <span>Cargando ...</span>
            </div>
          ) : etapa === numeroDeEtapas ? 
              `${title}` :
              "Continuar"
          }
        </button>
  )
}

export default ContinuarButton;
