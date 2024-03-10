import Dropdown from '@/components/Profile/components/Common/Dropdown'
import InputField from '@/components/Profile/components/Common/InputField'
import React, { useState, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react';
import { Label } from 'recharts';
import axios from "axios";
import Modal, { useModalState } from "react-simple-modal-provider";
function CasestudyForm({children}) {
    const [isOpen, setOpen] = useModalState();
    const [AreaAdvocated, setAreaAdvocated] = useState("");
    const [NameGovernmentBody, setNameGovernmentBody] = useState("");
    const [DateofPresentation, setDateofPresentation] = useState("");
    const [AdvocacyTools, setAdvocacyTools] = useState("Breifings");;
    const [BackingResearchStatus, setBackingResearchStatus] = useState("");
    const [CoalitionPartners, setCoalitionPartners] = useState("");
    const [Breif, setBreif] = useState("");
    const [issueverification,setissueverification]=useState("");
    const [Casestudycopy, setCasestudycopy] = useState("");
    const handleAdvocacyToolschange = (e) => {
        setAdvocacyTools(e.target.value);
    }
    const handleBreifchange = (e) => {
        setBreif(e.target.value);
    }
   
    const handleSubmit = async () => {
        try {
          if (NameGovernmentBody === "" || DateofPresentation === "" || AreaAdvocated ===""|| AdvocacyTools ===""|| BackingResearchStatus ===""|| CoalitionPartners ===""|| issueverification ==="" ) {
            alert("Please fill all the fields");
            return;
          }
          if (session.user.username === "") {
            alert("Please login to continue");
            signOut();
            return;
          }
          const res = await axios.post(`/api/Research_projects/insert_casestudy`, {
            username:session.user.username,
                Name_of_Government_Body: NameGovernmentBody,
                Advocacy_tools: AdvocacyTools,
                Area_advocated: AreaAdvocated,
                Date_of_presentation:new Date(DateofPresentation),
                Banking_research_status: BackingResearchStatus,
                Coalation_Partner: CoalitionPartners,
                Breif_Details: Breif,
                Issue_verification: issueverification
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
        id={"CaseStudyFormModal"}
    consumer={children}
    isOpen={isOpen}
    setOpen={setOpen}
    >
         <div className="h-screen overflow-y-auto bg-white shadow-lg rounded-md mx-auto  my-2 px-10 w-4/5  ">
            <div className='py-2 m-2 flex flex-col gap-y-8   '>
            <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
            <div>
        <h1 className='text-black font-serif font-bold text-xl border-l-2 py-2 m-2 border-black'>Enter Details About Policy Advocacy</h1>

        </div>
        
<br />
                <InputField
                    label={"Area Advocated"}
                    value={AreaAdvocated}
                    setVal={setAreaAdvocated}
                />
                <Dropdown
                    label={"AdvocacyTools"}
                    value={AdvocacyTools}
                    handleOptionChange={handleAdvocacyToolschange}
                    dropdownOptions={["Breifings", "Meetings", "Websites", "Social Media Debates", "Others"]}
                />
                <InputField
                    label={"Name of Government Body"}
                    value={NameGovernmentBody}
                    setVal={setNameGovernmentBody}
                />
                <InputField
                    label={"Date of Presentation"}
                    value={DateofPresentation}
                    type={"date"}
                    setVal={setDateofPresentation}
                />

                <InputField
                    label={"Backing Research Status"}
                    value={BackingResearchStatus}
                    setVal={setBackingResearchStatus}
                />
 <InputField
                    label={"Issue Verification"}
                    value={issueverification}
                    setVal={setissueverification}
                />
                <InputField
                    label={"Coalition Partners"}
                    value={CoalitionPartners}
                    setVal={setCoalitionPartners}
                />

                <InputField
                    label={"Case Study Breif Copy"}
                    value={Casestudycopy}
                    setVal={setCasestudycopy}
                    type={"file"}

                />


            </div>
            <label For="textarea" className='text-base font-medium text-black'>Enter Breif Details</label>
            <textarea className='outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm' rows="3" cols="50"
                id='Textarea'
                value={Breif}
                onChange={handleBreifchange}
            />

            <div className="flex items-center justify-center w-full">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-900 text-white px-4 py-2 rounded-md mt-2 w-1/4">
                    Save
                </button>
            </div>
            </div>
        </div>
     
        </Modal>
      
    )
}


export default CasestudyForm
