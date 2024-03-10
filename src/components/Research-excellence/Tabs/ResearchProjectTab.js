import React, { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useModal } from 'react-simple-modal-provider';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Researchprojectfeilds from '../Forms/ResearchProjects/Researchprojectfeilds';
import Researchprojectform from '../Forms/ResearchProjects/Researchprojectform';
export default function ResearchProjectTab() {
  const { open: openModal } = useModal("ResearchProjectFormModal");
  const [isFormVisible, setFormVisibility] = useState(false);
  const {data: session} = useSession();
  const [research_projectData, setresearch_projectData] = useState([]);


  useEffect(() => {
    const fetchResearch_ProjectData = async () => {
      try {
        if (session) {
          const res = await axios.get(`/api/Research_projects/get_research_project`, {
            params: {
              username: session.user.username,
            }
          });
          setresearch_projectData(res.data);
        }
      } catch (error) {
        console.error("Error fetching Research Project  information:", error);
      }
    };

    fetchResearch_ProjectData();
  }, [session]);

  return (
    <div >
      
      <div className='flex justify-end items-center gap-x-8 text-2xl m-4'>
        <FiPlusCircle className='text-blue-900 cursor-pointer' onClick={openModal} />
        <RiDeleteBin6Line className='text-red-600' />
      </div>

      {isFormVisible && (
    <Researchprojectform/>
      )}
      {research_projectData.map((data, index) => (
      <Researchprojectfeilds key={index} data={data} />
      ))} 
    </div>
  );
}
