import React, { useState } from "react";
import Modal, { useModalState } from "react-simple-modal-provider";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import InputField from "@/components/FacultyDashboard/Profile/components/Common/InputField";
import Dropdown from "@/components/FacultyDashboard/Profile/components/Common/Dropdown";
import { uploadFile } from "@/components/FacultyDashboard/ResearchExcellence/Utility/Saveimagefiles";
import SuccessModal from "@/components/FacultyDashboard/ResearchExcellence/components/UI/SuccessMessage";
import { FaTimes } from 'react-icons/fa';

export default function ReveneueByHEIForm({ children }) {
  const [isOpen, setOpen] = useModalState();
  const { data: session } = useSession();
  const [AuditedStatement,setAuditedStatement]=useState();
  const [Name_of_Lead_Inventor, setName_of_Lead_Inventor] = useState("");
  const [Designation_of_Lead_Inventor, setDesignation_of_Lead_Inventor] = useState("");
  const [Department_of_Lead_Inventor, setDepartment_of_Lead_Inventor] = useState("");
  const [Title_of_Invention, setTitle_of_Invention] = useState("");
  const [Nationality, setNationality] = useState("National");
  const [Date_of_Agreement, setDate_of_Agreement] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [Licensee_Name, setLicensee_Name] = useState("");
  const [Licensee_Organization, setLicensee_Organization] = useState("");
  const [Fee_Royalty_Share_Percentages, setFee_Royalty_Share_Percentages] = useState("");
  const [Total_Amount, setTotal_Amount] = useState("");
  const [ORIC_Approved_Share, setORIC_Approved_Share] = useState("");
  const [ORIC_Received_Share, setORIC_Received_Share] = useState("");
  const [Remarks, setRemarks] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
 
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (Name_of_Lead_Inventor.trim() === "") {
      newErrors.Name_of_Lead_Inventor = "Name of Lead Inventor is required";
      valid = false;
    }
    if (Designation_of_Lead_Inventor.trim() === "") {
      newErrors.Designation_of_Lead_Inventor = "Designation of Lead Inventor is required";
      valid = false;
    }
    if (Department_of_Lead_Inventor.trim() === "") {
      newErrors.Department_of_Lead_Inventor = "Department of Lead Inventor is required";
      valid = false;
    }
    if (Title_of_Invention.trim() === "") {
      newErrors.Title_of_Invention = "Title of Invention is required";
      valid = false;
    }
    if (Nationality.trim() === "") {
      newErrors.Nationality = "Nationality is required";
      valid = false;
    }
    if (Date_of_Agreement.trim() === "") {
      newErrors.Date_of_Agreement = "Date of Agreement is required";
      valid = false;
    }
    if (StartDate.trim() === "") {
      newErrors.StartDate = "Start Date is required";
      valid = false;
    }
    if (EndDate.trim() === "") {
      newErrors.EndDate = "End Date is required";
      valid = false;
    } else if (new Date(EndDate) <= new Date(StartDate)) {
      newErrors.EndDate = "Enter Correct Information";
      valid = false;
    }
    if (Licensee_Name.trim() === "") {
      newErrors.Licensee_Name = "Licensee Name is required";
      valid = false;
    }
    if (Licensee_Organization.trim() === "") {
      newErrors.Licensee_Organization = "Licensee Organization is required";
      valid = false;
    }
    if (Fee_Royalty_Share_Percentages.trim() === "") {
      newErrors.Fee_Royalty_Share_Percentages = "Fee / Royalty Share Percentages are required";
      valid = false;
    }else if (isNaN(Fee_Royalty_Share_Percentages)) {
      newErrors.Fee_Royalty_Share_Percentages = "Fee / Royalty Share Percentages must be numeric";
      valid = false;
    }
    if (Total_Amount.trim() === "") {
      newErrors.Total_Amount = "Total Amount is required";
      valid = false;
    }else if (isNaN(Total_Amount)) {
      newErrors.Total_Amount = "Total Amount must be numeric";
      valid = false;
    }
    if (ORIC_Approved_Share.trim() === "") {
      newErrors.ORIC_Approved_Share = "ORIC Approved Share is required";
      valid = false;
    }else if (isNaN(ORIC_Approved_Share)) {
      newErrors.ORIC_Approved_Share = "ORIC Approved Share must be numeric";
      valid = false;
    }
    if (ORIC_Received_Share.trim() === "") {
      newErrors.ORIC_Received_Share = "ORIC Received Share is required";
      valid = false;
    }else if (isNaN(ORIC_Received_Share)) {
      newErrors.ORIC_Received_Share = "ORIC Received Share must be numeric";
      valid = false;
    }
    if (!AuditedStatement) {
      newErrors.AuditedStatement = "Audited Statement is required";
      valid = false;
    }else if (!['image/jpeg', 'image/jpg', 'image/png'].includes(AuditedStatement.type)) {
      newErrors.AuditedStatement = "Only jpg, jpeg, and png files are allowed";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };
   // Function to reset all form fields
   const resetFields = () => {
    setName_of_Lead_Inventor("");
    setDesignation_of_Lead_Inventor("");
    setDepartment_of_Lead_Inventor("");
    setTitle_of_Invention("");
    setNationality("National");
    setDate_of_Agreement("");
    setStartDate("");
    setEndDate("");
    setLicensee_Name("");
    setLicensee_Organization("");
    setFee_Royalty_Share_Percentages("");
    setTotal_Amount("");
    setORIC_Approved_Share("");
    setORIC_Received_Share("");
    setRemarks("");
    setAuditedStatement(null);
    setErrors({});
  };
  const handleNationalityChange = (e) => {
    setNationality(e.target.value);
  };
  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };
  const handleSubmit = async () => {
    alert("clicked")
    if (submitting) {
      return;
    }
    setSubmitting(true);
    if (session.user.username === "") {
      alert("Please login to continue");
      signOut({ callbackUrl: "http://localhost:3000/" });
      return;
    }

    if (!validateForm()) {
      alert("Please fill all the required fields")
      return;
    }

    try {
      if (AuditedStatement) {
        await uploadFile(
          AuditedStatement,
          session.user.username,
          `/api/Imagesfeilds/fileupload`,
          `${Title_of_Invention}_AuditedStatement`,
          "RevenueByHEI"
        );
      } else {
        alert("Please upload Audited Statement Copy");
      }
    } catch (error) {
      console.error("Error saving image:", error);
      alert("error");
    }
    try {
      const res = await axios.post(`/api/ORIC_Sustainability/Revenue/insert_RevenueByHEI`, {
        username: session.user.username,
        Name_of_Lead_Inventor: Name_of_Lead_Inventor,
        Designation_of_Lead_Inventor: Designation_of_Lead_Inventor,
        Department_of_Lead_Inventor: Department_of_Lead_Inventor,
        Title_of_Invention: Title_of_Invention,
        Nationality: Nationality,
        Date_of_Agreement: new Date(Date_of_Agreement),
        StartDate: new Date(StartDate),
        EndDate:new Date( EndDate),
        Licensee_Name: Licensee_Name,
        Licensee_Organization: Licensee_Organization,
        Fee_Royalty_Share_Percentages: Fee_Royalty_Share_Percentages,
        Total_Amount: Total_Amount,
        ORIC_Approved_Share: ORIC_Approved_Share,
        ORIC_Received_Share: ORIC_Received_Share,
        Remarks: Remarks,
      });

      console.log(res);
      setOpen(false);
      resetFields()
      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. An error occurred.");
    } finally {
      setSubmitting(false);
    }
    console.log("Clicked")
  };

  return (
    <>
      <Modal
        id={"ReveneueByHEIFormModal"}
        consumer={children}
        isOpen={isOpen}
        setOpen={setOpen}
      >
        <div className="grid gap-y-8 grid-col bg-white h-screen overflow-y-auto shadow-lg rounded-md px-6 py-2 mt-">
        <div className="flex justify-end items-end  gap-x-6">
          <FaTimes className="text-red-500 text-xl cursor-pointer" onClick={()=>{
            setOpen(false);
          }} />
        </div>
          <h1 className="text-blue-900 font-serif font-bold text-xl  border-black">
            Revenue Generated by HEI
          </h1>
          <div>
            <InputField
              label={"Title of Invention"}
              value={Title_of_Invention}
              setVal={setTitle_of_Invention}
              required
            />
            {errors.Title_of_Invention && (
              <span className="text-red-500">{errors.Title_of_Invention}</span>
            )}
          </div>
          <div className="grid grid-cols-2 w-auto gap-y-8 gap-x-16">
          <div>
            <InputField
              label={"Name of Lead Inventor"}
              value={Name_of_Lead_Inventor}
              setVal={setName_of_Lead_Inventor}
              required
            />
            {errors.Name_of_Lead_Inventor && (
              <span className="text-red-500">{errors.Name_of_Lead_Inventor}</span>
            )}
          </div>
          <div >
            <InputField
              label={"Designation of Lead Inventor"}
              value={Designation_of_Lead_Inventor}
              setVal={setDesignation_of_Lead_Inventor}
              required
            />
            {errors.Designation_of_Lead_Inventor && (
              <span className="text-red-500">{errors.Designation_of_Lead_Inventor}</span>
            )}
          </div>
          <div>
            <InputField
              label={"Department of Lead Inventor"}
              value={Department_of_Lead_Inventor}
              setVal={setDepartment_of_Lead_Inventor}
              required
            />
            {errors.Department_of_Lead_Inventor && (
              <span className="text-red-500">{errors.Department_of_Lead_Inventor}</span>
            )}
          </div>
        
          <div>
  <Dropdown
    label={"Nationality"}
    dropdownOptions={[
      "National",
      "International",
      
    ]}    
    value={Nationality}
    handleOptionChange={handleNationalityChange}
    required
  />
  {errors.institute && (
    <span className="text-red-500">{errors.institute}</span>
  )}
</div>
          </div>
          <div className="grid grid-cols-2 w-auto gap-y-8 gap-x-16">
          <div>
            <InputField
              label={"Date  Agreement"}
              value={Date_of_Agreement}
              setVal={setDate_of_Agreement}
              type="date"
              required
            />
            {errors.Date_of_Agreement && (
              <span className="text-red-500">{errors.Date_of_Agreement}</span>
            )}
          </div>
          <div >
            <InputField
              label={"Start Date"}
              value={StartDate}
              setVal={setStartDate}
              type="date"
              required
            />
            {errors.StartDate && (
              <span className="text-red-500">{errors.StartDate}</span>
            )}
          </div>
          <div>
            <InputField
              label={"End Date"}
              value={EndDate}
              setVal={setEndDate}
              type="date"
              required
            />
            {errors.EndDate && (
              <span className="text-red-500">{errors.EndDate}</span>
            )}
          </div>
          </div>
          <h1 className="text-blue-900 font-serif font-bold text-xl py-2 border-black">
            Deatils of Licencsee
          </h1>
          <div className="grid grid-cols-2 w-auto gap-y-8 gap-x-16">
          <div>
            <InputField
              label={"Licensee Name"}
              value={Licensee_Name}
              setVal={setLicensee_Name}
              required
            />
            {errors.Licensee_Name && (
              <span className="text-red-500">{errors.Licensee_Name}</span>
            )}
          </div>
          <div>
            <InputField
              label={"Licensee Organization"}
              value={Licensee_Organization}
              setVal={setLicensee_Organization}
              required
            />
            {errors.Licensee_Organization && (
              <span className="text-red-500">{errors.Licensee_Organization}</span>
            )}
          </div>
          </div>
          <h1 className="text-blue-900 font-serif font-bold text-xl py-2 border-black">
            Deatils of Funding/Amount
          </h1>
          <div className="grid grid-cols-2 w-auto gap-y-8 gap-x-16">
          <div>
            <InputField
              label={"Fee / Royalty Share Percentages (between ORIC, University, and Inventor)"}
              value={Fee_Royalty_Share_Percentages}
              setVal={setFee_Royalty_Share_Percentages}
              required
            />
            {errors.Fee_Royalty_Share_Percentages && (
              <span className="text-red-500">{errors.Fee_Royalty_Share_Percentages}</span>
            )}
          </div>
          <div>
            <InputField
              label={"Total Amount in lieu of Royalty / Fee etc. (PKR Millions)"}
              value={Total_Amount}
              setVal={setTotal_Amount}
              required
            />
            {errors.Total_Amount && (
              <span className="text-red-500">{errors.Total_Amount}</span>
            )}
          </div>
          <div>
            <InputField
              label={"ORIC Approved Share (PKR Millions)"}
              value={ORIC_Approved_Share}
              setVal={setORIC_Approved_Share}
              required
            />
            {errors.ORIC_Approved_Share && (
              <span className="text-red-500">{errors.ORIC_Approved_Share}</span>
            )}
          </div>
          <div>
            <InputField
              label={"ORIC Received Share (PKR Millions)"}
              value={ORIC_Received_Share}
              setVal={setORIC_Received_Share}
              required
            />
            {errors.ORIC_Received_Share && (
              <span className="text-red-500">{errors.ORIC_Received_Share}</span>
            )}
          </div>
          </div>
          <div className="grid grid-cols-2 gap-x-3   text-black">
        <label className="text-base font-medium">
         Auduted Statement <span className="text-red-500">*</span>
      </label>
      <input
    className="outline outline-1 focus:outline-2 focus:outline-blue-900 outline-black px-2 rounded-sm"
    type="file"
    defaultValue={AuditedStatement}
    onChange={(e) => {
      console.log("File selected:", e.target.files[0]);
      setAuditedStatement(e.target.files[0]);
     
    }}
    required
  />
  {errors.AuditedStatement && (
                <span className="text-red-500">{errors.AuditedStatement}</span>
              )}
 
    </div>
         <div className="flex flex-col">
          <label htmlFor="textarea" className="text-base font-medium text-black">
            Enter Remarks{" "}
          </label>
          <textarea
            className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
            rows="4"
            cols="50"
            id="Textarea"
            value={Remarks}
            onChange={handleRemarksChange}
          />
          </div>
          
          <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="ml-auto bg-blue-900 text-white px-4 py-2 rounded-md mt-4 ">
                    {submitting ? "Saving..." : "Save"}
                  </button>
        </div>
      </Modal>
      {
      showSuccessModal &&
      <SuccessModal isOpen={showSuccessModal} p={`Your Data has been Saved `} onClose={()=>{
          setShowSuccessModal(false)
        }}/>
      }

    </>
  );
}
