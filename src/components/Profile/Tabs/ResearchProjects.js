import React, { useEffect, useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import ModalField from '../components/Common/EducationField';
import Researches from '../components/ResearchProjects/Researches';
import { useModal } from 'react-simple-modal-provider';
import ResearchFields from '../components/ResearchProjects/ResearchFields';
import { useSession } from 'next-auth/react';
import axios from 'axios';




export default function ResearchProjects() {
    const { open: openModal } = useModal("ResearchProjectsModal");
    const [isFormVisible, setFormVisibility] = useState(false);
    const [researchData, setResearchData] = useState([]); // [{},{}
    const {data: session} = useSession();

    const fetchResearchData = async () => {
        try{
            const res = await axios.get(`/api/faculty/research_project/fetch` , {
            params: {
                username: session.user.username,
            }
            });
    
            console.log(res)
    
            setResearchData(res.data);
        }
    
        catch(error){
            console.error("Error fetching personal information:", error);
        }
        }

        
        useEffect(() => {
            // fetch data from db
            if(session){
                fetchResearchData();
            }
            // setEducationalData(data)
        }
        , [session]);


  return (
    <div>      <div className='flex justify-end items-center gap-x-8 text-2xl'>
    <FiPlusCircle className='text-blue-900' onClick={openModal} />
    <RiDeleteBin6Line className='text-red-600' />
  </div>

  {isFormVisible && (
    <Researches/>
  )}

  {/* <ModalField data={researchData} /> */}
    {researchData.length>0 && 
    researchData.map((research, index) => (
  <ResearchFields key={index} data={research} />
    ))
    }
  </div>
  )
}
