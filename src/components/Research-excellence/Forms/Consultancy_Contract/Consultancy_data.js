import React from 'react'
import Modal from 'react-modal';
export default function Consultancy_data({ isOpen, closeModal ,data }) {
  
  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    contentLabel="Case Study Details"
    className="flex gap-y-8 flex-col bg-white shadow-lg h-screen pb-8  mb-4 ml-auto max-h-screen overflow-y-auto  mr-auto rounded-md  w-4/5 border-4 p-10 "
  >
    <div>
          <div >
          <h1 className= 'text-blue-900  font-serif font-bold text-xl  py-2 m-2 border-black'>Consultancy Contract Details</h1>
           </div>
           <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
            <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base border-b-2 font-semibold ">Title of Project</span>
           <span className="text-black text-base border-b-2 font-semibold ">{data.Title}</span>
        </div> 
        <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base border-b-2 font-semibold">Type of Consultancy Services</span>
           <span className="text-black text-base border-b-2 font-semibold">{data.Type_of_ConsultancyServices}</span>
        </div> 
             <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base border-b-2 font-semibold">Date of Execution</span>
           <span className="text-black text-base border-b-2 font-semibold">{data.Date_of_Execution}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base border-b-2 font-semibold">Contract Value</span>
           <span className="text-black text-base border-b-2 font-semibold">{data.Contract_Value} PKR Million</span>
            </div>
            

           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base border-b-2 font-semibold">Start Date</span>
           <span className="text-black text-base border-b-2 font-semibold">{data.start_Date}</span>
           </div>
        
            <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base border-b-2 font-semibold">End Date</span>
           <span className="text-black text-base border-b-2 font-semibold">{data.end_Date}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base border-b-2 font-semibold">Oric Percentage</span>
           <span className="text-black text-base border-b-2 font-semibold">{data.ORIC_percentage}</span>
            </div>
            </div>
            <div>
          <h1 className='text-blue-900 font-serif font-bold text-xl  py-2  border-black'>Details of Pi</h1>
        </div>
        <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
          <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold border-b-2">Name of Pi</span>
            <span className="text-black text-base font-semibold border-b-2">{data.Name_of_pi}</span>
          </div>
          <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold border-b-2">Department of Pi</span>
            <span className="text-black text-base font-semibold border-b-2">{data.Department_of_Pi} </span>
          </div>
          <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold border-b-2">Designation of Pi</span>
            <span className="text-black text-base font-semibold border-b-2">{data.Designation_of_Pi}</span>
          </div>

        </div>
             <div>
          <h1 className= 'text-blue-900  font-serif font-bold text-xl  pt-4 m-2 border-black'>Details Of Company</h1>
          </div> 
          <div className='grid grid-cols-2 gap-y-8 pt-6 gap-x-16'> 
           <div className="grid grid-cols-2 gap-x-10">
           <span className="text-black text-base border-b-2 font-semibold">Name of Company</span>
          <span className="text-black text-base border-b-2 font-semibold">{data.Company_Name}</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
           <span className="text-black text-base border-b-2 font-semibold">Country of Company</span>
          <span className="text-black text-base border-b-2 font-semibold">{data.Company_Address} </span>
          
          </div>
         
         
<h1 className= 'text-blue-900  font-serif font-bold text-xl  pt-6 m-2 border-black'>Additional Details</h1>
</div>  
           <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
           <div className="grid grid-cols-2 gap-y-10 gap-x-8">
            <span className="text-black text-base border-b-2 font-semibold border-b-2">Constract Copy</span>
           <span className="text-black text-base border-b-2 font-semibold border-b-2">Contract Copy</span>
            </div>
           </div>
           <div className="grid grid-cols-2 gap-y-10 py-4 gap-x-8">
            <span className="text-black text-base border-b-2 font-semibold  border-b-2">Remarks</span>
           <span className="text-black text-base border-b-2 font-semibold  border-b-2">{ data.Remarks }</span>
            </div>
            <div className="grid grid-cols-2 gap-y-10 gap-x-8">
            <span className="text-black text-base border-b-2 font-semibold  border-b-2">Key Delieverables</span>
           <span className="text-black text-base border-b-2 font-semibold  border-b-2">{data.deliverables}</span>
            </div>
            <div className='pt-8'>
            <button className="bg-blue-900 text-white p-2 flex mx-auto text-center justify-center  rounded-md  w-1/4" onClick={closeModal}>Close </button>
            </div>
           
    </div>
    </Modal>
  );
}

