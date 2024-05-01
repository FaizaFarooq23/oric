import React, { useEffect, useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useModal } from 'react-simple-modal-provider';
import { useSession } from 'next-auth/react';
import axios from 'axios'
import AwardsModal from '../components/Awards/Awards';
import AwardsFields from '../components/Awards/Awardsfeild';
import SuccessModal from '../../ResearchExcellence/components/UI/SuccessMessage';
export default function Awards() {
    const { open: openModal } = useModal("AwardsModal");
    const [isFormVisible, setFormVisibility] = useState(false);
    const [awardsData, setawardsData] = useState([]); // [{},{}
    const {data: session} = useSession();
    const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false); // State to control SuccessModal visibility
    const fetchawardsData = async () => {
        try{
            const res = await axios.get(`/api/faculty/Awards/getAwards` , {
            params: {
                username: session.user.username,
            }
            });
    
            console.log(res)
    
            setawardsData(res.data);
        }
    
        catch(error){
            console.error("Error fetching personal information:", error);
        }
        }

      
        useEffect(() => {
            // fetch data from db
            if(session){
                fetchawardsData();
            }
            // setEducationalData(data)
        }
        , [session]);

        const handleDeleteProject = async (id) => {
            try {
              await axios.delete(`/api/faculty/Awards/DeleteAwards?id=${id}`);
              console.log('Project deleted successfully');
              setShowDeleteSuccessModal(true);     } catch (error) {
              console.error('Error deleting project:', error);
            }
          };
  
    
  
  
  return (
    <div >
    <div className='flex justify-end items-center gap-x-8 text-2xl'>
      <FiPlusCircle className='text-blue-900 cursor-pointer' onClick={openModal} />
    </div>

    {isFormVisible && (
     <AwardsModal />
    )}
     {
          showDeleteSuccessModal &&
          (
            <SuccessModal isOpen={showDeleteSuccessModal} p={`Your Data has been deleted `} onClose={()=>{
              setShowDeleteSuccessModal(false)
            }}/>
          )
        }
        {awardsData.length>0 && 
  awardsData.map((awards, index) => (
  <AwardsFields key={index} data={awards} onDelete={handleDeleteProject} />
    ))
    }

  
  </div>
  )
}
