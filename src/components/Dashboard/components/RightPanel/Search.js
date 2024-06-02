import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
export default function Search() {
  return (
    <div className='flex items-center justify-end gap-x-6'>
   
    <div>
    <IoIosNotificationsOutline className='text-2xl cursor-pointer' />
    </div>
    <div className='flex  items-center gap-x-1'>
      <img src="images/profile.png" alt="profile" className='h-12 w-16 rounded-2xl' />
      <MdKeyboardArrowDown className='text-2xl hover:text-blue-900 cursor-pointer '/>

    </div>
    </div>
  )
}
