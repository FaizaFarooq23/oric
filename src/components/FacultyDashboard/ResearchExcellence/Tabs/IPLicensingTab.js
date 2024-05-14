import React, { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useModal } from 'react-simple-modal-provider';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import IPlicensingForm from '../Forms/IP_Licensing/IP_LicensingForm';
import IPLicensingfeild from '../Forms/IP_Licensing/IP_Licensingfeilds';
import SuccessModal from '../components/UI/SuccessMessage';

export default function IPLicensingTab() {
  const { open: openModal } = useModal("IPLicensingModal");
  const [isFormVisible, setFormVisibility] = useState(false);
  const {data: session} = useSession();
  const [IPLicensingData, setIPLicensingData] = useState([]);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false); // State to control SuccessModal visibility

  useEffect(() => {
    const fetchIPLicensingdata = async () => {
      try {
        if (session) {
          const res = await axios.get(`/api/IPLicensing/get_IPLicensing`, {
            params: {
              username: session.user.username,
            }
          });
          setIPLicensingData(res.data);
        }
      } catch (error) {
        console.error("Error fetching information:", error);
      }
    };

    fetchIPLicensingdata();
  }, [session]);
 
const handleDeleteProject = async (id) => {
  try {
    await axios.delete(`/api/IPLicensing/Delete_IPLicensing?id=${id}`);
    console.log('Project deleted successfully');
      setShowDeleteSuccessModal(true); // Show SuccessModal after successful deletion
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
    <IPlicensingForm/>
      )}
          {IPLicensingData.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No data exists at the moment.
        </div>
      ) : (
        IPLicensingData.map((data, index) => (
          <div className="flex flex-col" key={index}>
            <IPLicensingfeild data={data} onDelete={handleDeleteProject} />
          </div>
        ))
      )}
        {showDeleteSuccessModal && <SuccessModal isOpen={showDeleteSuccessModal} p={`Your Data Has Been Saved`} onClose={()=>{
          setShowDeleteSuccessModal(false)
        }} />}
    </div>
  );
}
