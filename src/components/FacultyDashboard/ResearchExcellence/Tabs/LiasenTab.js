import React, { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useModal } from 'react-simple-modal-provider';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Liasendeveloped from '../Forms/Liasen/Liasendeveloped';
import Liasenfeilds from '../Forms/Liasen/Liasenfeilds';

export default function LiasenTab() {
  const [liasenData, setLiasenData] = useState([]);
  const { open: openModal } = useModal("LiasendevelopedFormModal");
  const [isFormVisible, setFormVisibility] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchLiasenData = async () => {
      try {
        if (session) {
          const res = await axios.get(`/api/Research_projects/get_liasen`, {
            params: {
              username: session.user.username,
            }
          });
          setLiasenData(res.data);
        }
      } catch (error) {
        console.error("Error fetching liasen information:", error);
      }
    };

    fetchLiasenData();
  }, [session]);
  const handleDeleteProject = async (Liasen_id) => {
    try {
      await axios.delete(`/api/Research_projects/delete_liasen?Liasen_id=${Liasen_id}`);
      console.log('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };
  return (
    <div>
      <div className='flex justify-end items-center gap-x-8 text-2xl m-4'>
        <FiPlusCircle className='text-blue-900 cursor-pointer' onClick={openModal} />
      </div>
      
      {isFormVisible && (
        <Liasendeveloped />
      )}
      
     
      {liasenData.map((data, index) => (
      <Liasenfeilds key={index} data={data} onDelete={handleDeleteProject} />
      ))}
    </div>
  );
}
