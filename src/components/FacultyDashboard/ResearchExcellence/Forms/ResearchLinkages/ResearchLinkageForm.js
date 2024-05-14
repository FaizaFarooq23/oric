import Dropdown from "@/components/FacultyDashboard/Profile/components/Common/Dropdown";
import InputField from "@/components/FacultyDashboard/Profile/components/Common/InputField";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import Modal, { useModalState } from "react-simple-modal-provider";
import SuccessModal from "../../components/UI/SuccessMessage";

function ResearchLinkageForm({ children }) {
  const [isOpen, setOpen] = useModalState();
  const [TypeofLinkage, setTypeofLinkage] = useState("Academic");
  const [FeildofStudy, setFeildofStudy] = useState("");
  const [NameResearchGrant, setNameResearchGrant] = useState("");
  const [DateofAgreement, setDateofAgreement] = useState("");
  const [Nationaity, setNationaity] = useState("National");
  const [NameofHostInstitute, setNameofHostInstitute] = useState("");
  const [MoUcopy, setMoUcopy] = useState("");
  const [AdressofHostInstitute, setAdressofHostInstitute] = useState("");
  const [CollaboratingAgency, setCollaboratingAgency] = useState("");
  const [CollaboratingAgencyAddress, setCollaboratingAgencyAddress] =
    useState("");
  const [Features, setFeatures] = useState("");
  const [Scope, setScope] = useState("");
  const [stage, setStage] = useState(1);
  const { data: session } = useSession();
  const [errors, setErrors] = useState({});

  const [showSuccessModal, setshowSuccessSuccessModal] = useState(false); // State to control SuccessModal visibility
  const validateFormStage1 = () => {
    let valid = true;
    const newErrors = {};
  

    if (FeildofStudy.trim() === "") {
      newErrors.FeildofStudy = "Feild of Study is required";
      valid = false;
    } else {
      newErrors.FeildofStudy = "";
    }
    if (NameResearchGrant.trim() === "") {
      newErrors.NameResearchGrant = "Name of Research Grant  is required";
      valid = false;
    } else {
      newErrors.NameResearchGrant = "";
    }
    if (DateofAgreement.trim() === "") {
      newErrors.DateofAgreement = "Date of Agreement  is required";
      valid = false;
    } else {
      newErrors.DateofAgreement = "";
    }
    
    setErrors(newErrors);
    return valid;
  };
  const validateFormStage2 = () => {
    let valid = true;
    const newErrors = {};

    if (NameofHostInstitute.trim() === "") {
      newErrors.NameofHostInstitute = "Name of Host Institute is required";
      valid = false;
    } else {
      newErrors.NameofHostInstitute = "";
    }
    if (AdressofHostInstitute.trim() === "") {
      newErrors.AdressofHostInstitute = "Address of Host Institute is required";
      valid = false;
    } else {
      newErrors.AdressofHostInstitute = "";
    }
    if (CollaboratingAgency.trim() === "") {
      newErrors.CollaboratingAgency = "Collaborating Agency is required";
      valid = false;
    } else {
      newErrors.CollaboratingAgency = "";
    }
    if (CollaboratingAgencyAddress.trim() === "") {
      newErrors.CollaboratingAgencyAddress = "Collaborating Agency Address is required";
      valid = false;
    } else {
      newErrors.CollaboratingAgencyAddress = "";
    }
    setErrors(newErrors);
    return valid;
  };
  const validateFormStage3 = () => {
    let valid = true;
    const newErrors = {};

    if (MoUcopy.trim() === "") {
      newErrors.MoUcopy = "MoU copyis required";
      valid = false;
    } else {
      newErrors.MoUcopy = "";
    }
    if (Features.trim() === "") {
      newErrors.Features = "Salient Features is required";
      valid = false;
    } else {
      newErrors.Features = "";
    }
    if (Scope.trim() === "") {
      newErrors.Scope = "Scope of Collanoration  is required";
      valid = false;
    } else {
      newErrors.Scope=""
    }
    setErrors(newErrors);
    return valid;
  };
  const nextStage = () => {
    switch (stage){
    case 1:
      if (validateFormStage1()) {
        setStage(stage + 1);
      }
      break;
      case 2:
        if (validateFormStage2()) {
          setStage(stage + 1);
        }
        break;
      default:
        stage + 1;
    }
  };

  const prevStage = () => {
    setStage(stage - 1);
    if (stage === 0) {
      setStage(1);
    }
  };
  function resetFormFields() {
    setOpen(false);
    setTypeofLinkage("Academic");
    setFeildofStudy("");
    setNameResearchGrant("");
    setDateofAgreement("");
    setNationaity("National");
    setNameofHostInstitute("");
    setMoUcopy("");
    setAdressofHostInstitute("");
    setCollaboratingAgency("");
    setCollaboratingAgencyAddress("");
    setFeatures("");
    setScope("");
    setStage(1);
  }
  
  // Call resetFormFields() whenever you need to reset these form fields
  
  const handleTypeofLinkage = (e) => {
    setTypeofLinkage(e.target.value);
  };

  const handleNationalitychange = (e) => {
    setNationaity(e.target.value);
  };

  const handleScopechange = (e) => {
    setScope(e.target.value);
  };

  const handleFeatureschange = (e) => {
    setFeatures(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (
        !validateFormStage3()
      ) 

      if (!session || !session.user || !session.user.username) {
        alert("Please log in to continue");
        signOut();
        return;
      }

      const res = await axios.post(
        `/api/Research_projects/insert_Research_Linkage`,
        {
          username: session.user.username,
          Type_of_Linkage: TypeofLinkage,
          Feild_of_Study: FeildofStudy,
          Nationality: Nationaity,
          Name_of_Research_Grant: NameResearchGrant,
          Date_of_Agreement: new Date(DateofAgreement),
          Name_of_Host_Institute: NameofHostInstitute,
          Address_of_Host_Institute: AdressofHostInstitute,
          Collaborating_Agency: CollaboratingAgency,
          Collaborating_Agency_Address: CollaboratingAgencyAddress,
          Scope: Scope,
          Features: Features,
        }
      );

      setOpen(false);
      console.log(res);
      resetFormFields()
      setshowSuccessSuccessModal(true)
    } catch (error) {
      console.error("Error inserting information:", error);
    }
  };

  return (
    <>
    <Modal
      id={"ResearchLinkageFormModal"}
      consumer={children}
      isOpen={isOpen}
      setOpen={setOpen}
    >
   <div className=" flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 ">
{stage === 1 && (
  <>
    <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
      <div>
        <h1 className="text-blue-900 font-serif font-bold text-xl  py-2 m-2 ">
          Research Linkage Details
        </h1>
      </div>

      <br />
      <Dropdown
        label={"Type of Linkage"}
        value={TypeofLinkage}
        handleOptionChange={handleTypeofLinkage}
        dropdownOptions={["Academic ", "Research"]}
        required
      />
      <div>
      <InputField
        label={"Feild of Study"}
        value={FeildofStudy}
        setVal={setFeildofStudy}
        required
      />
       {errors.FeildofStudy && (
                <span className="text-red-500">{errors.FeildofStudy}</span>
              )}
              </div>
      <Dropdown
        label={"Nationality"}
        value={Nationaity}
        handleOptionChange={handleNationalitychange}
        dropdownOptions={["International", "National"]}
        required
      />
      <div>
      <InputField
        label={"Name of Research Grant"}
        value={NameResearchGrant}
        setVal={setNameResearchGrant}
        required
      />
       {errors.NameResearchGrant && (
                <span className="text-red-500">{errors.NameResearchGrant}</span>
              )}
              </div>
              <div>
      <InputField
        label={"Date of Agreement"}
        value={DateofAgreement}
        setVal={setDateofAgreement}
        type={"date"}
        required
      />
       {errors.DateofAgreement && (
                <span className="text-red-500">{errors.DateofAgreement}</span>
              )}
</div>
    </div>
    <div className="flex flex-row   ml-auto ">
      <button
        onClick={nextStage}
        className="bg-blue-900 text-white px-4 py-2  w-40 rounded-md mt-4 w-1/4"
      >
        Next
      </button>
    </div>
  </>
)}
{stage === 2 && (
  <>
    <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
      <div>
        <h1 className="text-blue-900 font-serif font-bold text-xl  py-2 m-2 ">
          Host Institue Details
        </h1>
      </div>

      <br />
      <div>
      <InputField
      label={"Name of Host Institute"}
      value={NameofHostInstitute}
      setVal={setNameofHostInstitute}
      required
    />
    {errors.NameofHostInstitute && (
      <span className="text-red-500">{errors.NameofHostInstitute}</span>
    )}
</div>
<div>
    <InputField
      label={"Address of Host Institute"}
      value={AdressofHostInstitute}
      setVal={setAdressofHostInstitute}
      required
    />
    {errors.AdressofHostInstitute && (
      <span className="text-red-500">{errors.AdressofHostInstitute}</span>
    )}
</div>
      <div>
        <h1 className="text-blue-900 font-serif font-bold text-xl  py-2 m-2 ">
          Collaborating Agency Details
        </h1>
      </div>
      <br />
      <div>
      <InputField
        label={"Collaborating Agency"}
        value={CollaboratingAgency}
        setVal={setCollaboratingAgency}
        required
      />
       {errors.CollaboratingAgency && (
      <span className="text-red-500">{errors.CollaboratingAgency}</span>
    )}
      </div>
    <div>
    <InputField
      label={"Collaborating Agency Address"}
      value={CollaboratingAgencyAddress}
      setVal={setCollaboratingAgencyAddress}
      required
    />
    {errors.CollaboratingAgencyAddress && (
      <span className="text-red-500">{errors.CollaboratingAgencyAddress}</span>
    )}
    </div>
   
    
    </div>
    <div className="grid grid-cols-2 justify-between items-end ">
      <button
        onClick={prevStage}
        className="bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-1/4"
      >
        Previous
      </button>
      <button
        onClick={nextStage}
        className="bg-blue-900 ml-auto text-white px-4 py-2 rounded-md mt-4 w-1/4"
      >
        Next
      </button>
    </div>
  </>
)}

{stage === 3 && (
  <>
    <div className="flex flex-col gap-y-3">
      <div>
        <h1 className="text-blue-900 font-serif font-bold text-xl  py-2 m-2 ">
          Additional Details
        </h1>
      </div>
      <InputField
        label={"MoU Copy"}
        value={MoUcopy}
        setVal={setMoUcopy}
        type={"file"}
        required
      />
      <label
        For="textarea"
        className="text-base font-medium text-black"
      >
        Write Scope of Collboration
      </label>
      <textarea
        className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
        rows="4"
        cols="50"
        id="Textarea"
        value={Scope}
        onChange={handleScopechange}
        required
      />
        {errors.Scope && (
      <span className="text-red-500">{errors.Scope}</span>
    )}
      <label
        For="textarea"
        className="text-base font-medium text-black"
      >
        Write Salient Features of Linkage
      </label>
      <textarea
        className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
        rows="4"
        cols="50"
        id="Textarea"
        value={Features}
        onChange={handleFeatureschange}
        required
      />
        {errors.Features && (
      <span className="text-red-500">{errors.Features}</span>
    )}
    </div>
    <div className="grid grid-cols-2 gap-y-8 gap-x-16">
      <button
        onClick={prevStage}
        className="bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-2/4"
      >
        Previous
      </button>
      <button
        onClick={handleSubmit}
        className=" ml-auto bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-1/4"
      >
        Save
      </button>
    </div>
  </>
)}
</div>
    </Modal>
    {
            showSuccessModal &&
            (
          
              <SuccessModal isOpen={showSuccessModal} p={`Your Data has been Saved `} onClose={()=>{
                setshowSuccessSuccessModal(false)
              }}/>
            )
          }
    </>
  );
}

export default ResearchLinkageForm;
