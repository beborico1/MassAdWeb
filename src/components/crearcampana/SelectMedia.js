import React from 'react';

const SelectMedia = ({ selectedMedia, setSelectedMedia }) => {
  return (
    <select
      value={selectedMedia}
      onChange={(e) => setSelectedMedia(e.target.value)}
      style={{width: '100%', marginTop: '20px'}}
    >
      <option value="">Seleccione el Medio de Comunicación</option>
      <option value="radio">Radio</option>
    </select>
  )
}

export default SelectMedia
