
import Baselayout from '@/components/FacultyDashboard/Baselayout/Baselayout'
import ResearchExcellence from '@/components/FacultyDashboard/ResearchExcellence/excellence'
import Welcome from '@/components/Dashboard/components/HamburgarComponents/Welcome'
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function index() {
  const [notice, setNotice] = useState();

  const fetchCalls = async () => {
    try {
      const res = await axios.get(`/api/research_calls`);
      setNotice(res.data.calls[0]);
    } catch (error) {
      console.error("Error fetching notice:", error);
    }
  };

  useEffect(() => {
    fetchCalls();
  }, [])



  return (
    <Baselayout >
      <div className='flex justify-center flex-col gap-x-6 px-8' >
        <Welcome notice={notice} />
        <ResearchExcellence />
      </div>
    </Baselayout>
  )
}
