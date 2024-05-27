import React from 'react'
import Modal from 'react-modal';
import { FaTimes, FaEdit } from 'react-icons/fa'; 
export default function Casestudydata({ isOpen, closeModal ,data}) {
  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    contentLabel="Case Study Details"
    className="flex gap-y-8 flex-col bg-white max-h-screen shadow-lg ml-auto overflow-y-auto mr-auto rounded-md  w-4/5 border-4 p-10 "
  >
    <div >
    <div className="flex justify-end items-end gap-x-6">
     
      
        {/* Cross icon */}
        <FaTimes className="text-red-500 text-xl  cursor-pointer" onClick={closeModal} />
      </div>
          <div>
          <h1 className='text-blue-900 font-serif font-bold text-xl  py-2 m-2 border-black'>Advocacy Details</h1>
           </div>
           
           <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
            <div className="grid grid-cols-2 gap-x-10 w-full"> 
            <span className="text-black text-base font-semibold  ]">Government Body</span>
           <span className="text-black text-base font-semibold  ">{data.Name_of_Government_Body}</span>
               </div> 
               <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base font-semibold  ">CoalitionPartners</span>
           <span className="text-black text-base font-semibold  ">{data.Coalation_Partner}</span>
               </div> 
               <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base font-semibold  ">Area Advocated</span>
           <span className="text-black text-base font-semibold  ">{data.Area_advocated}</span>
               </div>
               <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base font-semibold  ">Date Of Presentation</span>
           <span className="text-black text-base font-semibold  ">{data.Date_of_presentation.split("T")[0]}</span>
               </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold ">Issue Verification</span>
           <span className="text-black text-base font-semibold ">{data.Issue_verification}</span>
           </div>
          </div>
          <div className="grid ">

          
            <div className='grid grid-rows-2 px-2 py-2 gap-y-2'> 
            <span className="text-black text-base font-semibold  w-48 ">Banking Research Status:</span>
           <span className="text-black text-base font-semibold  ">{data.Banking_research_status}</span>
               </div>
             <div className="grid grid-rows-2 px-2 py-2 gap-y-2  ">
            <span className="text-black text-base font-semibold  w-40 ">Advocacy Tools:</span>
           <span className="text-black text-base font-semibold ">{data.Advocacy_tools}</span>
            </div>
            <div className='grid grid-rows-2 px-2 py-2 gap-x-4 gap-y-2'>
           <span className="text-black text-base font-semibold  w-24 mt-2 ">Breif Details:</span>
           <p className='text-black text-base font-semibold'>
             {data.Breif_Details}
            </p>
            </div>
           </div>
           
           
    </div>
    </Modal>
  );
}

