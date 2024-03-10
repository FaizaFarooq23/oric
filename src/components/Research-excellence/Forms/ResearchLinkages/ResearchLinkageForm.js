import Dropdown from '@/components/Profile/components/Common/Dropdown'
import InputField from '@/components/Profile/components/Common/InputField'
import React,{useState , useEffect } from 'react'
import { Label } from 'recharts';
import axios from "axios";
import { signIn, signOut, useSession } from 'next-auth/react';
import Modal, { useModalState } from "react-simple-modal-provider";
function ResearchLinkageForm({children}) {
  
  const [isOpen, setOpen] = useModalState();
  const [TypeofLinkage, setTypeofLinkage] = useState("Academic");
  const [FeildofStudy, setFeildofStudy] = useState("");
  const [NameResearchGrant, setNameResearchGrant] = useState("");
  const [DateofAgreement, setDateofAgreement] = useState("");
  const [Nationaity, setNationaity] = useState("National");;
  const [NameofHostInstitute, setNameofHostInstitute] = useState("");
  const [MoUcopy, setMoUcopy] = useState("");
  const [AdressofHostInstitute, setAdressofHostInstitute] = useState("");
  const [CollaboratingAgency, setCollaboratingAgency] = useState("");
  const [CollaboratingAgencyAddress, setCollaboratingAgencyAddress] = useState("");
 const [Features, setFeatures] = useState("");
const [Scope, setScope] = useState("");
const [stage, setStage] = useState(1);
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
  const handleTypeofLinkage = (e) => {
    setTypeofLinkage(e.target.value);
  }
  
  const handleNationalitychange = (e) => {
    setNationaity(e.target.value);
  }
  const handleScopechange = (e) => {
    setScope(e.target.value);
  }
  const handleFeatureschange = (e) => {
    setFeatures(e.target.value);
  }
  const {data: session} = useSession();
  useEffect(() => {
    console.log(session)
  }, [session]);

  const handleSubmit = async () => {
    
    try {
      if (TypeofLinkage === "" || FeildofStudy === "" || Nationaity ===""|| NameResearchGrant ===""|| DateofAgreement ===""|| NameofHostInstitute ===""|| AdressofHostInstitute ==="" || CollaboratingAgency ===""|| CollaboratingAgencyAddress ==="" || Scope ===""|| Features==="" ) {
        alert("Please fill all the fields");
        return;
      }
      if (session.user.username === "") {
        alert("Please login to continue");
        signOut();
        return;
      }
      const res = await axios.post(`/api/Research_projects/insert_Research_Linkage`, {
        username:session.user.username,
        Type_of_Linkage : TypeofLinkage ,
        Feild_of_Study: FeildofStudy,
        Nationality: Nationaity,
        Name_of_Research_Grant:NameResearchGrant,
        Date_of_Agreement:new Date(DateofAgreement),
        Name_of_Host_Institute: NameofHostInstitute,
        Address_of_Host_Institute: AdressofHostInstitute,
        Collaborating_Agency: CollaboratingAgency,
        Collaborating_Agency_Address: CollaboratingAgencyAddress,
        Scope :Scope,
        Features:Features
      });

      setOpen(false);

    //   toast.success('Data saved successfully!', {
    //     position: toast.POSITION.TOP_CENTER,
    //     autoClose: 10000,
    // });
      console.log(res);

    } catch (error) {
       
      console.error("Error inserting information:", error);
    }
  
  }

   
  
  return (
    <Modal
    id={"ResearchLinkageFormModal"}
    consumer={children}
    isOpen={isOpen}
    setOpen={setOpen}
  >
    <div className=" flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 ">
    {stage === 1 &&
    <>
      <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
      <div>
        <h1 className='text-black font-serif font-bold text-xl border-l-2 py-2 m-2 border-black'>Research Linkage Details</h1>
        </div>
        
      <br />
      <Dropdown
        label={"Type of Linkage"}
        value={TypeofLinkage}
        handleOptionChange={handleTypeofLinkage}
        dropdownOptions={["Academic ", "Research"]}
        />
        <InputField
          label={"Feild of Study"}
          value={FeildofStudy}
          setVal={setFeildofStudy}
          />
          <Dropdown
        label={"Nationality"}
        value={Nationaity}
        handleOptionChange={handleNationalitychange}
        dropdownOptions={["International" , "National"]}
        />
        <InputField
          label={"Name of Research Grant"}
          value={NameResearchGrant}
          setVal={setNameResearchGrant}
          />
        <InputField
          label={"Date of Agreement"}
          value={DateofAgreement}
          setVal={setDateofAgreement}
          type={"date"}
        />
        </div>
        <div className='flex flex-row   ml-auto ' >
        <button
                      onClick={nextStage}
                      className="bg-blue-900 text-white px-4 py-2  w-40 rounded-md mt-4 w-1/4">
                      Next
                    </button>
                   
        </div>
        </>
             
    }
    {
      stage === 2 && 
      <>
      <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
        <div>
        <h1 className='text-black font-serif font-bold text-xl border-l-2 py-2 m-2 border-black'>Host Institue Details</h1>

        </div>
        
<br />
        <InputField
          label={"Name of Host Institute"}
          value={NameofHostInstitute}
          setVal={setNameofHostInstitute}
        />

        <InputField
          label={"Address of Host Institute"}
          value={AdressofHostInstitute}
          setVal={setAdressofHostInstitute}
        />
        <div>
        <h1 className='text-black font-serif font-bold text-xl border-l-2 py-2 m-2 border-black'>Collaborating Agency Details</h1>
        </div>       
<br />        
        <InputField
          label={"Collaborating Agency"}
          value={CollaboratingAgency}
          setVal={setCollaboratingAgency}
        />
       <InputField
          label={"Collaborating Agency Address"}
          value={CollaboratingAgencyAddress}
          setVal={setCollaboratingAgencyAddress}
        />
        </div>
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
</>
    }
       
{
  stage===3 &&
  <>
  <div className='flex flex-col gap-y-3'>
<div >
        <h1 className='text-black font-serif font-bold text-xl border-l-2 py-2 m-2 border-black'>Additional Details</h1>
        </div>
        <InputField
          label={"MoU Copy"}
          value={MoUcopy}
          setVal={setMoUcopy}
          type={"file"}
         
        />
      <label For="textarea" className='text-base font-medium text-black'>Write Scope of Collboration</label>
      <textarea  className='outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm' rows="4" cols="50" 
          id='Textarea'
             value={Scope}
             onChange={handleScopechange}
             />
             <label For="textarea" className='text-base font-medium text-black'>Write Salient Features of Linkage</label>
      <textarea  className='outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm' rows="4" cols="50" 
          id='Textarea'
             value={Features}
             onChange={handleFeatureschange}
             />
             </div>
<div className='grid grid-cols-2 gap-y-8 gap-x-16' >

<button
        onClick={prevStage}
        className="bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-2/4">
        Previous
      </button>
<button
        onClick={handleSubmit}
        className=" ml-auto bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-1/4">
        Save 
      </button>
    
</div>
  </>
 
}

      
</div>
</Modal>
  )
}



export default ResearchLinkageForm
