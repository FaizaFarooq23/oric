import React, { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import EducationFormModal from '../components/Education/EducationForm';
import { useModal } from 'react-simple-modal-provider';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import EducationField from '../components/Common/EducationField';
import SuccessModal from '../../ResearchExcellence/components/UI/SuccessMessage';

export default function Education() {
  const { open: openModal } = useModal("EducationFormModal");
  const [isFormVisible, setFormVisibility] = useState(false);
  const [educationalData, setEducationalData] = useState([]); // [{},{}
  const {data: session} = useSession();
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false); // State to control SuccessModal visibility

  const fetchEducationalData = async () => {
    try{
      const res = await axios.get(`/api/faculty/education/get_faculty_education` , {
        params: {
          account_number: session.user.account_number,
        }
      });

      console.log(res)

      setEducationalData(res.data);
    }

    catch(error){
      console.error("Error fetching personal information:", error);
    }
  }

  useEffect(() => {
    // fetch data from db
    if(session){
      fetchEducationalData();
    }
    // setEducationalData(data)
  }, [session]);
  const handleDeleteProject = async (education_id) => {
    try {
      await axios.delete(`/api/faculty/education/delete_education?education_id=${education_id}`);
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
        <EducationFormModal />
      )}
          {
          showDeleteSuccessModal &&
          (
            <SuccessModal isOpen={showDeleteSuccessModal} p={`Your Data has been deleted `} onClose={()=>{
              setShowDeleteSuccessModal(false)
            }}/>
          )
        }
      {educationalData.map((data, index) => (
      <EducationField key={index} data={data} onDelete={handleDeleteProject}/>
      ))}
    </div>
  );
}
