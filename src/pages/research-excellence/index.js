
import Baselayout from '@/components/FacultyDashboard/Baselayout/Baselayout'
import Hamburgar from '@/components/Dashboard/Hamburgar'
import RightPanel from '@/components/Dashboard/RightPanel'
import { UserContext } from '@/context/UserContext/GlobalProvider'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useContext, useEffect } from 'react'
import ResearchExcellence  from '@/components/FacultyDashboard/ResearchExcellence/excellence'
import Welcome from '@/components/Dashboard/components/HamburgarComponents/Welcome'
export default function index() {
  return (
    <Baselayout >
    <div className='flex justify-center flex-col gap-x-6 px-8' >
    <Welcome/>
     <ResearchExcellence/>
    </div>
  </Baselayout>
  )
}
