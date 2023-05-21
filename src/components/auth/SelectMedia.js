import React from 'react';
import '../../helpers/estilos/SelectEstado.css';

const SelectMedia = ({ selectedMedia, setSelectedMedia }) => {
  return (
    <select
      value={selectedMedia}
      onChange={(event) => setSelectedMedia(event.target.value)}
      className='select-estado'
    >
      <option value="">Seleccione el Medio de Comunicación</option>
      <option value="radio">Radio</option>
    </select>
  )
}

export default SelectMedia
