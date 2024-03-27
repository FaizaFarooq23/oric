import React from 'react'
import Modal from 'react-modal';
export default function IPdata({ isOpen, closeModal ,data}) {
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
           <span className="text-black text-base font-semibold border-b-2 ">{data.Title_of_Invention}</span>
               </div> 
               <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base font-semibold border-b-2 ">Type of IP</span>
           <span className="text-black text-base font-semibold border-b-2 ">{data.Type}</span>
               </div> 
               { data.type!=="IP disclosures" &&
                <>
                 <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base font-semibold border-b-2 ">Status of Patent</span>
           <span className="text-black text-base font-semibold border-b-2 ">{data.status_of_patent}</span>
               </div>
               <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base font-semibold border-b-2 ">Date of Filing</span>
           <span className="text-black text-base font-semibold border-b-2 ">{data.Date_of_filing}</span>
               </div>
                </>
               }
              
               <div className="grid grid-cols-2 gap-x-10 "> 
            <span className="text-black text-base font-semibold border-b-2 ">Category of IP</span>
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
            {data.Type==="IP disclosures" &&
                <>
                  <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Previous Disclosure</span>
           <span className="text-black text-base font-semibold border-b-2">{data.Previous_disclosure} </span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Date of Disclosure</span>
           <span className="text-black text-base font-semibold border-b-2">{data.Date_of_disclosure}</span>
           </div>
           </>
            }
         
          </div>
          <h1 className='text-blue-900 font-serif font-bold text-xl  py-2 border-black'>Details of Inventor</h1>
          <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
          
          <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Name of Lead Inventor</span>
           <span className="text-black text-base font-semibold border-b-2">{data.Name_of_leadInventor}</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Department of Lead Inventor</span>
           <span className="text-black text-base font-semibold border-b-2">{data.Department_ofleadInventor}</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Designation of Lead Inventor</span>
           <span className="text-black text-base font-semibold border-b-2">{data.Designation_of_leadInventor}</span>
           </div>
          </div>
          <h1 className='text-blue-900 font-serif font-bold text-xl  py-2 border-black'>Details of Patent Authority or Department</h1>
          <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Name of Patent Authority</span>
           <span className="text-black text-base font-semibold border-b-2">{data.Name_of_patentdept}</span>
           </div>
          </div>
          <div className="grid  grid-cols-2 gap-x-10">
           <span className="text-black text-base font-semibold border-b-2 ">Details of Patent Authority</span>
          <span className="text-black text-base font-semibold border-b-2">
            <p>
             {data.Detail_of_patent_dept}
            </p>
            </span>
           </div>
           <h1 className='text-blue-900 font-serif font-bold text-xl mt-6  py-2 border-black'>Additional Details</h1>
          <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
          <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">IP disclosure</span>
           <span className="text-black text-base font-semibold border-b-2">None</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Filing Copy</span>
           <span className="text-black text-base font-semibold border-b-2">None</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Granting Copy</span>
           <span className="text-black text-base font-semibold border-b-2">None</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Financial Support</span>
           <span className="text-black text-base font-semibold border-b-2">{data.Financial_support}</span>
           </div>
           <div className="grid grid-cols-2 gap-x-10">
            <span className="text-black text-base font-semibold border-b-2">Commercial Partner</span>
           <span className="text-black text-base font-semibold border-b-2">{data.Commercial_partner}</span>
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

