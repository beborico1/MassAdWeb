import React from 'react';
//import '../../helpers/estilos/crearcampana/EspecificacionesPauta.css';

const EspecificacionesPauta = ({ pautaSpecs, setPautaSpecs }) => {
    return (
        <textarea
            className='w-full max-w-2xl p-4 border-none rounded-lg shadow-sm text-base resize-none box-border focus:outline-none focus:shadow-md'
            placeholder='Escribe aquí las especificaciones de la pauta...'
            rows={4}
            onChange={(e) => setPautaSpecs(e.target.value)}
            value={pautaSpecs}
        />
    );
};

export default EspecificacionesPauta;
