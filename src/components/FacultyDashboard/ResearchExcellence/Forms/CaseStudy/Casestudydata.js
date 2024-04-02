import React from 'react'
import Modal from 'react-modal';
import { FaTimes, FaEdit } from 'react-icons/fa'; 
export default function Casestudydata({ isOpen, closeModal ,data}) {
  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    contentLabel="Case Study Details"
    className="flex gap-y-8 flex-col bg-white max-h-screen shadow-lg ml-auto mt-20 overflow-y-auto mr-auto rounded-md  w-4/5 border-4 p-10 "
  >
    <div >
    <div className="flex justify-end items-end gap-x-6">
        {/* Edit icon */}
        <FaEdit className="text-blue-900 text-xl cursor-pointer" onClick={() => handleEdit()} />
        {/* Cross icon */}
        <FaTimes className="text-red-500 text-xl  cursor-pointer" onClick={closeModal} />
      </div>
          <div>
          <h1 className='text-blue-900 font-serif font-bold text-xl  py-2 m-2 border-black'>Advocacy Details</h1>
           </div>
           
           <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
            <div className="grid grid-cols-2 gap-x-10 w-full"> 
            <span className="text-black text-base font-semibold border-b-2 ]">Government Body</span>
           <span className="text-black text-base font-semibold border-b-2 ">{data.Name_of_Government_Body}</span>
               </div> 
               <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base font-semibold border-b-2 ">CoalitionPartners</span>
           <span className="text-black text-base font-semibold border-b-2 ">{data.Coalation_Partner}</span>
               </div> 
               <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base font-semibold border-b-2 ">Area Advocated</span>
           <span className="text-black text-base font-semibold border-b-2 ">{data.Area_advocated}</span>
               </div>
               <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base font-semibold border-b-2 ">Date Of Presentation</span>
           <span className="text-black text-base font-semibold border-b-2 ">{data.Date_of_presentation}</span>
               </div>
               <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base font-semibold border-b-2 ">Banking Research Status</span>
           <span className="text-black text-base font-semibold border-b-2 ">{data.Banking_research_status}</span>
               </div>
             <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Advocacy Tools</span>
           <span className="text-black text-base font-semibold border-b-2">{data.Advocacy_tools}</span>
            </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Case Study Copy</span>
           <span className="text-black text-base font-semibold border-b-2">National </span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Issue Verification</span>
           <span className="text-black text-base font-semibold border-b-2">{data.Issue_verification}</span>
           </div>
          </div>
          <div className="grid  grid-rows-2 gap-x-10">
           <span className="text-black text-base font-semibold border-b-2 ">Breif Details</span>
          <div className="text-black text-base font-semibold border-b-2">
            <p>
             {data.Breif_Details}
            </p>
            </div>
           </div>
           
           
    </div>
    </Modal>
  );
}

