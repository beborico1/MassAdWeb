import React from 'react'

const NombreCampana = ({nombreCampana, setNombreCampana}) => {
  return (
    <input
        className="box-border p-2 mb-2 border border-gray-300 rounded-md  w-full max-w-2xl  shadow-sm"
        placeholder='Ingresa el Nombre de la Campaña'
        value={nombreCampana}
        onChange={event => setNombreCampana(event.target.value)}
    />
  )
}

export default NombreCampana
