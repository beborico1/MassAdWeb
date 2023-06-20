import React from 'react'

export default function TitleComponent({ title }) {
  return (
    <h1 className="text-gray-900 text-4xl mb-8 text-center w-11/12 max-w-xl select-none">  
      {title}
    </h1>
  )
}
