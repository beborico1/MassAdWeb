import React from 'react'

export default function TextInputComponent({value, setValue, placeholder, type, required, disabled, autoComplete }) {
  return (
    <input
        className="box-border p-2 mb-2 border border-gray-300 rounded-md w-11/12 max-w-xl shadow-sm"
        placeholder={placeholder}
        value={value}
        onChange={event => setValue(event.target.value)}
        type={type}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
    />
  )
}
