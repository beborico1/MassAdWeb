import React from 'react';
import { globalStyles } from '../../helpers/styles';
import colors from '../../helpers/colors';

const EspecificacionesPauta = ({ pautaSpecs, setPautaSpecs }) => {
    return (
        <div style={{ width: '100%' }}>
            <textarea
                style={{ ...globalStyles.input, width: '100%' }}
                placeholder='Escribe aquí las especificaciones de la pauta...'
                rows={4}
                onChange={(e) => setPautaSpecs(e.target.value)}
                value={pautaSpecs}
            />
        </div>
    );
};

export default EspecificacionesPauta;
