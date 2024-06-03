import Dropdown from "@/components/FacultyDashboard/Profile/components/Common/Dropdown";
import InputField from "@/components/FacultyDashboard/Profile/components/Common/InputField";
import React, { useState, useEffect } from "react";
import SuccessModal from "../../components/UI/SuccessMessage";
import { FaTimes, FaEdit } from 'react-icons/fa'; 
import axios from "axios";
import Modal, { useModalState } from "react-simple-modal-provider";
import { signIn, signOut, useSession } from "next-auth/react";
import { uploadFile } from "../../Utility/Saveimagefiles";
import useFieldCheck from "../../Utility/CheckExsistingFeilds";
function ConsultacyContract({ children }) {
  const [isOpen, setOpen] = useModalState();
  const [Title_of_Project, setTitle_of_Project] = useState("");
  const [NameofPi, setNameofPi] = useState("");
  const [DateofExecution, setDateofExecution] = useState("");
  const [Designation_of_Pi, setDesignation_of_Pi] = useState("");
  const [Department_of_Pi, setDepartment_of_Pi] = useState("");
  const [Company_Address, setCompany_Address] = useState("");
  const [Remarks, setRemarks] = useState("");
  const [Company_Name, setCompany_Name] = useState("");
  const [Contractcopy, setContractcopy] = useState("");
  const [Contract_value, setContract_value] = useState("");
  const [Startdate, setStartdate] = useState("");
  const [Enddate, setEnddate] = useState("");
  const [consultancy_services, setconsultancy_services] =
    useState("Feasibility");
  const [ORICpercent, setORICpercent] = useState("");
  const [delievery, setdelievery] = useState("");
  const { data: session } = useSession();
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setshowSuccessModal] = useState(false); // State to control SuccessModal visibility
  const handleRemarkschange = (e) => {
    setRemarks(e.target.value);
  };
  const handledelieverychange = (e) => {
    setdelievery(e.target.value);
  };
  function resetFormFields() {
    setOpen(false);
    setTitle_of_Project("");
    setNameofPi("");
    setDateofExecution("");
    setDesignation_of_Pi("");
    setDepartment_of_Pi("");
    setCompany_Address("");
    setRemarks("");
    setCompany_Name("");
    setContractcopy("");
    setContract_value("");
    setStartdate("");
    setEnddate("");
    setconsultancy_services("Feasibility");
    setORICpercent("");
    setdelievery("");
  }
  
 
  const { isExisting: isExistingProject, loading: loadingProjectCheck } = useFieldCheck(
    session?.user?.username,
    'Title',
    Title_of_Project,
    '/api/Research_projects/get_Consultancy_services'
  );

  
  const handleconsultancy_services = (e) => {
    setconsultancy_services(e.target.value);
  };
  useEffect(() => {
    console.log(session);
  }, [session]);
  const validateForm = async () => {
    let valid = true;
    const newErrors = {};

    if (Title_of_Project.trim() === "") {
      newErrors.Title_of_Project = "Title of Project is required";
      valid = false;
    }
    else if (isExistingProject) {
      newErrors.Title_of_Project = "A Project with this title already exists for you";
      valid = false;
    } else {
      newErrors.Title_of_Project= "";
    }


    if (NameofPi.trim() === "") {
      newErrors.NameofPi = "Name of Pi is required";
      valid = false;
    } else {
      newErrors.NameofPi = "";
    }

    if (Designation_of_Pi.trim() === "") {
      newErrors.Designation_of_Pi = "Designation of Pi is required";
      valid = false;
    } else {
      newErrors.Designation_of_Pi = "";
    }

    if (Department_of_Pi.trim() === "") {
      newErrors.Department_of_Pi = "Department of Pi is required";
      valid = false;
    } else {
      newErrors.Department_of_Pi = "";
    }
    if (DateofExecution.trim() === "") {
      newErrors.DateofExecution = "Date of Execution is required";
      valid = false;
    } else {
      newErrors.DateofExecution = "";
    }

    if (Company_Name.trim() === "") {
      newErrors.Company_Name = "Company Name is required";
      valid = false;
    } else {
      newErrors.Company_Name = "";
    }

    if (Company_Address.trim() === "") {
      newErrors.Company_Address = "Company Address is required";
      valid = false;
    } else {
      newErrors.Company_Address = "";
    }

    if (Startdate.trim() === "") {
      newErrors.Startdate = "Start Date is required";
      valid = false;
    } else {
      newErrors.start_Date = "";
    }

    if (Enddate.trim() === "") {
      newErrors.Enddate = "End Date is required";
      valid = false;
    } else if (new Date(Enddate) <= new Date(Startdate)) {
      newErrors.EndDate = "Enter Correct Information";
      valid = false;
    }

    if (delievery.trim() === "") {
      newErrors.delievery = "Project deliverables are required";
      valid = false;
    } else {
      newErrors.delievery = "";
    }
    if (!Contractcopy) {
      newErrors.Contractcopy = "Contract copy are required";
      valid = false;
    } else if (!['image/jpeg', 'image/jpg', 'image/png'].includes(Contractcopy.type)) {
      newErrors.Contractcopy = "Only jpg, jpeg, and png files are allowed";
      valid = false;
    }
    else {
      newErrors.Contractcopy = "";
    }
    if (Contract_value.trim() === "") {
      newErrors.Contract_value = "Contract Value is required";
      valid = false;
    } else if (!/^\d+$/.test(Contract_value.trim())) {
      newErrors.Contract_value =
        "Contract Value should contain only numeric characters";
      valid = false;
    } else {
      newErrors.Contract_value = "";
    }
    setErrors(newErrors);
    return valid;
  };
  const handleSubmit = async () => {
    const isValid = await validateForm();
    if (submitting) {
      return;
    }
    setSubmitting(true);
    if (isValid && (Contractcopy)) {
    try {
      if (session.user.username === "") {
        alert("Please login to continue");
        signOut({ callbackUrl: "http://localhost:3000/" });      
          return;
      }
      try {
        if (Contractcopy) {
          await uploadFile(Contractcopy, session.user.username, `/api/Imagesfeilds/fileupload`,`${Title_of_Project}_Contractcopy`,"consultancy_contract");
        }
        else{
          alert("Please upload Contact Copy")
        }
  
    } catch (error) {
      console.error("Error saving image:", error);
      alert("error")
    }
      const res = await axios.post(
        `/api/Research_projects/insert_consultancy_contract`,
        {
          username: session.user.username,
          Type_of_ConsultancyServices: consultancy_services,
          Title: Title_of_Project,
          Name_of_Pi:NameofPi,
          Designation_of_Pi: Designation_of_Pi,
          Department_of_Pi: Department_of_Pi,
          Date_of_Execution: new Date(DateofExecution).toISOString(),
          Company_Name: Company_Name,
          Company_Address: Company_Address,
          start_Date: new Date(Startdate).toISOString(),
          end_Date: new Date(Enddate).toISOString(),
          Contract_Value: Contract_value,
          ORIC_percentage: ORICpercent,
          Remarks: Remarks,
          deliverables: delievery,
        }
      );

      setOpen(false);
      console.log(res);
      resetFormFields()
      setshowSuccessModal(true)
    }
     catch (error) {
      console.error("Error inserting information:", error);
    }finally {
      setSubmitting(false);
    }
  }
    
  else{
    alert("Please fill all the feilds");
  }
  }
  return (
    <>
    <Modal
      id={"ConsultancyContractFormModal"}
      consumer={children}
      isOpen={isOpen}
      setOpen={setOpen}
    >
      <div className="h-screen overflow-y-auto bg-white shadow-lg rounded-md mx-auto  my-2 px-10 w-4/5  ">
      <div className="flex justify-end  mt-8 items-end gap-x-6">
    
    <FaTimes className="text-red-500 text-xl  cursor-pointer" onClick={()=>{
setOpen(false)
    } } />
  </div>
        <h1 className="text-blue-900   font-bold text-xl py-2 m-2 border-blue-900">
          Enter Details About Consultacy Contract Executed through ORIC
        </h1>
        <div className="py-2 m-2 flex flex-col gap-y-8   ">
          <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
            <div></div>

            <br />
            <div>
              <InputField
                label={"Title of Project"}
                value={Title_of_Project}
                setVal={setTitle_of_Project}
                required
              />
              {errors.Title_of_Project && (
                <span className="text-red-500">{errors.Title_of_Project}</span>
              )}
            </div>
            <div>
              <InputField
                label={"Name of Pi"}
                value={NameofPi}
                setVal={setNameofPi}
                required
              />
              {errors.NameofPi && (
                <span className="text-red-500">{errors.NameofPi}</span>
              )}
            </div>
            <div>
              <InputField
                label={"Designation_of_Pi"}
                value={Designation_of_Pi}
                setVal={setDesignation_of_Pi}
                required
              />
              {errors.Designation_of_Pi && (
                <span className="text-red-500">{errors.Designation_of_Pi}</span>
              )}
            </div>
            <div>
              <InputField
                label={"Department of Pi"}
                value={Department_of_Pi}
                setVal={setDepartment_of_Pi}
                required
              />
              {errors.Department_of_Pi && (
                <span className="text-red-500">{errors.Department_of_Pi}</span>
              )}
            </div>
            <div>
              <InputField
                label={"Date of Execution"}
                value={DateofExecution}
                type={"date"}
                setVal={setDateofExecution}
                required
              />
              {errors.DateofExecution && (
                <span className="text-red-500">{errors.DateofExecution}</span>
              )}
            </div>
            <div>
            <InputField
              label={"Name of Company"}
              value={Company_Name}
              setVal={setCompany_Name}
              required
            />
             {errors.Company_Name && (
      <span className="text-red-500">{errors.Company_Name}</span>
    )}
        </div>
        <div>
            <InputField
              label={"Contract Value(PKR)"}
              value={Contract_value}
              setVal={setContract_value}
              required
            />
             {errors.Contract_value && (
      <span className="text-red-500">{errors.Contract_value}</span>
    )}
    </div>
    <div>
            <InputField
              label={"Company Address"}
              value={Company_Address}
              setVal={setCompany_Address}
              required
            />
             {errors.Company_Address&& (
      <span className="text-red-500">{errors.Company_Address}</span>
    )}
    </div><div>
            <InputField
              label={"Start Date"}
              value={Startdate}
              type={"date"}
              setVal={setStartdate}
              required
            />
             {errors.Startdate&& (
      <span className="text-red-500">{errors.Startdate}</span>
    )}
    </div>
           <div> <InputField
              label={"End Date"}
              value={Enddate}
              type={"date"}
              setVal={setEnddate}
              required
            />
             {errors.Enddate&& (
      <span className="text-red-500">{errors.Enddate}</span>
    )}
    </div>
            <InputField
              label={"ORIC percentage(if any)"}
              value={ORICpercent}
              setVal={setORICpercent}
            />
              <div className="grid grid-cols-2 gap-x-3   text-black">
        <label className="text-base font-medium">
        Contract Copy <span className="text-red-500">*</span>
      </label>
      <input
    className="outline outline-1 focus:outline-2 focus:outline-blue-900 outline-black px-2 rounded-sm"
    type="file"
    defaultValue={Contractcopy}
    onChange={(e) => {
      console.log("File selected:", e.target.files[0]);
      setContractcopy(e.target.files[0]);
     
    }}
    required
  />
  {errors.Contractcopy && (
                <span className="text-red-500">{errors.Contractcopy}</span>
              )}
 
    </div>
          </div>
          <div className="flex flex-col gap-x-10 ">
            <Dropdown
              label={"Type of Cunstultancy Services"}
              dropdownOptions={[
                "Feasibility",
                "Prototype",
                "Development",
                "Testing",
                "Analysis",
                "Others",
              ]}
              value={consultancy_services}
              handleOptionChange={handleconsultancy_services}
            />
          </div>

          <label For="textarea" className="text-base font-medium text-black">
            Enter Remarks{" "}
          </label>
          <textarea
            className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
            rows="3"
            cols="50"
            id="Textarea"
            value={Remarks}
            onChange={handleRemarkschange}
          />

          <label For="textarea" className="text-base font-medium text-black">
            Enter Key Project deliverables<span className="text-red-500">*</span>
          </label>
          {errors.delievery&& (
      <span className="text-red-500">{errors.delievery}</span>
    )}
          <textarea
            className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
            rows="3"
            cols="50"
            id="Textarea"
            value={delievery}
            onChange={handledelieverychange}
          />
 
          <div className="flex items-center justify-center w-full">
          <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="ml-auto bg-blue-900 text-white px-4 py-2 rounded-md mt-4 ">
                    {submitting ? "Saving..." : "Save"}
                  </button>
          </div>
        </div>
      </div>
    </Modal>
      {
        showSuccessModal &&
        (
          <SuccessModal isOpen={showSuccessModal} p={`Your Data has been Saved `} onClose={()=>{
            setshowSuccessModal(false)
          }}/>
        )
      }
      </>
  );
}

export default ConsultacyContract;
