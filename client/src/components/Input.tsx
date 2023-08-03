import React from 'react'

export const Input = ({placeholder, type, onChange, name, value}) => {
  return (
    <>
    <div className="relative">
        <input type={type} placeholder={placeholder} 
        className="bg-white w-full rounded-md px-4 py-2 focus:border-2 border-2 border-gray-500 focus:border-accent outline-none"
        autoComplete='off'
        name={name}
        value={value}
        onChange={onChange}
        />
    </div>
    </>
  )
}
