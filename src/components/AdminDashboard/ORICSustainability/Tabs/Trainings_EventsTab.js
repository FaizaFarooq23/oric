import React, { useEffect, useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useModal } from 'react-simple-modal-provider';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Trainings_EventsForm from '../Forms/Training_Events/Trainings_EventsForm';
import TrainingEventsField from '../Forms/Training_Events/Training_EventsFeilds';
import SuccessModal from '@/components/FacultyDashboard/ResearchExcellence/components/UI/SuccessMessage';
export default function Trainings_EventsTab() {
    const { open: openModal } = useModal("Trainings_EventsForm");
    const [isFormVisible, setFormVisibility] = useState(false);
    const [Trainings_Events, setTrainings_Events] = useState([]); // [{},{}
    const {data: session} = useSession();
    const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false); // State to control SuccessModal visibility
    const fetchTrainings_Events = async () => {
        try{
            const res = await axios.get(`/api/ORIC_Sustainability/Trainings_Events/get` , {
            params: {
                username: session.user.username,
            }
            });
    
            console.log(res)
    
            setTrainings_Events(res.data);
        }
    
        catch(error){
            console.error("Error fetching  information:", error);
        }
        }

      
        useEffect(() => {
            // fetch data from db
            if(session){
                fetchTrainings_Events();
            }
            // setEducationalData(data)
        }
        , [session]);

        const handleDeleteProject = async (id) => {
            try {

            
              await axios.delete(`/api/ORIC_Sustainability/Trainings_Events/delete?id=${id}`);
              console.log('Project deleted successfully');
              setShowDeleteSuccessModal(true);     } catch (error) {
              console.error('Error deleting project:', error);
            }
          };
  
    
  
  
  return (
    <div >
   <div className="flex justify-end items-center gap-x-8 text-2xl mr-8">
     <span className="text-lg font-semibold text-blue-900">Add Events</span>
        <FiPlusCircle
          className="text-blue-900 cursor-pointer"
          onClick={openModal}
        />
      </div>

    {isFormVisible && (
     <Trainings_EventsForm/>
    )}
     {
          showDeleteSuccessModal &&
          (
            <SuccessModal isOpen={showDeleteSuccessModal} p={`Your Data has been deleted `} onClose={()=>{
              setShowDeleteSuccessModal(false)
            }}/>
          )
        } 
         {Trainings_Events.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No data exists at the moment.
        </div>
      ) : (
        Trainings_Events.length>0 && 
        Trainings_Events.map((Trainings_Events, index) => (
        <TrainingEventsField key={index} data={Trainings_Events} onDelete={handleDeleteProject} />
          ))
      )}

  
  </div>
  )
}
