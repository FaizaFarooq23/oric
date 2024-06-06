import Register from '@/components/FacultyDashboard/Register/Register'
import React from 'react'

export default function index() {
  return (
    <div className='flex flex-col overflow-y-scroll no-scrollbar justify-between items-center bg-blue-900 '>
    <div className='z-50'>
    <Register />
    </div>
    <img src="images/rectangle_box.svg" alt="" className="absolute bottom-0 right-0 h-96 z-10 " />

  </div>
  )
}
