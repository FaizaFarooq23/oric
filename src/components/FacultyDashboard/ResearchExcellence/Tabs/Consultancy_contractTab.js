import React, { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useModal } from 'react-simple-modal-provider';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import ConsultacyContract from '../Forms/Consultancy_Contract/Consultancy_ContractForm';
import ConsultacyContractfield from '../Forms/Consultancy_Contract/Consultancy_Contractfeilds';
import SuccessModal from '../components/UI/SuccessMessage';
import { deleteFile } from '../Utility/Deleteimage';
export default function ConsultancyContractTab() {
  const { open: openModal } = useModal("ConsultancyContractFormModal");
  const [isFormVisible, setFormVisibility] = useState(false);
  const {data: session} = useSession();
  const [consultancyData, setconsultancyData] = useState([]);
  const [showDeleteSuccessDialog, setShowDeleteSuccessDialog] = useState(false);

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
 
const handleDeleteProject = async (id,filename) => {
  try {
    await deleteFile(
      session.user.username,
        "consultancy_contract", // or any other table name relevant to your project
        filename, // The filename you want to delete
      `/api/Imagesfeilds/filedelete`
    );

    await axios.delete(`/api/Research_projects/delete_consultancy_contract?id=${id}`);
    setShowDeleteSuccessDialog(true);
      console.log('Project deleted successfully');
      setTimeout(() => {
        setShowDeleteSuccessDialog(false);
      }, 3000);
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
     {consultancyData.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No data exists at the moment.
        </div>
      ) : (
        consultancyData.map((data, index) => (
          <div className="flex flex-col" key={index}>
            <ConsultacyContractfield data={data} onDelete={handleDeleteProject} />
          </div>
        ))
      )}
      {
          showDeleteSuccessDialog &&
          (
            <SuccessModal isOpen={showDeleteSuccessDialog} p={`Your Data has been deleted `} onClose={()=>{
              setShowDeleteSuccessDialog(false)
            }}/>
          )
        }
    </div>
  );
}
