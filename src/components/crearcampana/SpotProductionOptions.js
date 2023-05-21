import React from 'react';

const SpotProductionOptions = ({ spotProduction, setSpotProduction, spotProductionDetails, setSpotProductionDetails }) => {
  return (
    <div style={{width: '100%'}}>
      <p style={{marginBottom: 20}}>¿Requiere producción de spots?</p>
      <select
        value={spotProduction}
        style={{
          width: '100%',
          borderColor: 'yourColorHere',
          borderWidth: '1px',
          borderRadius: '5px'
        }}
        onChange={(event) =>
          setSpotProduction(event.target.value)
        }>
        <option value="">Seleccionar</option>
        <option value="Sí">Sí</option>
        <option value="No">No</option>
      </select>

      {spotProduction === 'Sí' && (
        <div>
          <p style={{paddingVertical: '20px'}}>Detalles de producción de spots:</p>
          <input
            style={{
              height: '40px',
              borderColor: 'gray',
              borderWidth: '1px',
              marginTop: '10px',
              padding: '10px',
            }}
            value={spotProductionDetails}
            onChange={event => setSpotProductionDetails(event.target.value)}
            placeholder="Escriba los detalles aquí"
          />
        </div>
      )}
    </div>
  );
};

export default SpotProductionOptions;
