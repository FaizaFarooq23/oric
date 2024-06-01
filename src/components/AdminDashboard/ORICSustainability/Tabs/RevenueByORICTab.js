import React, { useEffect, useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useModal } from 'react-simple-modal-provider';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { deleteFile } from '@/components/FacultyDashboard/ResearchExcellence/Utility/Deleteimage';
import SuccessModal from '@/components/FacultyDashboard/ResearchExcellence/components/UI/SuccessMessage';
import RevenueByORICForm from '../Forms/RevenueByORIC/RevenueByORICForm';
import RevenueByORICFields from '../Forms/RevenueByORIC/RevenueByORICfeilds';
export default function RevenueByORICTab() {
    const { open: openModal } = useModal("RevenueByORICFormModal");
    const [isFormVisible, setFormVisibility] = useState(false);
    const [RevenueByORIC, setRevenueByORIC] = useState([]); // [{},{}
    const {data: session} = useSession();
    const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false); // State to control SuccessModal visibility
    const fetchRevenueByORIC = async () => {
        try{
            const res = await axios.get(`/api/ORIC_Sustainability/Revenue/get_RevenueByORIC` , {
            params: {
                username: session.user.username,
            }
            });
    
            console.log(res)
    
            setRevenueByORIC(res.data);
        }
    
        catch(error){
            console.error("Error fetching  information:", error);
        }
        }

      
        useEffect(() => {
            // fetch data from db
            if(session){
                fetchRevenueByORIC();
            }
        }
        , [session]);

        const handleDeleteProject = async (id,filename) => {
            try {
              await deleteFile(
                session.user.username,
                  "RevenueByORIC", // or any other table name relevant to your project
                  filename, // The filename you want to delete
                `/api/Imagesfeilds/filedelete`
              );
            
              await axios.delete(`/api/ORIC_Sustainability/Revenue/Delete-RevenueByORIC?id=${id}`);
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
     <RevenueByORICForm/>
    )}
     {
          showDeleteSuccessModal &&
          (
            <SuccessModal isOpen={showDeleteSuccessModal} p={`Your Data has been deleted `} onClose={()=>{
              setShowDeleteSuccessModal(false)
            }}/>
          )
        } 
         {RevenueByORIC.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No data exists at the moment.
        </div>
      ) : (
        RevenueByORIC.length>0 && 
        RevenueByORIC.map((RevenueByORIC, index) => (
        <RevenueByORICFields key={index} data={RevenueByORIC} onDelete={handleDeleteProject} />
          ))
      )}

  
  </div>
  )
}
