import Dropdown from '@/components/Profile/components/Common/Dropdown'
import InputField from '@/components/Profile/components/Common/InputField'
import React,{useState , useEffect } from 'react'
import { Label } from 'recharts';
import axios from "axios";
import { signIn, signOut, useSession } from 'next-auth/react';
import Modal, { useModalState } from "react-simple-modal-provider";
function Researchprojectform({children}) {
  const [isOpen, setOpen] = useModalState();
  const [TitleofResearch, setTitleofResearch] = useState("");
  const [ThematicArea, setThematicArea] = useState("");
  const [NameResearchGrant, setNameResearchGrant] = useState("");
  const [Category, setCategory] = useState("HEC");
  const [Status_of_proposal, setStatus_of_proposal] = useState("Submitted");
  const [Status_of_project, setStatus_of_project] = useState("Ongoing");
  const [DateofContract, setDateofContract] = useState("");
 const [DateofContractSigned, setDateofContractSigned] = useState("");
  const [DateofApproval, setDateofApproval] = useState("");
  const [DateofSubmission, setDateofSubmission] = useState("");
  const [DateofCompletion, setDateofCompletion] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [Nameofpi, setNameofPi] = useState("");
  const [DesignationofPi, setDesignationofPi] = useState("");
  const [DepartmentofPi, setDepartmentofPi] = useState("");
  const [NameofCopi, setNameofCoPi] = useState("");
  const [UniversityofCoPi, setUniversityofCoPi] = useState("");
  const [DepartmentofCoPi, setDepartmentofCoPi] = useState("");
  const [DesignationofCoPi, setDesignationofCoPi] = useState("")
  const [fundingRequested, setFundingRequested] = useState("");
  const [fundingApproved, setFundingApproved] = useState("");
  const [funding_nationality, setfunding_nationality] = useState("National");
  const [fundingUtilized, setFundingUtilized] = useState("");
  const [CollaboratingPartner, setCollaboratingPartner] = useState("");
  const [CofundingPartner, setCofundingPartner] = useState("");
  const [fundingagency, setfundingagency] = useState("");
  const [Remarks, setRemarks] = useState("");
  const [delivery, setdelivery] = useState("");
  const [typeofresearch, settypeofresearch] = useState("Solo Project");
  const [Counterparts, setCounterparts] = useState("");
  const [SponceringAgencyName, setSponceringAgencyName] = useState("");
  const [Sponcering_Agency_Country, setSponceringAgencyCountry] = useState("");
  const [SponceringAgencyAddress, setSponceringAgencyAdress] = useState("");
  const[SubmissionEmailCopy, setSubmissionEmailCopy] =useState("");
  const[AwardLetterCopy, setAwardLetterCopy] =useState("");
  const[CompletionLetterCopy, setCompletionLetterCopy] =useState("");
  const[ContractAgreementCopy, setContractAgreementCopy] =useState("");
  const[ORIC_overhead, setORIC_overhead] =useState("");
  const [stage, setStage] = useState(1);
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  }
  const handleStatus_of_proposalChange = (e) => {
    setStatus_of_proposal(e.target.value);
  }
  const handleProjectStatus = (e) => {
    setStatus_of_project(e.target.value);
  }
  const handleTypeofresearchChange = (e) => {
    settypeofresearch(e.target.value);
  }
  const handleRemarkschange = (e) => {
    setRemarks(e.target.value);
  }
  const handledeliverychange = (e) => {
    setdelivery(e.target.value);
  }
  const handleagnecynationalitychange = (e) => {
    setfunding_nationality(e.target.value);
  }
  // Define a function to handle moving to the next stage
  const nextStage = () => {
    setStage(stage + 1);
    
};

// Define a function to handle moving to the previous stage
const prevStage = () => {
    setStage(stage - 1);
    if (stage===0){
setStage(1)
    }
};
const {data: session} = useSession();
useEffect(() => {
  console.log(session)
}, [session]);


