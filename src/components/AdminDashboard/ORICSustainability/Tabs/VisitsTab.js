import React, { useEffect, useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useModal } from 'react-simple-modal-provider';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import SuccessModal from '@/components/FacultyDashboard/ResearchExcellence/components/UI/SuccessMessage';
import VisitsForm from '../Forms/Visits/VisitsForm';
import VisitsFields from '../Forms/Visits/VisitsFeilds';

export default function VisitsTab() {
    const { open: openModal } = useModal("VisitForm");
    const [isFormVisible, setFormVisibility] = useState(false);
    const [Visits, setVisits] = useState([]); // [{},{}
    const {data: session} = useSession();
    const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false); // State to control SuccessModal visibility
    const fetchVisits = async () => {
        try{
            const res = await axios.get(`/api/ORIC_Sustainability/Visits/fetch` , {
            params: {
                username: session.user.username,
            }
            });
    
            console.log(res)
    
            setVisits(res.data);
        }
    
        catch(error){
            console.error("Error fetching  information:", error);
        }
        }

      
        useEffect(() => {
            // fetch data from db
            if(session){
                fetchVisits();
            }
            // setEducationalData(data)
        }
        , [session]);

        const handleDeleteProject = async (id) => {
            try {

            
              await axios.delete(`/api/ORIC_Sustainability/Visits/Delete?id=${id}`);
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
     <VisitsForm/>
    )}
     {
          showDeleteSuccessModal &&
          (
            <SuccessModal isOpen={showDeleteSuccessModal} p={`Your Data has been deleted `} onClose={()=>{
              setShowDeleteSuccessModal(false)
            }}/>
          )
        } 
         {Visits.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No data exists at the moment.
        </div>
      ) : (
        Visits.length>0 && 
        Visits.map((Visits, index) => (
        <VisitsFields key={index} data={Visits} onDelete={handleDeleteProject} />
          ))
      )}

  
  </div>
  )
}
