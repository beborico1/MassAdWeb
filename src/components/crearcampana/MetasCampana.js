import React from 'react';
//import '../../helpers/estilos/crearcampana/EspecificacionesPauta.css';

const MetasCampana = ({ metasCampana, setMetasCampana }) => {
    return (
        <textarea
            placeholder='Ingresa las Metas de la Campaña'
            value={metasCampana}
            onChange={(e) => setMetasCampana(e.target.value)}
            className='w-full max-w-2xl p-4 border-none rounded-lg shadow-sm text-base resize-none box-border focus:outline-none focus:shadow-md'
        />
    );
};

export default MetasCampana;
