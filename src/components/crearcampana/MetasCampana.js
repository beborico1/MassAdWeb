import React from 'react';
import { globalStyles } from '../../helpers/styles';

const MetasCampana = ({ metasCampana, setMetasCampana }) => {
    return (
        <textarea
            style={globalStyles.input}
            placeholder='Ingresa las Metas de la Campaña'
            value={metasCampana}
            onChange={(e) => setMetasCampana(e.target.value)}
        />
    );
};

export default MetasCampana;
