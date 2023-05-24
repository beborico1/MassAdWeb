import React from 'react';

const DemograficosForm = ({ciudad, setCiudad, codigoPostal, setCodigoPostal}) => {
  return (
    <div className="flex flex-col mb-5 w-full max-w-2xl">
      <input
        placeholder="Ingresa tu ciudad"
        value={ciudad}
        onChange={e => setCiudad(e.target.value)}
        autoCapitalize="words"
        className='box-border p-2 mb-2 border border-gray-300 rounded-md  w-full max-w-2xl shadow-sm'
      />

      <input
        placeholder="Ingresa tu código postal"
        value={codigoPostal}
        onChange={e => setCodigoPostal(e.target.value)}
        type="number"
        className='box-border p-2 border border-gray-300 rounded-md w-full max-w-2xl shadow-sm'
      />
    </div>
  )
}

export default DemograficosForm;
