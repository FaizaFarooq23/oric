import Register from '@/components/Register/Register'
import React from 'react'

export default function index() {
  return (
    <div className='flex flex-col justify-between items-center bg-blue-900 '>
    <div className='z-50'>
    <Register />
    </div>
    <img src="images/rectangle.svg" alt="" className="absolute bottom-0 right-0 h-96 z-10 " />

  </div>
  )
}
