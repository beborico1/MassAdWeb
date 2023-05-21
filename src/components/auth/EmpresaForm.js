import React from 'react'
import '../../helpers/estilos/EmpresaForm.css'

const EmpresaForm = ({ nombreEmpresa, setNombreEmpresa, puesto, setPuesto, rfc, setRfc, direccionEmpresa, setDireccionEmpresa, telefonoEmpresa, setTelefonoEmpresa }) => {
  return (
    <div className="empresa-form-container">
      <input
        placeholder='Ingresa el Nombre de la Empresa'
        value={nombreEmpresa}
        onChange={e => setNombreEmpresa(e.target.value)}
        autoCapitalize="words"
        className='empresa-input'
      />
      <input
        placeholder='Ingresa el Puesto'
        value={puesto}
        onChange={e => setPuesto(e.target.value)}
        className='empresa-input'
      />
      <input
        placeholder='Ingresa el RFC (opcional)'
        value={rfc}
        onChange={e => setRfc(e.target.value)}
        className='empresa-input'
      />
      <input
        placeholder='Ingresa la Dirección (opcional)'
        value={direccionEmpresa}
        onChange={e => setDireccionEmpresa(e.target.value)}
        className='empresa-input'
      />
      <input
        placeholder='Ingresa el Teléfono (opcional)'
        value={telefonoEmpresa}
        onChange={e => setTelefonoEmpresa(e.target.value)}
        type = 'number'
        className='empresa-input'
      />
    </div>
  )
}

export default EmpresaForm;