const handleSubmit = async () => {
  try {
    // Validate required fields
    if (
      TitleofResearch === "" ||
      ThematicArea === "" ||
      NameResearchGrant === ""
    ) {
      alert("Please fill all the required fields");
      return;
    }

    // Check if the user is authenticated
    if (!session || !session.user || !session.user.username) {
      alert("Please log in to continue");
      signOut();
      return;
    }

    // Construct the data object based on the conditions
    const data = {
      username: session.user.username,
      title: TitleofResearch,
      Thematic_Area: ThematicArea,
      type_of_research: typeofresearch,
      Name_of_Research_Grant: NameResearchGrant,
      category: Category,
      Status_of_proposal: Status_of_proposal,
      Status_of_project: Status_of_project,
      Date_of_Contract: DateofContract ? new Date(DateofContract) : null,
      Date_of_ContractSigned: DateofContractSigned
        ? new Date(DateofContractSigned)
        : null,
      Date_of_Approval: DateofApproval ? new Date(DateofApproval) : null,
      Date_of_Submission: DateofSubmission
        ? new Date(DateofSubmission)
        : null,
      Date_of_Completion: DateofCompletion
        ? new Date(DateofCompletion)
        : null,
      start_Date: startDate ? new Date(startDate) : null,
      end_Date: endDate ? new Date(endDate) : null,
      Name_of_pi: Nameofpi,
      Designation_of_Pi: DesignationofPi,
      Department_of_Pi: DepartmentofPi,
      Name_of_Copi: NameofCopi,
      University_of_CoPi: UniversityofCoPi,
      Department_of_CoPi: DepartmentofCoPi,
      Designation_of_CoPi: DesignationofCoPi,
      funding_agency: fundingagency,
      funding_requested: fundingRequested,
      funding_received: fundingApproved,
      funding_utilized: fundingUtilized,
      Collaborating_Partner: CollaboratingPartner,
      Cofunding_Partner: CofundingPartner,
      Remarks: Remarks,
      delivery: delivery,
      Counterparts: Counterparts,
      Sponcering_Agency_Name: SponceringAgencyName,
      Sponcering_Agency_Country: Sponcering_Agency_Country,
      Sponcering_Agency_Address: SponceringAgencyAddress,
      Submission_Email_Copy: SubmissionEmailCopy,
      Award_Letter_Copy: AwardLetterCopy,
      Completion_Letter_Copy: CompletionLetterCopy,
      Contract_Agreement_Copy: ContractAgreementCopy,
    };

    // Make the POST request to save the data
    const res = await axios.post(
      `/api/Research_projects/insert_research_project`,
      data
    );

    setOpen(false);

    toast.success("Data saved successfully!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 10000,
    });

    console.log(res);
  } catch (error) {
    console.error("Error inserting information:", error);
  }
};

  
  return (
    <Modal
    id={"ResearchProjectFormModal"}
    consumer={children}
    isOpen={isOpen}
    setOpen={setOpen}
  >
    
    <div>
    {stage === 1 &&
    <div className=" flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 " >
      <div>
        <h1 className='text-black font-serif font-bold text-xl border-l-2 py-2 m-2 border-black'>Research Project Information</h1>
      </div>
      <InputField
        label={"Title of Research Proposal"}
        value={TitleofResearch}
        setVal={setTitleofResearch}
      />

      <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
        <InputField
          label={"Thematic Area"}
          value={ThematicArea}
          setVal={setThematicArea}
        />
        <Dropdown
          label={"Type of Research"}
          dropdownOptions={["Solo Project", "Contract Research","Joint Research"]}
          value={typeofresearch}
          handleOptionChange={handleTypeofresearchChange}
        />
           {
          (typeofresearch==="Solo Project" && Category==="Non-HEC"&& Status_of_proposal==="Approved") &&
            <InputField
        label={"ORIC Overhead "}
        value={ORIC_overhead}
        setVal={setORIC_overhead}
        type={"text"}
        />
           }
        {
          typeofresearch==="Contract Research" ?(
            <InputField
        label={"Counterparts from industry(Adress with country"}
        value={Counterparts}
        setVal={setCounterparts}
        type={"text"}
        
    />
         ):(
          <InputField
          label={"Name of Research Grant"}
          value={NameResearchGrant}
          setVal={setNameResearchGrant}
        />
         )
        }
        <Dropdown
          label={"Status_of_proposal"}
          dropdownOptions={["Submitted", "Approved"]}
          value={Status_of_proposal}
          handleOptionChange={handleStatus_of_proposalChange}
        />
        {  typeofresearch==="Solo Project" &&
          <Dropdown
          label={"Category"}
          dropdownOptions={["HEC", "Non-HEC"]}
          value={Category}
          handleOptionChange={handleCategoryChange}
        />
        }

        {Status_of_proposal==="Approved" &&
         <Dropdown
         label={"Status of project"}
         dropdownOptions={["Ongoing", "Delayed", "Completed"]}
         value={Status_of_project}
         handleOptionChange ={handleProjectStatus}
        
       />
        }
       
<Dropdown
        
            label={"Nationality"}
            dropdownOptions={["National", "International"]}
            value={funding_nationality}
            handleOptionChange={handleagnecynationalitychange}
          />

        {
        typeofresearch==="Contract Research"?(
          <>
          <InputField
          label={"Date of Contract Signed"}
          value={DateofContractSigned}
          setVal={setDateofContractSigned}
          type={"date"}
      />

      <InputField
          label={"Date of Contract"}
          value={DateofContract}
          setVal={setDateofContract}
          type={"date"}
      />
      </>
        ):(
          <>
          <InputField
          label={"Date of Submission"}
          value={DateofSubmission}
          setVal={setDateofSubmission}
          type={"date"}
        />
         {Status_of_proposal === "Approved" &&
        <InputField
          label={"Date of Approval"}
          value={DateofApproval}
          setVal={setDateofApproval}
          type={"date"}
        />
        }
        </>
        )
        }
       

        <InputField
          label={"Start Date"}
          value={startDate}
          setVal={setStartDate}
          type={"date"}
        />


        <InputField
          label={"End Date"}
          value={endDate}
          setVal={setEndDate}
          type={"date"}
        />
        {
          Status_of_project === "Completed" &&
          <InputField
            label={"Date of Completion"}
            value={DateofCompletion}
            setVal={setDateofCompletion}
            type={"date"}
          />

        }
    
      </div>
<div className='flex flex-row   ml-auto ' >
<button
              onClick={nextStage}
              className="bg-blue-900 text-white px-4 py-2  w-40 rounded-md mt-4 w-1/4">
              Next
            </button>
           
</div>
     
    
          
      </div>
}
{
stage === 2 &&<div className=" flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 ">
 <div>
        <h1 className='text-black font-serif font-bold text-xl border-l-2 py-2 m-2 border-black'>Details of Pi</h1>
      </div>
      <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
        <InputField
          label={"Name of Pi"}
          value={Nameofpi}
          setVal={setNameofPi}
        />

        <InputField
          label={"Department of Pi"}
          value={DepartmentofPi}
          setVal={setDepartmentofPi}
        />


        <InputField
          label={"Designation of Pi"}
          value={DesignationofPi}
          setVal={setDesignationofPi}
        />
      </div>
      {typeofresearch=="Joint Research" &&
      <>
        <div>
          <h1 className='text-black font-serif font-bold text-xl border-l-2 py-2 m-2 border-black'>Details of CoPi</h1>
          </div>
        <div className='grid grid-cols-2 gap-y-8 gap-x-16 '>
        <InputField
          label={"Name of CoPi"}
          value={NameofCopi}
          setVal={setNameofCoPi}
        />

        <InputField
          label={"Department of CoPi"}
          value={DepartmentofCoPi}
          setVal={setDepartmentofCoPi}
        />


        <InputField
          label={"Designation of CoPi"}
          value={DesignationofCoPi}
          setVal={setDesignationofCoPi}
        />
        <InputField
          label={"University of CoPi"}
          value={UniversityofCoPi}
          setVal={setUniversityofCoPi}
        />
        </div>
       
        </>
}
{typeofresearch=="Contract Research" &&
      <>
        <div>
        <h1 className='text-black font-serif font-bold text-xl border-l-2 py-2 m-2 border-black'>Details of Sponcering Agency</h1>
        </div>
        <div className='grid grid-cols-2 gap-y-8 gap-x-16 '>
                <InputField
                    label={"Sponcering Agency Name"}
                    value={SponceringAgencyName}
                    setVal={setSponceringAgencyName}
                />
                <InputField
                    label={"Sponcering Agency Country "}
                    value={Sponcering_Agency_Country}
                    setVal={setSponceringAgencyCountry}
                />
                <InputField
                    label={"Sponcering Agency Adress"}
                    value={SponceringAgencyAddress}
                    setVal={setSponceringAgencyAdress}
                />
                </div>
                
        </>
        
}
<div className='grid grid-cols-2 justify-between items-end '>
<button
              onClick={prevStage}
              className="bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-1/4">
              Previous
            </button>
            <button
              onClick={nextStage}
              className="bg-blue-900 ml-auto text-white px-4 py-2 rounded-md mt-4 w-1/4">
              Next
            </button>
          
</div>
     
      
</div>
}
     {
      stage==3 &&<div className=" flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 ">
<div>
        <h1 className='text-black font-serif font-bold text-xl border-l-2 py-2 m-2 border-black'>Details of Funding</h1>
      </div>

      <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
        {
          typeofresearch==="Joint Research"&&
          <InputField
          label={"Funding Agency"}
          value={fundingagency}
          setVal={setfundingagency}
        />
        }
          {
          Category==="Non-HEC"&&
          <InputField
          label={"Funding Body"}
          value={fundingagency}
          setVal={setfundingagency}
        />
        }
        <InputField
          label={"Total Funding Requested"}
          value={fundingRequested}
          setVal={setFundingRequested}
        />

        <InputField
          label={"Total Funding Approved"}
          value={fundingApproved}
          setVal={setFundingApproved}
        />


        <InputField
          label={"Total Funding Utilized"}
          value={fundingUtilized}
          setVal={setFundingUtilized}
        />
      </div>
      <div>
        <h1 className='text-black font-serif font-bold text-xl border-l-2 py-2 m-2 border-black'>Details of Partners</h1>
      </div>
      <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
        <InputField
          label={"Collaborating Partners(if any)"}
          value={CollaboratingPartner}
          setVal={setCategory}
        />
        <InputField
          label={"Co-funding Partners(if any)"}
          value={CofundingPartner}
          setVal={setCofundingPartner}
        />
      </div>
      <div className='grid grid-cols-2 gap-y-8 gap-x-16' >

      <button
              onClick={prevStage}
              className="bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-1/4">
              Previous
            </button>
<button
              onClick={nextStage}
              className=" ml-auto bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-1/4">
              Next
            </button>
          
</div>
     
      
      </div>
     }
      {
        stage===4 && 
        <>
        <div className='flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 ml-auto mr-auto w-5/6 ' >
        <h1 className='text-black font-serif font-bold text-xl border-l-2 py-2 m-2 border-black'>Additional Details</h1>
      <div className='grid grid-cols-2 gap-y-8 gap-x-16'>
      <InputField 
        label={"Proposal Submission Email Copy"}
        value={SubmissionEmailCopy}
        setVal={setSubmissionEmailCopy}
        type={"file"}
      />
      <InputField 
        label={"Award Letter Copy"}
        value={AwardLetterCopy}
        setVal={setAwardLetterCopy}
        type={"file"}
      />
      <InputField 
        label={"Completion Letter Copy"}
        value={CompletionLetterCopy}
        setVal={setCompletionLetterCopy}
        type={"file"}
      />
      {
        typeofresearch==="Contract Research" &&
        <InputField 
        label={"Contract Agreement  Copy"}
        value={ContractAgreementCopy}
        setVal={setContractAgreementCopy}
        type={"file"}
      />
      }
      </div>
      <div className='grid grid-cols-2 gap-y-8 gap-x-16' >
<button
        onClick={prevStage}
        className="bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-1/4">
        Previous
      </button>
  <button
    onClick={nextStage}
    className="ml-auto bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-1/4">
    Next
  </button>
</div>
        </div>
     
       
        </>
}
{
 stage===5 && 
 <>
 
 <div className='grid gap-y-8 grid-col bg-white shadow-lg rounded-md px-6 py-2 w-[60rem] mt-4 max-h-full' >
        <h1 className='text-black font-serif font-bold text-xl border-l-2 py-2 m-2 border-black'>Additional Details</h1>
 {
  typeofresearch==="Contract Research"
}
<label htmlFor="textarea" className='text-base font-medium text-black'>Write Remarks</label>
<textarea className='outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm' rows="3" cols="50"
  id='Textarea'
  value={Remarks}
  onChange={handleRemarkschange}
/>
{
  Status_of_proposal === "Completed" &&
  <>
    <label htmlFor="textarea" className='text-base font-medium text-black'>Write key project deliverables</label>
    <textarea className='outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm' rows="4" cols="50"
      id='Textarea'
      value={delivery}
      onChange={handledeliverychange}
    
    />
  </>

}
<div className='grid grid-cols-2 gap-y-8 gap-x-16' >
<button
        onClick={prevStage}
        className="bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-1/4 ">
        Previous
      </button>
  <button
    onClick={handleSubmit}
    className="ml-auto bg-blue-900 text-white px-4 py-2 rounded-md mt-4 ">
    Save
  </button>
</div>
</div>
</>
}
         
    </div>
</Modal>
  )
}

export default Researchprojectform
