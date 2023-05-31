import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const ContinuarButton = ({loading, etapa, numeroDeEtapas, title, handleContinuar}) => {
  return (
        <button onClick={() => handleContinuar(1)} className="p-2 bg-adstream-500 text-white border-none rounded-md cursor-pointer text-xl font-semibold shadow-md hover:shadow-xl hover:bg-adstream-300 w-11/12 max-w-xl mb-3 mt-3 h-12 box-border">
          {loading ? (
            <div role="status">
              <span>Cargando ...</span>
            </div>
          ) : etapa === numeroDeEtapas ? 
              `${title}` :
              "Continuar"
          }
          { etapa !== numeroDeEtapas && <FaArrowRight className="inline-block ml-3" size={24} /> }
        </button>
  )
}

export default ContinuarButton;
