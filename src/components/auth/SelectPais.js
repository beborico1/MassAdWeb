import React from 'react';
import '../../helpers/estilos/SelectEstado.css';

const SelectPais = ({ pais, setPais }) => {
    const handleChange = (event) => {
        setPais(event.target.value);
    };

    return (
        <select
            value={pais}
            onChange={handleChange}
            className='select-estado'
        >
            <option value="">Seleccione el País</option>
            <option value="México">México</option>
        </select>
    );
};

export default SelectPais;
