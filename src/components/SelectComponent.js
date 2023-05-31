import React from 'react';

const SelectComponent = ({ selectedValue, setSelectedValue, options }) => {
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <select
            value={selectedValue}
            onChange={handleChange}
            className='box-border w-11/12 max-w-xl mt-5 rounded-md p-2 border border-gray-300 text-base mb-5'
        >
            <option value="">{options.initialMessage}</option>
            {options.values.map((option, index) => (
                <option value={option} key={index}>{option}</option>
            ))}
        </select>
    );
};

export default SelectComponent;
