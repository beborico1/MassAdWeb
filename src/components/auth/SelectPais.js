import React from 'react';

const SelectPais = ({ pais, setPais }) => {
    const handleChange = (event) => {
        setPais(event.target.value);
    };

    return (
        <select
            value={pais}
            onChange={handleChange}
            className='box-border  w-full max-w-2xl  mt-5 rounded-md p-2 border border-gray-300 text-base mb-5'
        >
            <option value="">Seleccione el País</option>
            <option value="México">México</option>
        </select>
    );
};

export default SelectPais;
