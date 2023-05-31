import React from 'react'
import TextInputComponent from '../TextInputComponent';

const EmpresaForm = ({ nombreEmpresa, setNombreEmpresa, puesto, setPuesto, rfc, setRfc, direccionEmpresa, setDireccionEmpresa, telefonoEmpresa, setTelefonoEmpresa }) => {
  return (
    <div className="flex flex-col mb-5 w-full max-w-2xl items-center">

      <TextInputComponent
        placeholder="Ingresa el Nombre de la Empresa"
        value={nombreEmpresa}
        setValue={setNombreEmpresa}
        type="text"
        required={true}
        autoComplete="organization"
      />

      <TextInputComponent
        placeholder='Ingresa el Puesto'
        value={puesto}
        setValue={setPuesto}
        type="text"
        required={true}
        autoComplete="organization"
      />

      <TextInputComponent
        placeholder="Ingresa el RFC (opcional)"
        value={rfc}
        setValue={setRfc}
        type="text"
        required={false}
        autoComplete="organization"
      />

      <TextInputComponent
        placeholder="Ingresa la Dirección (opcional)"
        value={direccionEmpresa}
        setValue={setDireccionEmpresa}
        type="text"
        required={false}
        autoComplete="street-address"
      />

      <TextInputComponent
        placeholder="Ingresa el Teléfono (opcional)"
        value={telefonoEmpresa}
        setValue={setTelefonoEmpresa}
        type="number"
        required={false}
        autoComplete="tel"
      />

    </div>
  )
}

export default EmpresaForm;
