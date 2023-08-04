import React from 'react'

export default function BigButtonComponent({ loadingText, handleClick, loading, text, Icon, bgColor }) {
  const baseClasses = "w-11/12 max-w-xl p-2 text-white border-none rounded-md cursor-pointer text-xl font-semibold shadow-md hover:shadow-lg transition duration-400 flex flex-row items-center justify-center";
  const backgroundColor = bgColor ? bgColor : 'bg-massad-500 hover:bg-massad-300';

  return (
    <button className={`${backgroundColor} ${baseClasses}`} onClick={handleClick}>
      {loading ? ( 
          loadingText
      ) : Icon ? <><Icon size={20} className='mr-2'/> {text}</>
          : text
      }
    </button>
  )
}
