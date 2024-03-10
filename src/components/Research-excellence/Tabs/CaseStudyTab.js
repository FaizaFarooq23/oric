import React, { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useModal } from 'react-simple-modal-provider';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import CasestudyForm from '../Forms/CaseStudy/CasestudyForm';
import Casestudyfeilds from '../Forms/CaseStudy/Casestudyfeilds';

export default function CaseStudyTab() {
  const { open: openModal } = useModal("CaseStudyFormModal");
  const [isFormVisible, setFormVisibility] = useState(false);
  const {data: session} = useSession();
  const [policy_casestudyData, setpolicy_casestudyData] = useState([]);


  useEffect(() => {
    const fetchPolicy_CasestudyData = async () => {
      try {
        if (session) {
          const res = await axios.get(`/api/Research_projects/get_policy_advocay`, {
            params: {
              username: session.user.username,
            }
          });
          setpolicy_casestudyData(res.data);
        }
      } catch (error) {
        console.error("Error fetching liasen information:", error);
      }
    };

    fetchPolicy_CasestudyData();
  }, [session]);


  return (
    <div>
      <div className='flex justify-end items-center gap-x-8 text-2xl m-4'>
        <FiPlusCircle className='text-blue-900 cursor-pointer' onClick={openModal} />
        <RiDeleteBin6Line className='text-red-600' />
      </div>

      {isFormVisible && (
        <CasestudyForm/>
      )}

      {policy_casestudyData.map((data, index) => (
        <Casestudyfeilds key={index} data={data} />
      ))}
    </div>
  );
}
