
import Baselayout from '@/components/Baselayout/Baselayout'
import Hamburgar from '@/components/Dashboard/Hamburgar'
import RightPanel from '@/components/Dashboard/RightPanel'
import { UserContext } from '@/context/UserContext/GlobalProvider'
import axios from 'axios'
import { IoSearchSharp } from "react-icons/io5";
import { useSession } from 'next-auth/react'
import React, { useContext, useEffect } from 'react'
import Researchexcellence  from '@/components/Research-excellence/excellence'
import Welcome from '@/components/Dashboard/components/HamburgarComponents/Welcome'
import Search from '@/components/Dashboard/components/RightPanel/Search'
import Research_Gallery from '@/components/Research_Gallery/Research_Gallery'
export default function index() {
  const {user} = useContext(UserContext);
  return (
    <Baselayout >
    <div className='flex justify-center flex-col gap-x-6 px-8' >
    <div className="flex  justify-between px-4 mt-4 rounded-lg">
        {user &&
        <div className="flex flex-col" >
          <span className="text-2xl font-bold">Hey {user.name}!</span>
          <span className=' text-xl'><h1>Aquire Ideas For Your Next Research Project</h1></span>
        </div>
        }
         <div className='bg-div-gray flex py-2 h-10 mt-2 w-50% justify-end items-end px-2 items-end  rounded-xl '>
        <IoSearchSharp className='text-xl' /> 
        <input type="text" placeholder="Search...." className=' focus:outline-none w-full bg-div-gray px-4'/>
    </div>
        </div>
       
    <div>
        <hr className="my-4 border-t-2 color-black border-black-300 "/>
</div>
<Research_Gallery/>
 
    </div>
  </Baselayout>
  )
}
