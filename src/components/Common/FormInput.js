import React from 'react'

export default function FormInput({ lable, value, setVal, type }) {
  return (
    <div className=' w-full'>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {lable}
        </label>
        <input
          onChange={(e) => setVal(e.target.value)}
          defaultValue={value}
          type={type}
          autoComplete="off"
          required
          className="w-full appearance-none rounded-lg 
       bg-gray-100 py-2 px-3 text-black placeholder-gray-500 focus:z-10 focus:border-mustard-yellow  focus:ring-slate-100  focus:outline-none  sm:text-sm"
        />
      </div>
  )
}
