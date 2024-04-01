import React, { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useModal } from 'react-simple-modal-provider';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import ResearchLinkageForm from '../Forms/ResearchLinkages/ResearchLinkageForm';
import Liasenfeilds from '../Forms/Liasen/Liasenfeilds';
import Linkfield from '../Forms/ResearchLinkages/Linkfeild';

export default function ResearchLinkTab() {
  const { open: openModal } = useModal("ResearchLinkageFormModal");
  const [isFormVisible, setFormVisibility] = useState(false);
  const {data: session} = useSession();
  const [research_linkageData, setresearch_linkageData] = useState([]);


  useEffect(() => {
    const fetchResearch_LinkageData = async () => {
      try {
        if (session) {
          const res = await axios.get(`/api/Research_projects/get_Research_Linkage`, {
            params: {
              username: session.user.username,
            }
          });
          setresearch_linkageData(res.data);
        }
      } catch (error) {
        console.error("Error fetching liasen information:", error);
      }
    };

    fetchResearch_LinkageData();
  }, [session]);
   
const handleDeleteProject = async (id) => {
  try {
    await axios.delete(`/api/Research_projects/delete_research_link?id=${id}`);
    console.log('Project deleted successfully');
  } catch (error) {
    console.error('Error deleting project:', error);
  }
};

  return (
    <div >
      
      <div className='flex justify-end items-center gap-x-8 text-2xl m-4'>
        <FiPlusCircle className='text-blue-900 cursor-pointer' onClick={openModal} />
        <RiDeleteBin6Line className='text-red-600' />
      </div>

      {isFormVisible && (
    <ResearchLinkageForm/>
      )}
       {research_linkageData.map((data, index) => (
        <Linkfield key={index} data={data} onDelete={handleDeleteProject} />
      ))}
    </div>
  );
}
