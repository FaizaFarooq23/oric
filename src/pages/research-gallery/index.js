
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
      <div className='text-2xl m-2 items-center text-center font-base  justify-center align-center italic font-sans '>
  <h1> Research Gallery
    </h1>
       </div>
    <div>
        <hr className="my-4 border-t-2 color-black border-black-300 "/>
</div>
<Research_Gallery/>
 
    </div>
  </Baselayout>
  )
}
