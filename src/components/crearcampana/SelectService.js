import React from 'react';

const SelectService = ({ selectedService, setSelectedService }) => {
  return (
    <select
      value={selectedService}
      onChange={(event) => setSelectedService(event.target.value)}
      style={{width: '100%', marginTop: '20px'}}
    >
      <option value="">Seleccione el Servicio</option>
      <option value="radiosa">Radio SA</option>
    </select>
  )
}

export default SelectService;
