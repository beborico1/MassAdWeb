import React from 'react';
//import '../../helpers/estilos/crearcampana/Presupuesto.css'

const Presupuesto = ({ budget, setBudget }) => {

  return (
    <div className="flex flex-col items-center justify-center m-5 p-5 w-full max-w-2xl rounded-custom bg-gray-100 pb-12 shadow-custom border border-gray-300 rounded-lg mb-6 shadow-md pt-5 text-gray-800 px-8">
      <p className="text-xl font-bold text-gray-700 mb-5 text-center box-border ml-0">
      ${budget} mxn
      </p>
      <input 
        type="range" 
        className="w-full h-2 bg-white rounded-full outline-none"
        min={0}
        max={100000}
        step={200}
        value={budget}
        onChange={event => setBudget(parseInt(event.target.value))}
      />
    </div>
  );
}

export default Presupuesto;
