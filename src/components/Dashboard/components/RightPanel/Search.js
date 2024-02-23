import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
export default function Search() {
  return (
    <div className='flex items-center justify-between gap-x-6'>
    <div className='bg-div-gray flex w-full py-2 px-2 items-center rounded-xl '>
        <IoSearchSharp className='text-xl' /> 
        <input type="text" placeholder="" className=' focus:outline-none w-full bg-div-gray px-4'/>
    </div>
    <div>
    <IoIosNotificationsOutline className='text-2xl cursor-pointer' />

    </div>
    <div className='flex  items-center gap-x-1'>
      <img src="images/profile.png" alt="profile" className='h-12 w-16 rounded-2xl' />
      <MdKeyboardArrowDown className='text-2xl hover:text-blue-900 cursor-pointer'/>

    </div>
    </div>
  )
}
