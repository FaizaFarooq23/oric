import React from 'react'
import Modal from 'react-modal';
import { FaTimes, FaEdit } from 'react-icons/fa';
export default function Product_to_Industrydata({ isOpen, closeModal ,data}) {
  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    contentLabel="Case Study Details"
    className="flex gap-y-8 flex-col bg-white shadow-lg h-screen pb-8  mb-4 ml-auto max-h-screen overflow-y-auto  mr-auto rounded-md  w-4/5 border-4 p-10 "
  >
    <div >
    <div className="flex justify-end items-end gap-x-6">
        {/* Edit icon */}
        <FaEdit className="text-blue-900 text-xl cursor-pointer" onClick={() => handleEdit()} />
        {/* Cross icon */}
        <FaTimes className="text-red-500 text-xl  cursor-pointer" onClick={closeModal} />
      </div>
          <div>
          <h1 className='text-blue-900 font-serif font-bold text-xl  py-2 m-2 border-black'>Research products / process / prototype gone into prefeasibility / industrial scale testing or prototype development</h1>
           </div>
           
           <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
            <div className="grid grid-cols-2 gap-x-10 w-full"> 
            <span className="text-black text-base font-semibold border-b-2 ]">Title of Invention</span>
           <span className="text-black text-base font-semibold border-b-2 ">{data.Title_of_Invention}</span>
               </div> 
             
              
               <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base font-semibold border-b-2 ">Category</span>
           <span className="text-black text-base font-semibold border-b-2 ">{data.Category}</span>
               </div>
               <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base font-semibold border-b-2 ">Nationaity</span>
           <span className="text-black text-base font-semibold border-b-2 ">{data.Nationality}</span>
               </div>
             <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Development Status</span>
           <span className="text-black text-base font-semibold border-b-2">{data.Development_Status}</span>
            </div>
    
          </div>
          <h1 className='text-blue-900 font-serif font-bold text-xl  py-2 border-black'>Details of Lead Inventor</h1>
          <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
          
          <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Name of Lead  </span>
           <span className="text-black text-base font-semibold border-b-2">{data.Name_of_leadInventor}</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Department of Lead  </span>
           <span className="text-black text-base font-semibold border-b-2">{data.Department_of_leadInventor}</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Designation of Lead </span>
           <span className="text-black text-base font-semibold border-b-2">{data.Designation_of_leadInventor}</span>
           </div>
          </div>
          <h1 className='text-blue-900 font-serif font-bold text-xl  py-2 border-black'>Details of Collaborating Indusustry Partner</h1>
          <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Name of Partner</span>
           <span className="text-black text-base font-semibold border-b-2">{data.Name_of_partner}</span>
           </div>
          </div>
          <div className="grid  grid-cols-2 gap-x-10">
           <span className="text-black text-base font-semibold border-b-2 ">Details of Partner</span>
          <span className="text-black text-base font-semibold border-b-2">
            <p>
             {data.Detail_of_partner}
            </p>
            </span>
           </div>
           <h1 className='text-blue-900 font-serif font-bold text-xl mt-6  py-2 border-black'>Additional Details</h1>
          <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
          <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Feilds of Use</span>
           <span className="text-black text-base font-semibold border-b-2">{data.Feild_of_use}</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Pd Proof</span>
           <span className="text-black text-base font-semibold border-b-2">None</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Financial Support</span>
           <span className="text-black text-base font-semibold border-b-2">{data.Financial_support}</span>
           </div>
           <div className="grid  grid-cols-2 gap-x-10">
           <span className="text-black text-base font-semibold border-b-2 ">Key Aspects</span>
          <span className="text-black text-base font-semibold border-b-2">
            <p>
             {data.KeyAspects}
            </p>
            </span>
           </div>
           <div className="grid  grid-cols-2 gap-x-10">
           <span className="text-black text-base font-semibold border-b-2 ">Remarks</span>
          <span className="text-black text-base font-semibold border-b-2">
            <p>
             {data.Remarks}
            </p>
            </span>
           </div>
          </div>
         
           
    </div>
    </Modal>
  );
}

