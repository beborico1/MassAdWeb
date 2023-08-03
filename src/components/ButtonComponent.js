import React from 'react'

export default function ButtonComponent({ text, onClick, Icon }) {
  return (
    <button className=" bg-massad-500 hover:bg-massad-300 text-white py-2 px-3 text-center text-base font-semibold rounded-md cursor-pointer transition duration-400 flex flex-row items-center" onClick={onClick}>
      {Icon && <Icon size={20} className='mr-2'/>}
      {text}
    </button>
  )
}
