import React from 'react';
import '../../helpers/estilos/IdentificacionForm.css'

const IdentificacionForm = ({ nombreCompleto, setNombreCompleto, edad, setEdad, telefono, setTelefono }) => {
    return (
      <div className="identificacion-form-container">
        <input
          className="identificacion-input"
          placeholder="Ingresa tu nombre completo"
          value={nombreCompleto}
          onChange={e => setNombreCompleto(e.target.value)}
          autoCapitalize="words"
        />
        <input
          className="identificacion-input"
          placeholder="Ingresa tu edad"
          value={edad}
          onChange={e => setEdad(e.target.value)}
          type="number"
        />
        <input
          className="identificacion-input"
          placeholder="Ingresa tu teléfono"
          value={telefono}
          onChange={e => setTelefono(e.target.value)}
          type="number"
        />
      </div>
    );      
};

export default IdentificacionForm;
