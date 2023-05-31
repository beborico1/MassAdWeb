import React from 'react';
import TextInputComponent from '../TextInputComponent';

const DemograficosForm = ({ciudad, setCiudad, codigoPostal, setCodigoPostal}) => {
  return (
    <div className="flex flex-col mb-5 w-full max-w-2xl items-center">
      <TextInputComponent
        placeholder="Ingresa tu ciudad"
        value={ciudad}
        setValue={setCiudad}
        type="text"
        required={true}
        autoComplete="address-level2"
      />

      <TextInputComponent
        placeholder="Ingresa tu código postal"
        value={codigoPostal}
        setValue={setCodigoPostal}
        type="number"
        required={true}
        autoComplete="postal-code"
      />
    </div>
  )
}

export default DemograficosForm;
