import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

const ProduccionSpot = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center p-8 bg-gray-200 overflow-y-hidden">
        <button onClick={() => window.history.back()} className='cursor-pointer bg-adstream-500 hover:bg-adstream-300 text-white py-4 px-8 text-center text-base font-semibold rounded-md transition duration-400 absolute top-2 left-2 justify-center items-center flex flex-row'>
          <FaArrowLeft size={20} style={{marginRight: '10px'}}/> Detalle
        </button>

      <h1 className="text-gray-900 text-4xl mb-4 select-none  text-center">Produccion Spot</h1>
    </div>
  )
}

export default ProduccionSpot
