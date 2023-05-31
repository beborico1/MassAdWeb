import React from 'react'

export default function BigButtonComponent({ loadingText, handleClick, loading, text, Icon }) {
  return (
    <button className=" w-11/12 max-w-xl p-2 bg-adstream-500 hover:bg-adstream-300 text-white border-none rounded-md cursor-pointer text-xl font-semibold shadow-md hover:shadow-lg transition duration-400 flex flex-row items-center justify-center" onClick={handleClick} >
      {loading ? ( 
          loadingText
      ) : Icon ? <><Icon size={20} className='mr-2'/> {text}</>
          : text
      }
    </button>
  )
}
