import React from 'react'

const EmpresaForm = ({ nombreEmpresa, setNombreEmpresa, puesto, setPuesto, rfc, setRfc, direccionEmpresa, setDireccionEmpresa, telefonoEmpresa, setTelefonoEmpresa }) => {
  return (
    <div className="flex flex-col mb-5 w-full max-w-2xl">
      <input
        placeholder='Ingresa el Nombre de la Empresa'
        value={nombreEmpresa}
        onChange={e => setNombreEmpresa(e.target.value)}
        autoCapitalize="words"
        className='box-border p-2 mb-2 border border-gray-300 rounded-md  w-full max-w-2xl  shadow-sm'
      />
      <input
        placeholder='Ingresa el Puesto'
        value={puesto}
        onChange={e => setPuesto(e.target.value)}
        className='box-border p-2 mb-2 border border-gray-300 rounded-md  w-full max-w-2xl  shadow-sm'
      />
      <input
        placeholder='Ingresa el RFC (opcional)'
        value={rfc}
        onChange={e => setRfc(e.target.value)}
        className='box-border p-2 mb-2 border border-gray-300 rounded-md  w-full max-w-2xl  shadow-sm'
      />
      <input
        placeholder='Ingresa la Dirección (opcional)'
        value={direccionEmpresa}
        onChange={e => setDireccionEmpresa(e.target.value)}
        className='box-border p-2 mb-2 border border-gray-300 rounded-md  w-full max-w-2xl  shadow-sm'
      />
      <input
        placeholder='Ingresa el Teléfono (opcional)'
        value={telefonoEmpresa}
        onChange={e => setTelefonoEmpresa(e.target.value)}
        type = 'number'
        className='box-border p-2 border border-gray-300 rounded-md  w-full max-w-2xl  shadow-sm'
      />
    </div>
  )
}

export default EmpresaForm;
