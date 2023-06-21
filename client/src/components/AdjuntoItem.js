import React from 'react';
import { IoTrashOutline } from 'react-icons/io5';

const AdjuntoItem = ({ adjunto, index, handleDeleteAdjunto }) => {
  return (
    <div className="AdjuntoItem flex items-center justify-between py-2 border-b border-gray-300 px-3 w-full">
      <a
        href={adjunto.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-adstream-500">
        Ver archivo adjunto {index + 1}
      </a>

      <button
        onClick={() => handleDeleteAdjunto(adjunto)}
        className="flex items-center space-x-1 text-red-500 focus:outline-none hover:bg-red-100 px-1 py-2 rounded-md transition duration-300">
        <IoTrashOutline size={24} />
        <span>Borrar</span>
      </button>
    </div>
  )
}

export default AdjuntoItem;
