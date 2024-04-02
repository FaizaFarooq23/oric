import React, { useState } from 'react'
import { TiTick } from 'react-icons/ti'

export default function EditableField({label, isEditingValue, data, updateInfo, editedValue, handleValueClick}) {
  const [val, setVal] = useState(editedValue)
  const handleValueChange = (e) => {
    const updatedData = data.map(obj =>
      obj.label === label ? { ...obj, value: val } : obj
    );

    updateInfo(updatedData);
    handleValueClick();
  }

  return (
    <div className="flex items-center justify-start gap-x-20 ">
    <span className="w-1/3 text-gray-500  font-medium">{label}</span>
    {!isEditingValue ? 
    <span
      className={`w-2/3 text-black `}
    >
      {editedValue}
    </span>
    :
    <div className='flex items-center'>
    <input className='border-b border-blue-900 focus:outline-none text-black' value={val}
      onChange={(e) => setVal(e.target.value)}
    />
    <TiTick className='text-blue-900  cursor-pointer' 
    onClick={handleValueChange}/>
    </div>
    }
  </div>
  )
}
