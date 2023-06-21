import React from 'react';

const SpotProductionOptions = ({ spotProduction, setSpotProduction, spotProductionDetails, setSpotProductionDetails }) => {
  return (
    <div className="flex flex-col items-start justify-center m-5 p-5 rounded-lg bg-white shadow-md w-full max-w-2xl">
      <p className='text-lg mb-3 w-full text-center select-none ml-0'>¿Requiere producción de spots?</p>
      <select
        className="box-border p-2 mb-3 w-full border border-gray-300 rounded-md text-base"
        value={spotProduction}
        onChange={(event) =>
          setSpotProduction(event.target.value)
        }>
        <option value="">Seleccionar</option>
        <option value="Sí">Sí</option>
        <option value="No">No</option>
      </select>

      {spotProduction === 'Sí' && (
        <>
          <p className="text-lg mb-3 w-full text-center select-none ml-0">Detalles de producción de spots:</p>
          <input
            className="p-2 mb-3 w-full border border-gray-500 rounded-md text-base"
            value={spotProductionDetails}
            onChange={event => setSpotProductionDetails(event.target.value)}
            placeholder="Escriba los detalles aquí"
            
          />
        </>
      )}
    </div>
  );
};

export default SpotProductionOptions;
