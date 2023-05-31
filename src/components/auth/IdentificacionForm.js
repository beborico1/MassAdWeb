import React from 'react';
import TextInputComponent from '../TextInputComponent';

const IdentificacionForm = ({ nombreCompleto, setNombreCompleto, edad, setEdad, telefono, setTelefono }) => {
    return (
      <div className="flex flex-col mb-5 w-full max-w-2xl items-center">

        <TextInputComponent
          placeholder="Ingresa tu nombre completo"
          value={nombreCompleto}
          setValue={setNombreCompleto}
          type="text"
          required={true}
          autoComplete="name"
        />

        <TextInputComponent
          placeholder="Ingresa tu edad"
          value={edad}
          setValue={setEdad}
          type="number"
          required={true}
          autoComplete="age"
        />

        <TextInputComponent
          placeholder="Ingresa tu teléfono"
          value={telefono}
          setValue={setTelefono}
          type="number"
          required={true}
          autoComplete="tel"
        />

      </div>
    );      
};

export default IdentificacionForm;
