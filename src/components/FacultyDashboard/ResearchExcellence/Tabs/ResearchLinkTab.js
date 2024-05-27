import React, { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useModal } from 'react-simple-modal-provider';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import ResearchLinkageForm from '../Forms/ResearchLinkages/ResearchLinkageForm';
import Linkfield from '../Forms/ResearchLinkages/Linkfeild';
import SuccessModal from '../components/UI/SuccessMessage';
import { deleteFile } from '../Utility/Deleteimage';
export default function ResearchLinkTab() {
  const { open: openModal } = useModal("ResearchLinkageFormModal");
  const [isFormVisible, setFormVisibility] = useState(false);
  const {data: session} = useSession();
  const [research_linkageData, setresearch_linkageData] = useState([]);
  const [showDeleteSuccessDialog, setShowDeleteSuccessDialog] = useState(false);
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
   
const handleDeleteProject = async (id,filename) => {
  try {
    await deleteFile(
      session.user.username,
        "research_linkage", // or any other table name relevant to your project
        filename, // The filename you want to delete
      `/api/Imagesfeilds/filedelete`
    )
    await axios.delete(`/api/Research_projects/delete_research_link?id=${id}`);
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
      
      </div>

      {isFormVisible && (
    <ResearchLinkageForm/>
      )}
       {research_linkageData.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No data exists at the moment.
        </div>
      ) : (
        research_linkageData.map((data, index) => (
          <div className="flex flex-col" key={index}>
            <Linkfield data={data} onDelete={handleDeleteProject} />
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
