import React from 'react'
import Modal from 'react-modal';
export default function Casestudydata({ isOpen, closeModal ,data}) {
  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    contentLabel="Case Study Details"
    className="flex gap-y-8 flex-col bg-white shadow-lg ml-auto mt-2 overflow-y-auto mr-auto rounded-md  w-4/5 border-4 p-10 "
  >
    <div >
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
          <div className="grid  grid-cols-2 gap-x-10">
           <span className="text-black text-base font-semibold border-b-2 ">Breif Details</span>
          <span className="text-black text-base font-semibold border-b-2">
            <p>
             {data.Breif_Details}
            </p>
            </span>
           </div>
           
           <button  className="bg-blue-900 text-white px-4 flex mx-auto text-center justify-center py-2 rounded-md mt-12 mb-2 w-1/4" onClick={closeModal}>Close Modal</button>
    </div>
    </Modal>
  );
}

