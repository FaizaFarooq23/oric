
import Baselayout from '@/components/Baselayout/Baselayout'
import Hamburgar from '@/components/Dashboard/Hamburgar'
import RightPanel from '@/components/Dashboard/RightPanel'
import { UserContext } from '@/context/UserContext/GlobalProvider'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useContext, useEffect } from 'react'
import Researchexcellence  from '@/components/Research-excellence/excellence'
import Welcome from '@/components/Dashboard/components/HamburgarComponents/Welcome'
export default function index() {
  return (
    <Baselayout >
    <div className='flex justify-center flex-col gap-x-6 px-8' >
    <Welcome/>
     <Researchexcellence/>
    </div>
  </Baselayout>
  )
}
