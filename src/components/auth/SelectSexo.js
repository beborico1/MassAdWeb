import React from 'react';

const SelectSexo = ({ sexo, setSexo }) => {
    const handleChange = (event) => {
        setSexo(event.target.value);
    };

    return (
        <select
            value={sexo}
            onChange={handleChange}
            className='box-border  w-full max-w-2xl  mt-5 rounded-md p-2 border border-gray-300 text-base mb-5'
        >
            <option value="">Seleccione el Sexo</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
            <option value="Prefiero no decirlo">Prefiero no decirlo</option>
        </select>
    );
};

export default SelectSexo;
