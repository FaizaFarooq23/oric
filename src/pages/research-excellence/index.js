
import Baselayout from '@/components/FacultyDashboard/Baselayout/Baselayout'
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
