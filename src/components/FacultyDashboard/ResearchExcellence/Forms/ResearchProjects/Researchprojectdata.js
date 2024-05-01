import React from 'react'
import Modal from 'react-modal';
// import Modal, { useModalState } from "react-simple-modal-provider";
import { FaTimes, FaEdit } from 'react-icons/fa'; 
export default function Researchprojectdata({ isOpen, closeModal, data }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Research Project Details"
      className="flex gap-y-8 flex-col bg-white shadow-lg ml-auto h-screen  overflow-y-auto mr-auto rounded-md  w-4/5 border-4 p-12 "
    >
      <div>
      <div className="flex justify-end items-end gap-x-6">
        <FaTimes className="text-red-500 text-xl  cursor-pointer" onClick={closeModal} />
      </div>
      <div className='flex flex-col gap-x-10 gap-y-10  px-6 '>
     
        <h1 className='text-blue-900 font-serif font-bold text-xl  py-2 border-black'>Research Project Details</h1>
        <div className="grid grid-cols-2 gap-x-8 ">
          <span className="text-black text-base gap-x-8 font-semibold  border-b-2">Title of Research Project</span>
          <span className="text-black text-base font-semibold  border-b-2">{data.title}</span>
        </div>
        <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
          <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold  border-b-2">Thematic Area</span>
            <span className="text-black text-base font-semibold  border-b-2">{data.Thematic_Area}</span>
          </div>
          <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold  border-b-2">Type of Research</span>
            <span className="text-black text-base font-semibold border-b-2">{data.type_of_research}</span>
          </div>
          { data.type_of_research==="Solo Project" &&
            <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold  border-b-2">Category</span>
            <span className="text-black text-base font-semibold border-b-2">{data.category}</span>
      
          </div>
         
          }
          <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold border-b-2">Name of Research Grant</span>
            <span className="text-black text-base font-semibold border-b-2">{data.Name_of_Research_Grant}</span>
          </div>
         
          <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold  border-b-2">Nationality</span>
            <span className="text-black text-base font-semibold border-b-2">{data.Nationality}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold border-b-2 ">Status of Proposal</span>
            <span className="text-black text-base font-semibold border-b-2">{data.Status_of_proposal}</span>
          </div>

          {data.Status_of_project === "Completed"  &&
            <div className="grid grid-cols-2 gap-x-8">
              <span className="text-black text-base font-semibold border-b-2">Date of Completion</span>
              {
              data.Date_of_Completion !== "" ?(
              <span className="text-black text-base font-semibold border-b-2">{data.Date_of_Completion.split("T")[0]}</span>
              ):(
                <span className="text-black text-base font-semibold border-b-2">Nill</span>

              )
              }

            </div>

          }

          <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold border-b-2">Start Date</span>
            <span className="text-black text-base font-semibold border-b-2">{data.start_Date.split("T")[0]}</span>
          </div>
          <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold border-b-2">End Date</span>
            <span className="text-black text-base font-semibold border-b-2">{data.end_Date.split("T")[0]}</span>
          </div>
          {data.type_of_research === "Contract" ? (
            <>
              <div className="grid grid-cols-2 gap-x-8">
                <span className="text-black text-base font-semibold border-b-2">Date of contract signed</span>
                <span className="text-black text-base font-semibold border-b-2">{data.Date_of_ContractSigned.split("T")[0]}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-8">
                <span className="text-black text-base font-semibold border-b-2">Date of contract</span>
                <span className="text-black text-base font-semibold border-b-2">{data.Date_of_Contract.split("T")[0]}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-8">
                <span className="text-black text-base font-semibold border-b-2">Counter Parts from Industry</span>
                <span className="text-black text-base font-semibold border-b-2">{data.Counterparts}</span>
              </div>
            </>) : (
            <>
              <div className="grid grid-cols-2 gap-x-8 ">
                <span className="text-black text-base font-semibold border-b-2">Date of Submission</span>
                <span className="text-black text-base font-semibold border-b-2">{data.Date_of_Submission.split("T")[0]}</span>
              </div>

              {
                data.Status_of_proposal === "Approved" &&
                <>
                {
                  data.Date_of_Approval!=="" &&
                  <div className="grid grid-cols-2 gap-x-8">
                    <span className="text-black text-base font-semibold border-b-2">Date of Approval</span>
                    <span className="text-black text-base font-semibold border-b-2">{data.Date_of_Approval.split("T")[0]}</span>
                  </div>
                }
                  
                  { (data.type_of_research==="Solo Project" && data.category==="Non-HEC" ) &&
                     <div className="grid grid-cols-2 gap-x-8">
                     <span className="text-black text-base font-semibold border-b-2">ORIC Overhead</span>
                     <span className="text-black text-base font-semibold border-b-2">{data.ORIC_Overhead}</span>
                   </div>
                  }
                  <div className="grid grid-cols-2 gap-x-8">
                    <span className="text-black text-base font-semibold border-b-2">Status of Project</span>
                    <span className="text-black text-base font-semibold border-b-2">{data.Status_of_project}</span>
                  </div>
                </>

              }

            </>
          )

          }

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

        {
          data.type_of_research==="Joint Research" &&
          <>
            <div>
          <h1 className='text-blue-900 font-serif font-bold text-xl  py-2  border-black'>Details of CoPi</h1>
        </div>
        <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
          <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold border-b-2">Name of CoPi</span>
            <span className="text-black text-base font-semibold">{data.Name_of_CoPi} </span>
          </div>
          <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold border-b-2">Department of CoPi</span>
            <span className="text-black text-base font-semibold border-b-2">{data.Department_of_CoPi}</span>
          </div>
          <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold border-b-2">Designation of CoPi</span>
            <span className="text-black text-base font-semibold border-b-2">{data.Designation_of_CoPi}</span>
          </div>

        </div>
          </>
        }
        {  data.type_of_research==="Contract Research" &&
<>
      
<div>
  <h1 className='text-blue-900 font-serif font-bold text-xl  py-2  border-black'>Details of Sponcering Agency</h1>
</div>
<div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
  <div className="grid grid-cols-2 gap-x-8">
    <span className="text-black text-base font-semibold border-b-2">Name of Sponcering Agency</span>
    <span className="text-black text-base font-semibold border-b-2">{data.Name_of_Sponcering_Agency}</span>
  </div>
  <div className="grid grid-cols-2 gap-x-8">
    <span className="text-black text-base font-semibold border-b-2">Sponcering Agency Country</span>
    <span className="text-black text-base font-semibold">{data.Sponcering_Agency_Country}</span>
  </div>
  <div className="grid grid-cols-2 gap-x-8">
    <span className="text-black text-base font-semibold border-b-2">Sponcering Agency Address</span>
    <span className="text-black text-base font-semibold border-b-2">{data.Sponcering_Agency_Address}</span>
  </div>

</div>
</>
        }

<div>
          <h1 className='text-blue-900 font-serif font-bold text-xl  py-2  border-black'>Details of IRB Review</h1>
        </div>
        <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
          <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold border-b-2">Reviewed By IRB</span>
            <span className="text-black text-base font-semibold border-b-2">{data.reviwedbyIRB}</span>
          </div>
          {
            data.reviwedbyIRB==="Yes" &&
            <>
             <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold border-b-2">Date of Review</span>
            <span className="text-black text-base font-semibold border-b-2">{data.Date_of_review.split("T")[0]} </span>
          </div>
          <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold border-b-2">Meeting Decision</span>
            <span className="text-black text-base font-semibold border-b-2">{data.meetingdecision}</span>
          </div>
            </>
           
          }
          

        </div>
        <h1 className='text-blue-900 font-serif font-bold text-xl  py-2  border-black'>Details of Funding(PKR Million)</h1>
        <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
          {
            data.type_of_research !== "Contract Research" &&
            data.Status_of_project === "Completed"  &&
            <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold border-b-2">Funding Agency/Body</span>
            <span className="text-black text-base font-semibold">{data.funding_agency}</span>
          </div>
          }
          <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold border-b-2 w-48">Total Funding Requested </span>
            <span className="text-black text-base font-semibold border-b-2 w-48">{data.funding_requested}</span>
          </div>
        {data.Status_of_proposal === "Approved" &&
          <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold border-b-2">Total Funding Approved</span>
            <span className="text-black text-base font-semibold border-b-2">{data.funding_approved} </span>
          </div>
}
{data.Status_of_proposal === "Completed" &&
          <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold border-b-2">Total Funding Utilized</span>
            <span className="text-black text-base font-semibold border-b-2">{data.funding_utilized} </span>
          </div>
}
        </div>

        <div>
          <h1 className='text-blue-900 font-serif font-bold text-xl  py-2  border-black'>Details of Partners</h1>
        </div>
        <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
          <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold border-b-2">Collaborating Partner</span>
            <span className="text-black text-base font-semibold border-b-2">{data.Collaborating_Partne} </span>
          </div>
          <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold border-b-2">Co-funding Partner</span>
            <span className="text-black text-base font-semibold border-b-2">{data.Cofunding_Partner} </span>
          </div>
        </div>
        <h1 className='text-blue-900 font-serif font-bold text-xl  py-2  border-black'>Additional Details</h1>
        <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base gap-x-24 font-semibold border-b-2 w-60 ">Proposal Submission Email Copy</span>
            <span className="text-black text-base font-semibold border-b-2">National </span>
          </div>
        <div className='grid grid-cols-2 gap-y-8 gap-x-16  py-6'>
          
          <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold border-b-2">Award Letter Copy</span>
            <span className="text-black text-base font-semibold border-b-2">National </span>
          </div>
          <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold  border-b-2" >Completion Letter Copy</span>
            <span className="text-black text-base font-semibold  border-b-2">National </span>
          </div>
          {
            data.type_of_research=="Contract Research" &&
            <div className="grid grid-cols-2 gap-x-8">
            <span className="text-black text-base font-semibold  border-b-2">Contract Agreement Copy</span>
            <span className="text-black text-base font-semibold  border-b-2">National </span>
          </div>
          }
         
        </div>
        <div className="grid gap-y-8 gap-x-8">
          <span className="text-black text-base w-40 font-semibold  border-b-2">Remarks:</span>
          <span className="text-black text-base font-semibold  border-b-2">{data.Remarks} </span>
        </div>
        {
          data.Status_of_project==="Completed" &&
          <div className="grid  gap-x-8">
          <span className="text-black text-base w-56 font-semibold  border-b-2">Key Project deliverables</span>
          <span className="text-black text-base font-semibold  border-b-2">{data.delivery} </span>
        </div>
        }
      
        
      </div>
      </div>
    </Modal>
  );
}

