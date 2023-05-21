import React from 'react';
import '../../helpers/estilos/DemograficosForm.css'

const DemograficosForm = ({ciudad, setCiudad, codigoPostal, setCodigoPostal}) => {
  return (
    <div className="demograficos-form-container">
      <input
        placeholder="Ingresa tu ciudad"
        value={ciudad}
        onChange={e => setCiudad(e.target.value)}
        autoCapitalize="words"
        className='demograficos-input'
      />

      <input
        placeholder="Ingresa tu código postal"
        value={codigoPostal}
        onChange={e => setCodigoPostal(e.target.value)}
        type="number"
        className='demograficos-input'
      />
    </div>
  )
}

export default DemograficosForm;
