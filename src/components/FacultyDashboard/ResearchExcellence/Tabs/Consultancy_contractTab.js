import React, { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useModal } from 'react-simple-modal-provider';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import ConsultacyContract from '../Forms/Consultancy_Contract/Consultancy_ContractForm';
import ConsultacyContractfield from '../Forms/Consultancy_Contract/Consultancy_Contractfeilds';
export default function ConsultancyContractTab() {
  const { open: openModal } = useModal("ConsultancyContractFormModal");
  const [isFormVisible, setFormVisibility] = useState(false);
  const {data: session} = useSession();
  const [consultancyData, setconsultancyData] = useState([]);


  useEffect(() => {
    const fetchConsultancy_Data = async () => {
      try {
        if (session) {
          const res = await axios.get(`/api/Research_projects/get_Consultancy_services`, {
            params: {
              username: session.user.username,
            }
          });
          setconsultancyData(res.data);
        }
      } catch (error) {
        console.error("Error fetching Consultancy  information:", error);
      }
    };

    fetchConsultancy_Data();
  }, [session]);
 
const handleDeleteProject = async (id) => {
  try {
    await axios.delete(`/api/Research_projects/delete_consultancy_contract?id=${id}`);
    console.log('Project deleted successfully');
  } catch (error) {
    console.error('Error deleting project:', error);
  }
};

  return (
    <div >
      
      <div className='flex justify-end items-center gap-x-8 text-2xl m-4'>
        <FiPlusCircle className='text-blue-900 cursor-pointer' onClick={openModal} />
        {/* <RiDeleteBin6Line className='text-red-600' onClick={handleDeleteProject} /> */}
      </div>

      {isFormVisible && (
    <ConsultacyContract/>
      )}
      {consultancyData.map((data, index) => (
        <div className= "flex flex-col "key={index}>
          <ConsultacyContractfield data={data} onDelete={handleDeleteProject} />
        
        </div>
      ))}
    </div>
  );
}
