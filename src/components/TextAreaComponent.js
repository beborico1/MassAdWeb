import React from 'react'

export default function TextAreaComponent({value, setValue, placeholder}) {
  return (
    <textarea
        className='p-4 border-none rounded-lg shadow-sm text-base resize-none box-border focus:outline-none focus:shadow-md w-11/12 max-w-xl'
        placeholder={placeholder}
        rows={4}
        onChange={(e) => setValue(e.target.value)}
        value={value}
    />
  )
}
