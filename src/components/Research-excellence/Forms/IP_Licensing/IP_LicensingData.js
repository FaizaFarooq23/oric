import React from 'react'
import Modal from 'react-modal';
export default function IPLicensingdata({ isOpen, closeModal ,data}) {
  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    contentLabel="Case Study Details"
    className="flex gap-y-8 flex-col bg-white shadow-lg h-screen pb-8  mb-4 ml-auto max-h-screen overflow-y-auto  mr-auto rounded-md  w-4/5 border-4 p-10 "
  >
    <div >
          <div>
          <h1 className='text-blue-900 font-serif font-bold text-xl  py-2 m-2 border-black'>IP Disclosures and Patent Information</h1>
           </div>
           
           <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
            <div className="grid grid-cols-2 gap-x-10 w-full"> 
            <span className="text-black text-base font-semibold border-b-2 ]">Title of Invention</span>
           <span className="text-black text-base font-semibold border-b-2 ">{data.Title}</span>
               </div> 
               <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base font-semibold border-b-2 ">Status of Licensee</span>
           <span className="text-black text-base font-semibold border-b-2 ">{data.Status_of_Licensee}</span>
               </div> 
               { data.Status_of_Licensee==="signed" ?(
                <>
                 <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base font-semibold border-b-2 ">Type of Licensee</span>
           <span className="text-black text-base font-semibold border-b-2 ">{data.Licensee_Type}</span>
               </div>
               <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base font-semibold border-b-2 ">Date of Agreement</span>
           <span className="text-black text-base font-semibold border-b-2 ">{data.Date_of_Agreement}</span>
               </div>
                </>):(<>
                    <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base font-semibold border-b-2 ">Status of Negotiation</span>
           <span className="text-black text-base font-semibold border-b-2 ">{data.Status_of_Negotiations}</span>
               </div> 
                </>)
               }
              
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
          <h1 className='text-blue-900 font-serif font-bold text-xl  py-2 border-black'>Details of Inventor</h1>
          <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
          
          <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Name of Lead Inventor</span>
           <span className="text-black text-base font-semibold border-b-2">{data.Name_of_leadInventor}</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Department of Lead Inventor</span>
           <span className="text-black text-base font-semibold border-b-2">{data.Department_of_leadInventor}</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Designation of Lead Inventor</span>
           <span className="text-black text-base font-semibold border-b-2">{data.Designation_of_leadInventor}</span>
           </div>
          </div>
          <h1 className='text-blue-900 font-serif font-bold text-xl  py-2 border-black'>Details of Licensee</h1>
          <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Name of Licensee</span>
           <span className="text-black text-base font-semibold border-b-2">{data.Licensee_Name}</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Organization of Licensee</span>
           <span className="text-black text-base font-semibold border-b-2">{data.Licensee_Organization}</span>
           </div>
          </div>
          <h1 className='text-blue-900 font-serif font-bold text-xl  py-2 border-black'>Duration of Agreement</h1>
          <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Start Date</span>
           <span className="text-black text-base font-semibold border-b-2">{data.start_Date}</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">End Date</span>
           <span className="text-black text-base font-semibold border-b-2">{data.end_Date}</span>
           </div>
          </div>
           <h1 className='text-blue-900 font-serif font-bold text-xl mt-6  py-2 border-black'>Additional Details</h1>
          <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
          <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Negotiation Copy</span>
           <span className="text-black text-base font-semibold border-b-2">None</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Contract Copy</span>
           <span className="text-black text-base font-semibold border-b-2">None</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Feild of Use</span>
           <span className="text-black text-base font-semibold border-b-2">{data.Feild_of_use}</span>
           </div>
          </div>
          <div className="grid  grid-cols-2 gap-x-10">
           <span className="text-black text-base font-semibold border-b-2 ">Key Aspects</span>
          <span className="text-black text-base font-semibold border-b-2">
            <p>
             {data.KeyAspects}
            </p>
            </span>
           </div>
           <button  className="bg-blue-900 text-white px-4 flex mx-auto text-center justify-center py-2 rounded-md mt-12 mb-2 w-1/4" onClick={closeModal}>Close </button>
    </div>
    </Modal>
  );
}

