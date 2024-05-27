import React, { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useModal } from 'react-simple-modal-provider';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import IPandPatentForm from '../Forms/IPDisclosure/IPform';
import IPfield from '../Forms/IPDisclosure/IPfeilds';
import SuccessModal from '../components/UI/SuccessMessage'; // Import SuccessModal component
import { deleteFile ,deleteFiles } from '../Utility/Deleteimage';

export default function IPTab() {
  const { open: openModal } = useModal("IPandPatentFormModal");
  const [isFormVisible, setFormVisibility] = useState(false);
  const {data: session} = useSession();
  const [IPandPatentData, setIPandPatentData] = useState([]);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false); // State to control SuccessModal visibility

  useEffect(() => {
    const fetchIPandPatentdata = async () => {
      try {
        if (session) {
          const res = await axios.get(`/api/IPandPatent/get_ipandpatent`, {
            params: {
              username: session.user.username,
            }
          });
          setIPandPatentData(res.data);
        }
      } catch (error) {
        console.error("Error fetching information:", error);
      }
    };

    fetchIPandPatentdata();
  }, [session]);
 
  const handleDeleteProject = async (id,filenames) => {
    try {
      const username = session.user.username;
      console.log(filenames);
      await deleteFiles(username, "ipandpatent", filenames, `/api/Imagesfeilds/multiplefilesdelete`);
      await axios.delete(`/api/IPandPatent/delete_ipandpatent?id=${id}`);
      console.log('Project deleted successfully');
      setShowDeleteSuccessModal(true); // Show SuccessModal after successful deletion
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleCloseDeleteSuccessModal = () => {
    setShowDeleteSuccessModal(false);
  };

  return (
    <div >
      <div className='flex justify-end items-center gap-x-8 text-2xl m-4'>
        <FiPlusCircle className='text-blue-900 cursor-pointer' onClick={openModal} />
      </div>

      {isFormVisible && (
        <IPandPatentForm/>
      )}
      
      {/* Render SuccessModal if showDeleteSuccessModal is true */}
      {showDeleteSuccessModal && <SuccessModal isOpen={showDeleteSuccessModal} p={`Your Data Has Been Deleted`} onClose={()=>{
          setShowDeleteSuccessModal(false)
        }} />}

{IPandPatentData.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No data exists at the moment.
        </div>
      ) : (
        IPandPatentData.map((data, index) => (
          <div className="flex flex-col" key={index}>
            <IPfield data={data} onDelete={handleDeleteProject} />
          </div>
        ))
      )}
    </div>
  );
}
