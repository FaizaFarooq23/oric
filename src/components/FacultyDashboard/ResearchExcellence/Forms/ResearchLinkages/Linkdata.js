import React from 'react'
import Modal from 'react-modal';
import { FaTimes, FaEdit } from 'react-icons/fa';

export default function Linkdata({ isOpen, closeModal ,data }) {
  
  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    contentLabel="Case Study Details"
    className="flex gap-y-8 flex-col bg-white shadow-lg h-screen w-screen pb-8   max-h-screen overflow-y-auto  rounded-md  w-4/5 border-4 p-10 "
  >
    <div>
    <div className="flex justify-end items-end gap-x-6">
     
      
        {/* Cross icon */}
        <FaTimes className="text-red-500 text-xl  cursor-pointer" onClick={closeModal} />
      </div>
          <div >
          <h1 className= 'text-blue-900  font-serif font-bold text-xl  py-2 m-2 border-black'>Research Linkage Details</h1>
           </div>
           <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
            <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base  font-semibold ">Type of linkage</span>
           <span className="text-black text-base  font-semibold ">{data.Feild_of_Study}</span>
        </div> 
        <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base  font-semibold">Date of Agreement</span>
           <span className="text-black text-base  font-semibold">{data.Date_of_Agreement.split("T")[0]}</span>
        </div> 
             <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base  font-semibold">Feild of Study</span>
           <span className="text-black text-base  font-semibold">{data.Feild_of_Study}</span>
            </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base  font-semibold">Nationality</span>
           <span className="text-black text-base  font-semibold">{data.Nationality}</span>
           </div>
        
            <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base  font-semibold">Name of Research Grant</span>
           <span className="text-black text-base  font-semibold">{data.Name_of_Research_Grant}</span>
            </div>
            </div>
             <div>
          <h1 className= 'text-blue-900  font-serif font-bold text-xl  pt-4 m-2 border-black'>Host Institue Detail</h1>
          </div> 
          <div className='grid grid-cols-2 gap-y-8 pt-6 gap-x-16'> 
           <div className="grid grid-cols-2 gap-x-10">
           <span className="text-black text-base  font-semibold">Name of Host Institute</span>
          <span className="text-black text-base  font-semibold">{data.Name_of_Host_Institute}</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
           <span className="text-black text-base  font-semibold">Address of Host Institue</span>
          <span className="text-black text-base  font-semibold">{data.Address_of_Host_Institute} </span>
           </div>
           <h1 className= 'text-blue-900  font-serif font-bold text-xl  py-2 m-2 border-black'>Collaborating Agency Detail</h1>
          </div> 
          <div > 
           <div className="grid grid-cols-2 py-8 gap-x-10">
           <span className="text-black text-base  font-semibold ">Collaborating Agency Name</span>
          <span className="text-black text-base  font-semibold">{data. Collaborating_Agency }</span>
           </div>
          
          </div>
          <div className="grid grid-cols-2 gap-x-10">
           <span className="text-black text-base  font-semibold">Collaborating Agency Address</span>
          <span className="text-black text-base  font-semibold">{data.Collaborating_Agency_Address } </span>
           </div>
<div>
<h1 className= 'text-blue-900  font-serif font-bold text-xl  pt-6 m-2 border-black'>Additional Details</h1>
</div>  
           <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
           <div className="grid grid-cols-2 gap-y-10 gap-x-8">
            <span className="text-black text-base  font-semibold ">MoU Copy</span>
           <span className="text-black text-base  font-semibold ">National </span>
            </div>
           </div>
           <div className="grid grid-cols-2 gap-y-10 py-4 gap-x-8">
            <span className="text-black text-base  font-semibold  ">Scope of  Collaboration</span>
           <span className="text-black text-base  font-semibold  ">{ data.Scope }</span>
            </div>
            <div className="grid grid-cols-2 gap-y-10 gap-x-8">
            <span className="text-black text-base  font-semibold  ">Salient Features of Linkage</span>
           <span className="text-black text-base  font-semibold  ">{data.Features}</span>
            </div>
            
           
    </div>
    </Modal>
  );
}

