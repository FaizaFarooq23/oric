import { UserContext } from '@/context/UserContext/GlobalProvider'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React, { useContext } from 'react'
import { FaResearchgate } from 'react-icons/fa6'
import { GiCalendarHalfYear } from 'react-icons/gi'
import { TbApps, TbReport } from 'react-icons/tb'

export default function AdminBar() {
const barData = [
{
icon: <TbApps />,
url:" /dashboard"
},
{
icon: <FaResearchgate />,
url:" "
},
{
icon: <TbReport  />,
url:" /reports",
},


]

const { logoutUser } = useContext(UserContext);

const handleLogout = () => {
  logoutUser();
  signOut({ callbackUrl: "http://localhost:3000/" });
};

  return (
    <div className=" z-30 fixed  flex  ">
    <div className=" flex w-16 flex-col items-center  ">
  
      <div className="space-y-16 rounded-md bg-white admin-shadow-left py-5 px-6   flex flex-col justify-between">
       <ul className=' clear-left'>

        {
          barData.map((item, index) => (
            <li className="flex items-center justify-center py-3 text-xl cursor-pointer text-gray-700 hover:text-blue-900" key={index}>
              <Link href={item.url}>
                {item.icon}
              </Link>
            </li>
          ))
        }
       </ul>
        <div className="flex items-center justify-center pb-5">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 cursor-pointer text-gray-700 hover:text-blue-900" onClick={handleLogout}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    
          </svg>
        </div>
      </div>
    </div>
  </div>
  )
}
