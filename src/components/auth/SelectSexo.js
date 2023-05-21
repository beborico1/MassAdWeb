import React from 'react';
import '../../helpers/estilos/SelectEstado.css';

const SelectSexo = ({ sexo, setSexo }) => {
    const handleChange = (event) => {
        setSexo(event.target.value);
    };

    return (
        <select
            value={sexo}
            onChange={handleChange}
            className='select-estado'
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
