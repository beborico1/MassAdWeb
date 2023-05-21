import React from 'react';
import { globalStyles } from '../helpers/styles';
import { IoTrashOutline } from 'react-icons/io5'; // Import correcto

const AdjuntoItem = ({ adjunto, index, handleDeleteAdjunto }) => {
  return (
    <div style={index === 0 ? { display: 'flex', alignItems: 'center', padding: '20px', width: '100%', justifyContent: 'center' } : { display: 'flex', alignItems: 'center', padding: '20px', borderTop: '1px solid', width: '100%', justifyContent: 'center' }}>
      <a
        href={adjunto.url}
        style={{ ...globalStyles.coloredText, padding: '20px', paddingRight: '30px' }}
        target="_blank"
        rel="noopener noreferrer">
        Ver archivo adjunto {index + 1}
      </a>

      <button onClick={() => handleDeleteAdjunto(adjunto)} style={{ display: 'flex', alignItems: 'center', backgroundColor: 'gray', padding: '10px', borderRadius: '5px', color: 'white' }}>
        <IoTrashOutline size={24} /> {/* Uso correcto del icono */}
        <span>Borrar</span>
      </button>
    </div>
  )
}

export default AdjuntoItem;
