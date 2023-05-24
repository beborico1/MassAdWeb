import React from 'react';

const SelectService = ({ selectedService, setSelectedService }) => {
  return (
    <select
      className="box-border  w-full max-w-2xl  mt-5 rounded-md p-2 border border-gray-300 text-base mb-5"
      value={selectedService}
      onChange={(event) => setSelectedService(event.target.value)}
    >
      <option value="">Seleccione el Servicio</option>
      <option value="radiosa">Radio SA</option>
    </select>
  )
}

export default SelectService;
