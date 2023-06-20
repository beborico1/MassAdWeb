import React from 'react'

export default function Card({ titulo, descripcion }) {
  return (
    <div className="p-2 border border-gray-300 rounded-lg mb-6 shadow-md bg-white pb-5 pt-5 text-gray-800 w-full">
      <h1 className='text-2xl mb-2 ml-5 mr-5 text-adstream-500 select-none'>{titulo}</h1>
      <p className="text-base text-gray-700 ml-5 break-words">{descripcion}</p>
    </div>
  )
}
