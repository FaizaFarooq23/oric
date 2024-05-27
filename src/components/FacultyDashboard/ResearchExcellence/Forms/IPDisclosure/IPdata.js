import React from 'react'
import Modal from 'react-modal';
import { FaTimes, FaEdit } from 'react-icons/fa'; 
export default function IPdata({ isOpen, closeModal ,data}) {
  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    contentLabel="Ip Data"
    className="flex gap-y-8 flex-col bg-white shadow-lg h-screen pb-8  mb-4 ml-auto max-h-screen overflow-y-auto  mr-auto rounded-md  w-4/5 border-4 p-10 "
  >
    <div >
    <div className="flex justify-end items-end gap-x-6">
     
      
        {/* Cross icon */}
        <FaTimes className="text-red-500 text-xl  cursor-pointer" onClick={closeModal} />
      </div>
          <div>
          <h1 className='text-blue-900 font-serif font-bold text-xl  py-2 m-2 border-black'>IP Disclosures and Patent Information</h1>
           </div>
           
           <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
            <div className="grid grid-cols-2 gap-x-10 w-full"> 
            <span className="text-black text-base font-semibold  ]">Title of Invention</span>
           <span className="text-black text-base font-semibold  ">{data.Title_of_Invention}</span>
               </div> 
               <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base font-semibold  ">Type of IP</span>
           <span className="text-black text-base font-semibold  ">{data.Type}</span>
               </div> 
               { data.Type!=="IP disclosures" &&
                <>
                 <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base font-semibold  ">Status of Patent</span>
           <span className="text-black text-base font-semibold  ">{data.Status_of_patent}</span>
               </div>
               <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base font-semibold  ">Date of Filing</span>
           <span className="text-black text-base font-semibold  ">{data.Date_of_filing.split("T")[0]}</span>
               </div>
                </>
               }
              
               <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base font-semibold  ">Category of IP</span>
           <span className="text-black text-base font-semibold  ">{data.Category}</span>
               </div>
               <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base font-semibold  ">Nationaity</span>
           <span className="text-black text-base font-semibold  ">{data.Nationality}</span>
               </div>
             <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold ">Development Status</span>
           <span className="text-black text-base font-semibold ">{data.Development_Status}</span>
            </div>
            {data.Type==="IP disclosures" &&
                <>
                  <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold ">Previous Disclosure</span>
           <span className="text-black text-base font-semibold ">{data.Previous_disclosure} </span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold ">Date of Disclosure</span>
           <span className="text-black text-base font-semibold ">{data.Date_of_disclosure.split("T")[0]}</span>
           </div>
           </>
            }
         
          </div>
          <h1 className='text-blue-900 font-serif font-bold text-xl  py-2 border-black'>Details of Inventor</h1>
          <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
          
          <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold ">Name of Lead Inventor</span>
           <span className="text-black text-base font-semibold ">{data.Name_of_leadInventor}</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold ">Department of Lead Inventor</span>
           <span className="text-black text-base font-semibold ">{data.Department_ofleadInventor}</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold ">Designation of Lead Inventor</span>
           <span className="text-black text-base font-semibold ">{data.Designation_of_leadInventor}</span>
           </div>
          </div>
          <h1 className='text-blue-900 font-serif font-bold text-xl  py-2 border-black'>Details of Patent Authority or Department</h1>
          <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold ">Name of Patent Authority</span>
           <span className="text-black text-base font-semibold ">{data.Name_of_patentdept}</span>
           </div>
          </div>
          <div className="grid  grid-cols-2 gap-x-10">
           <span className="text-black text-base font-semibold  ">Details of Patent Authority</span>
          <span className="text-black text-base font-semibold ">
            <p>
             {data.Detail_of_patent_dept}
            </p>
            </span>
           </div>
           <h1 className='text-blue-900 font-serif font-bold text-xl mt-6  py-2 border-black'>Additional Details</h1>
          <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
          <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold ">IP disclosure</span>
           <span className="text-black text-base font-semibold ">None</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold ">Filing Copy</span>
           <span className="text-black text-base font-semibold ">None</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold ">Granting Copy</span>
           <span className="text-black text-base font-semibold ">None</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold ">Financial Support</span>
           <span className="text-black text-base font-semibold ">{data.Financial_support}</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold ">Commercial Partner</span>
           <span className="text-black text-base font-semibold ">{data.Commercial_partner}</span>
           </div>
          </div>
          <div className="grid  grid-cols-2 gap-x-10">
           <span className="text-black text-base font-semibold  ">Key Aspects</span>
          <span className="text-black text-base font-semibold ">
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

