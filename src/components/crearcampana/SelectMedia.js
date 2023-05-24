import React from 'react';

const SelectMedia = ({ selectedMedia, setSelectedMedia }) => {
  return (
    <select
      value={selectedMedia}
      onChange={(event) => setSelectedMedia(event.target.value)}
      className='box-border w-full max-w-2xl  mt-5 rounded-md p-2 border border-gray-300 text-base mb-5'
    >
      <option value="">Seleccione el Medio de Comunicación</option>
      <option value="radio">Radio</option>
    </select>
  )
}

export default SelectMedia
