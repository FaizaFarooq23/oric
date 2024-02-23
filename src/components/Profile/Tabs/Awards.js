import React, { useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useModal } from 'react-simple-modal-provider';
import ModalField from '../components/Common/EducationField';

export default function Awards() {
    const { open: openModal } = useModal("AwardsModal");
    const [isFormVisible, setFormVisibility] = useState(false);
  
    const awardsData = [
      {
        label: "Title",
        value: "Copley",
      },
      {
        label: "Type",
        value: "International",
      },
      {
        label: "Category",
        value: "Best Young Researcher",
      },
      {
        label: "Sponser",
        value: "Royal Society",
      },
      {
        label: "Field ",
        value: "Science",
      },
      {
        label: "Year",
        value: "2020",
      }
  
    ];
  
    
  
  
  return (
    <div >
    <div className='flex justify-end items-center gap-x-8 text-2xl'>
      <FiPlusCircle className='text-blue-900 cursor-pointer' onClick={openModal} />
      <RiDeleteBin6Line className='text-red-600' />
    </div>

    {isFormVisible && (
     <AwardsModal />
    )}

    {/* <ModalField data={awardsData} /> */}
  </div>
  )
}
