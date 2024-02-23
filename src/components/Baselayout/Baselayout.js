import React from 'react'
import Sidebar from '../Sidebar/Sidebar'

export default function Baselayout({children}) {
  return (
    <div className='flex my-1 justify-between'>
        <div className='w-[8%]'>
        <Sidebar/>
        </div>
        <div className="w-[90%]">{children}</div>
    </div>
  )
}
