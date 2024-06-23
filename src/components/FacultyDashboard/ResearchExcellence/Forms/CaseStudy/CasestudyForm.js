import InputField from "@/components/FacultyDashboard/Profile/components/Common/InputField";
import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaTimes, FaEdit } from "react-icons/fa";
import axios from "axios";
import Modal, { useModalState } from "react-simple-modal-provider";
import SuccessModal from "../../components/UI/SuccessMessage";
import { uploadFile } from "../../Utility/Saveimagefiles";
function CasestudyForm({ children }) {
  const [isOpen, setOpen] = useModalState();
  const [AreaAdvocated, setAreaAdvocated] = useState("");
  const [NameGovernmentBody, setNameGovernmentBody] = useState("");
  const [DateofPresentation, setDateofPresentation] = useState("");
  const [AdvocacyTools, setAdvocacyTools] = useState("");
  const [BackingResearchStatus, setBackingResearchStatus] = useState("");
  const [CoalitionPartners, setCoalitionPartners] = useState("");
  const [Breif, setBreif] = useState("");
  const [Nameofpi, setNameofPi] = useState("");
  const [DesignationofPi, setDesignationofPi] = useState("");
  const [DepartmentofPi, setDepartmentofPi] = useState("");
  const [issueverification, setissueverification] = useState("");
  const [Casestudycopy, setCasestudycopy] = useState("");
  const { data: session } = useSession();
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [showSuccessModal, setshowSuccessSuccessModal] = useState(false); // State to control SuccessModal visibility

  const handleAdvocacyToolschange = (e) => {
    setAdvocacyTools(e.target.value);
  };
  const handleBackingResearchStatuschange = (e) => {
    setBackingResearchStatus(e.target.value);
  };
  const handleBreifchange = (e) => {
    setBreif(e.target.value);
  };
  const resetAdvocacyFormFields = () => {
    setOpen(false);
    setAreaAdvocated("");
    setNameGovernmentBody("");
    setDateofPresentation("");
    setAdvocacyTools("");
    setBackingResearchStatus("");
    setCoalitionPartners("");
    setBreif("");
    setissueverification("");
    setCasestudycopy(null);
    setErrors({});
  };

  // Call resetAdvocacyFormFields whenever you need to reset the advocacy form fields

  const textAndSymbolPattern = /^[A-Za-z\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+$/;
  const textPattern = /^[a-zA-Z\s]+$/;
  const numericPattern = /^[0-9]+$/;
  const signPattern = /^[\s:;\-_.!?'"@#$%&*(){}\[\]\\/|+=<>~`^]+$/;
  const percentagePattern = /^(100(\.0{1,2})?|[0-9]?[0-9](\.[0-9]{1,2})?)$/;
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (AreaAdvocated.trim() === "") {
      newErrors.AreaAdvocated = "Area Advocated is required";
      valid = false;
    } else if(!textAndSymbolPattern.test(AreaAdvocated)){
      newErrors.AreaAdvocated = "Inavlid Format";
      valid = false;
    }else {
      newErrors.AreaAdvocated = "";
    }
    if (Nameofpi.trim() === "") {
      newErrors.Nameofpi = "Name of Pi is required";
      valid = false;
    }else if (!textAndSymbolPattern.test(Nameofpi)) {
      newErrors.Nameofpi = "Name of Pi must not contain numeric values";
      valid = false;
    }  else {
      newErrors.Nameofpi = "";
    }
    if (DepartmentofPi.trim() === "") {
      newErrors.DepartmentofPi = "Department of Pi is required";
      valid = false;
    } 
    else if (!textAndSymbolPattern.test(DepartmentofPi)) {
      newErrors.DepartmentofPi = "Department of Pi must not contain numeric values";
      valid = false;
    } else {
      newErrors.DepartmentofPi = "";
    }

    if (DesignationofPi.trim() === "") {
      newErrors.DesignationofPi = "Designation of Pi is required";
      valid = false;
    } 
    else if (!textAndSymbolPattern.test(DesignationofPi)) {
      newErrors.DesignationofPi = "DesignationofPi must not contain numeric values";
      valid = false;
    } 
    else {
      newErrors.DesignationofPi = "";
    }
    if (NameGovernmentBody.trim() === "") {
      newErrors.NameGovernmentBody = "Name of Government Body is required";
      valid = false;
    }
    else if(numericPattern.test(NameGovernmentBody)){
      newErrors.NameGovernmentBody = "Inavlid Format";
      valid = false;
    }
     else {
      newErrors.NameGovernmentBody = "";
    }

     if(numericPattern.test(CoalitionPartners)){
      newErrors.CoalitionPartners = "Inavlid Format";
      valid = false;
    }
    if (DateofPresentation.trim() === "") {
      newErrors.DateofPresentation = "Date of Presentation is required";
      valid = false;
    } else {
      newErrors.DateofPresentation = "";
    }

    if (issueverification.trim() === "") {
      newErrors.issueverification = "Issue Verification is required";
      valid = false;
    } else if (!textAndSymbolPattern.test(issueverification)) {
      newErrors.issueverification = "Invalid Format(Shouldn't contain numerics)";
      valid = false;
    }
    else {
      newErrors.issueverification = "";
    }

    if (AdvocacyTools.trim() === "") {
      newErrors.AdvocacyTools = "Advocacy Tools is required";
      valid = false;
    } else if (numericPattern.test(AdvocacyTools)) {
      newErrors.AdvocacyTools = "Invalid Format(Shouldn't contain only numerics)";
      valid = false;
    }
    else {
      newErrors.AdvocacyTools = "";
    }

    if (BackingResearchStatus.trim() === "") {
      newErrors.BackingResearchStatus = "Backing Research Status is required";
      valid = false;
    } else if (numericPattern.test(BackingResearchStatus)) {
      newErrors.BackingResearchStatus = "Invalid Format(Shouldn't contain only numerics)";
      valid = false;
    } else {
      newErrors.BackingResearchStatus = "";
    }
    if (!Casestudycopy) {
      newErrors.Casestudycopy = "Copy of Casestudy is required";
      valid = false;
    }
    else if (!['image/jpeg', 'image/jpg', 'image/png'].includes(Casestudycopy.type)) {
      newErrors.Casestudycopy = "Only jpg, jpeg, and png files are allowed";
      valid = false;
    }
     else {
      newErrors.Casestudycopy = "";
    }
    if (Breif.trim() === "") {
      newErrors.Breif = "Brief is required";
      valid = false;
    }  else if (numericPattern.test(Breif)) {
      newErrors.Breif = "Invalid Format(Shouldn't contain only numerics)";
      valid = false;
    }else {
      newErrors.Breif = "";
    }

    setErrors(newErrors);
    return valid;
  };

  useEffect(() => {
    console.log(session);
  }, [session]);
  const handleSubmit = async () => {
    if (submitting) {
      return;
    }
    setSubmitting(true);
    try {
      if (!validateForm()) {
        alert("Please fill all the fields");
        setSubmitting(false)
        return;
      }
      if (session.user.username === "") {
        alert("Please login to continue");
        signOut({ callbackUrl: "http://localhost:3000/" });;
        return;
      }
  
      // Step 1: Insert the record and get the `id`
      const res = await axios.post(`/api/Research_projects/insert_casestudy`, {
        username: session.user.username,
        Name_of_Government_Body: NameGovernmentBody,
        Advocacy_tools: AdvocacyTools,
        Area_advocated: AreaAdvocated,
        Date_of_presentation: new Date(DateofPresentation),
        Banking_research_status: BackingResearchStatus,
        Coalation_Partner: CoalitionPartners,
        Breif_Details: Breif,
        Issue_verification: issueverification,
        Name_of_pi:Nameofpi,                
        Designation_of_Pi  :DesignationofPi,       
        Department_of_Pi  :DepartmentofPi,
      });
  
      if (res.data && res.data.policy_casestudy) {
        const { id } = res.data.policy_casestudy; // Get the inserted record's `id`
  
        // Step 2: Upload the file using the `id`
        if (Casestudycopy) {
          await uploadFile(
            Casestudycopy,
            session.user.username,
            `/api/Imagesfeilds/fileupload`,
            `${id}_policyorCasestudycopy`, // Use `id` instead of `NameGovernmentBody`
            "policy_casestudy"
          );
        } else {
          alert("Please upload CaseStudy Copy");
        }
  
        resetAdvocacyFormFields();
        setOpen(false);
        setshowSuccessSuccessModal(true);
  
        console.log(res);
      } else {
        console.error("Invalid response structure:", res.data);
        alert("Error occurred while creating policy case study");
      }
    } catch (error) {
      console.error("Error inserting information:", error);
    }finally {
      setSubmitting(false);
    }
  };
  

  return (
    <>
      <Modal
        id={"CaseStudyFormModal"}
        consumer={children}
        isOpen={isOpen}
        setOpen={setOpen}
      >
        <div className="h-screen overflow-y-auto bg-white shadow-lg rounded-md mx-auto  my-2 px-10 w-4/5  ">
          <div className="flex justify-end  mt-8 items-end gap-x-6">
            <FaTimes
              className="text-red-500 text-xl  cursor-pointer"
              onClick={() => {
                setOpen(false);
              }}
            />
          </div>
          <div className="py-2 m-2 flex flex-col gap-y-8   ">
          <div>
                <h1 className="text-blue-900   font-bold text-xl py-2  border-black">
                  Enter Details About Policy Advocacy
                </h1>
              </div>
              <div>
                <InputField
                  label={"Government Body"}
                  value={NameGovernmentBody}
                  setVal={setNameGovernmentBody}
                  required
                />
                {errors.NameGovernmentBody && (
                  <span className="text-red-500">
                    {errors.NameGovernmentBody}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
                    <div>
                      <InputField
                        label={"Name of Pi"}
                        value={Nameofpi}
                        setVal={setNameofPi}
                        required
                      />
                      {errors.Nameofpi && (
                        <span className="text-red-500">
                          {errors.Nameofpi}
                        </span>
                      )}
                    </div>
                    <div>
                      <InputField
                        label={"Department of Pi"}
                        value={DepartmentofPi}
                        setVal={setDepartmentofPi}
                        required
                      />
                      {errors.DepartmentofPi && (
                        <span className="text-red-500">
                          {errors.DepartmentofPi}
                        </span>
                      )}
                    </div>
                    <div>
                    <InputField
                      label={"Designation of Pi"}
                      value={DesignationofPi}
                      setVal={setDesignationofPi}
                      required
                    />
                    {errors.DesignationofPi && (
                      <span className="text-red-500">
                        {errors.DesignationofPi}
                      </span>
                    )}
                     </div>
                  
                  </div>
            <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
              
              <div>
                <InputField
                  label={"Area Advocated"}
                  value={AreaAdvocated}
                  setVal={setAreaAdvocated}
                  required
                />
                {errors.AreaAdvocated && (
                  <span className="text-red-500">{errors.AreaAdvocated}</span>
                )}
              </div>

             
              <div>
                <InputField
                  label={"Date of Presentation"}
                  value={DateofPresentation}
                  type={"date"}
                  setVal={setDateofPresentation}
                  required
                />
                {errors.DateofPresentation && (
                  <span className="text-red-500">
                    {errors.DateofPresentation}
                  </span>
                )}
              </div>
<div>
<InputField
                label={"Coalition Partners"}
                value={CoalitionPartners}
                setVal={setCoalitionPartners}
              />
               {errors.CoalitionPartners && (
                  <span className="text-red-500">
                    {errors.CoalitionPartners}
                  </span>
                )}
</div>
            
              <div>
                <InputField
                  label={"Issue Verification"}
                  value={issueverification}
                  setVal={setissueverification}
                  required
                />
                {errors.issueverification && (
                  <span className="text-red-500">
                    {errors.issueverification}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-x-3   text-black">
                <label className="text-base font-medium">
                  Casestudy Copy <span className="text-red-500">*</span>
                </label>
                <input
                  className="outline outline-1 focus:outline-2 focus:outline-blue-900 outline-black px-2 rounded-sm"
                  type="file"
                  defaultValue={Casestudycopy}
                  onChange={(e) => {
                    console.log("File selected:", e.target.files[0]);
                    setCasestudycopy(e.target.files[0]);
                  }}
                  required
                />
                {errors.Casestudycopy && (
                  <span className="text-red-500">{errors.Casestudycopy}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <label
                For="Inputfeild"
                className="text-base font-medium text-black"
              >
                Advocacy Tools<span className="text-red-500">*</span>
              </label>
              <input
                className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
                id="Inputfeild"
                value={AdvocacyTools}
                onChange={handleAdvocacyToolschange}
                required
              />
              {errors.AdvocacyTools && (
                <span className="text-red-500">{errors.AdvocacyTools}</span>
              )}
            </div>
            <div className="flex flex-col">
              <label
                For="Inputfeild"
                className="text-base font-medium text-black"
              >
                Backing Research Status<span className="text-red-500">*</span>
              </label>
              <input
                className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
                rows="3"
                cols="50"
                id="Inputfeild"
                value={BackingResearchStatus}
                onChange={handleBackingResearchStatuschange}
                required
              />
              {errors.BackingResearchStatus && (
                <span className="text-red-500">
                  {errors.BackingResearchStatus}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label
                For="textarea"
                className="text-base font-medium text-black"
              >
                Enter Breif Details<span className="text-red-500">*</span>
              </label>
              <textarea
                className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
                rows="3"
                cols="50"
                id="Textarea"
                value={Breif}
                onChange={handleBreifchange}
                required
              />
              {errors.Breif && (
                <span className="text-red-500">{errors.Breif}</span>
              )}
            </div>
            <div className="flex items-center justify-center w-full">
            <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full bg-blue-900 text-white px-4 py-2 rounded-md mt-4 ">
                    {submitting ? "Saving..." : "Save"}
                  </button>
            </div>
          </div>
        </div>
      </Modal>
      {showSuccessModal && (
        <SuccessModal
          isOpen={showSuccessModal}
          p={`Your Data has been Saved `}
          onClose={() => {
            setshowSuccessSuccessModal(false);
          }}
        />
      )}
    </>
  );
}

export default CasestudyForm;
