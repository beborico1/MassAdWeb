import React from 'react';
import { globalStyles } from '../helpers/styles';
import colors from '../helpers/colors';

const RegresarButton = ({etapa, handleContinuar}) => {
  return (
    <>
        {etapa > 1 && (
            <button onClick={() => handleContinuar(-1)}>
              <p style={{ ...globalStyles.coloredText, marginTop: '20px' }}>Regresar</p>
            </button>
        )}
    </>
  )
}

export default RegresarButton;
