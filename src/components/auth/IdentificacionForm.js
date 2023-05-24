import React from 'react';

const IdentificacionForm = ({ nombreCompleto, setNombreCompleto, edad, setEdad, telefono, setTelefono }) => {
    return (
      <div className="flex flex-col mb-5 w-full max-w-2xl">
        <input
          className="box-border p-2 mb-2 border border-gray-300 rounded-md  w-full max-w-2xl shadow-sm"
          placeholder="Ingresa tu nombre completo"
          value={nombreCompleto}
          onChange={e => setNombreCompleto(e.target.value)}
          autoCapitalize="words"
        />
        <input
          className="box-border p-2 mb-2 border border-gray-300 rounded-md  w-full max-w-2xl  shadow-sm"
          placeholder="Ingresa tu edad"
          value={edad}
          onChange={e => setEdad(e.target.value)}
          type="number"
        />
        <input
          className="box-border p-2 border border-gray-300 rounded-md  w-full max-w-2xl  shadow-sm"
          placeholder="Ingresa tu teléfono"
          value={telefono}
          onChange={e => setTelefono(e.target.value)}
          type="number"
        />
      </div>
    );      
};

export default IdentificacionForm;
