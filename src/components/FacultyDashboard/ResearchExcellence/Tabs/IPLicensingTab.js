import React, { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useModal } from 'react-simple-modal-provider';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import IPlicensingForm from '../Forms/IP_Licensing/IP_LicensingForm';
import IPLicensingfeild from '../Forms/IP_Licensing/IP_Licensingfeilds';

export default function IPLicensingTab() {
  const { open: openModal } = useModal("IPLicensingModal");
  const [isFormVisible, setFormVisibility] = useState(false);
  const {data: session} = useSession();
  const [IPLicensingData, setIPLicensingData] = useState([]);


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
    <IPlicensingForm/>
      )}
      {IPLicensingData.map((data, index) => (
        <div className= "flex flex-col "key={index}>
          <IPLicensingfeild data={data} onDelete={handleDeleteProject} />
        
        </div>
      ))}
    </div>
  );
}
