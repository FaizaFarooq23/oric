

import Baselayout from '@/components/FacultyDashboard/Baselayout/Baselayout';
import Research_Gallery from '@/components/FacultyDashboard/ResearchGallery/Research_Gallery';
import { UserContext } from '@/context/UserContext/GlobalProvider'
import React, { useContext} from 'react'

export default function index() {
  const {user} = useContext(UserContext);
  return (
    <Baselayout >
    
    <div className='flex justify-center flex-col gap-x-6 px-8' >
      <div className='text-2xl m-2 items-center text-center font-bold  justify-center align-center text-blue-900 '>
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
