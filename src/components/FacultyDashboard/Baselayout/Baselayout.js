import React from 'react'
import Sidebar from '../Sidebar/Sidebar'

export default function Baselayout({children}) {
  return (
    <div className='flex my-1'>
        <div className='w-[8%]'>
        <Sidebar/>
        </div>
        <div className="w-[92%]">{children}</div>
    </div>
  )
}
