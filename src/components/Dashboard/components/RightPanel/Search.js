import React from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import DropdownUser from '@/components/AdminDashboard/Header/DropdownUser';
import DropdownNotification from '@/components/AdminDashboard/Header/DropdownNotification';
export default function Search() {
  return (
    <div className='flex items-center justify-end gap-x-6'>

      <div>

      </div>
      <div className='flex  items-center gap-x-5'>
        <ul className="flex items-center gap-2 sm:gap-4">
          <DropdownNotification />
        </ul>
        <DropdownUser />
      </div>
    </div>
  )
}
