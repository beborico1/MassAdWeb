import React from 'react';
import '../helpers/estilos/ContinuarButton.css'

const ContinuarButton = ({loading, etapa, numeroDeEtapas, title, handleContinuar}) => {
  return (
    <>
      <div>
        <button onClick={() => handleContinuar(1)} className="continuar-button">
          {loading ? (
            <div role="status">
              <span>Loading...</span>
            </div>
          ) : etapa === numeroDeEtapas ? 
              `${title}` :
              "Continuar"
          }
        </button>
      </div>
    </>
  )
}

export default ContinuarButton;
