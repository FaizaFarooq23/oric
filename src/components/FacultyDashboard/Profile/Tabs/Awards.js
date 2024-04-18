import React, { useEffect, useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useModal } from 'react-simple-modal-provider';

import { useSession } from 'next-auth/react';
import axios from 'axios'
import AwardsModal from '../components/Awards/Awards';
import AwardsFields from '../components/Awards/Awardsfeild';
export default function Awards() {
    const { open: openModal } = useModal("AwardsModal");
    const [isFormVisible, setFormVisibility] = useState(false);
    const [awardsData, setawardsData] = useState([]); // [{},{}
    const {data: session} = useSession();

    const fetchawardsData = async () => {
        try{
            const res = await axios.get(`/api/faculty/Awards/getAwards` , {
            params: {
                username: session.user.username,
            }
            });
    
            console.log(res)
    
            setawardsData(res.data);
        }
    
        catch(error){
            console.error("Error fetching personal information:", error);
        }
        }

      
        useEffect(() => {
            // fetch data from db
            if(session){
                fetchawardsData();
            }
            // setEducationalData(data)
        }
        , [session]);


  
    
  
  
  return (
    <div >
    <div className='flex justify-end items-center gap-x-8 text-2xl'>
      <FiPlusCircle className='text-blue-900 cursor-pointer' onClick={openModal} />
      <RiDeleteBin6Line className='text-red-600' />
    </div>

    {isFormVisible && (
     <AwardsModal />
    )}
        {awardsData.length>0 && 
  awardsData.map((awards, index) => (
  <AwardsFields key={index} data={awards} />
    ))
    }

  
  </div>
  )
}
