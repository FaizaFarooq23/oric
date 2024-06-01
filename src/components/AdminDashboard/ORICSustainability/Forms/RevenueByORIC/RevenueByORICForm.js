import React, { useState } from "react";
import Modal, { useModalState } from "react-simple-modal-provider";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import InputField from "@/components/FacultyDashboard/Profile/components/Common/InputField";
import Dropdown from "@/components/FacultyDashboard/Profile/components/Common/Dropdown";
import SuccessModal from "@/components/FacultyDashboard/ResearchExcellence/components/UI/SuccessMessage";
import { FaTimes } from "react-icons/fa";
import RadioButtonGroup from "@/components/FacultyDashboard/Profile/components/Common/Radiobutton";
import { uploadFile } from "@/components/FacultyDashboard/ResearchExcellence/Utility/Saveimagefiles";
export default function RevenueByORICForm({ children }) {
  const [isOpen, setOpen] = useModalState();
  const { data: session } = useSession();
  const [Name_of_Research_Grant, setName_of_Research_Grant] = useState("");
  const [Nationality, setNationality] = useState("National");
  const [Title_of_ResearchProposal, setTitle_of_ResearchProposal] =
    useState("");
  const [Name_of_PI, setName_of_PI] = useState("");
  const [Designation_of_Pi, setDesignation_of_Pi] = useState("");
  const [Department_of_Pi, setDepartment_of_Pi] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [Total_Funding_Approved, setTotal_Funding_Approved] = useState("");
  const [Total_Funding_Released, setTotal_Funding_Released] = useState("");
  const [
    ORIC_Overhead_in_Approved_Funding,
    setORIC_Overhead_in_Approved_Funding,
  ] = useState("");
  const [
    ORIC_Overhead_in_Released_Funding,
    setORIC_Overhead_in_Released_Funding,
  ] = useState("");
  const [Remarks, setRemarks] = useState("");
  const [Collaborating_Partner, setCollaborating_Partner] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [AuditedStatement, setAuditedStatement] = useState();
  const [isJoint, setIsJoint] = useState("No"); // State for radio button
  const handletype = (e) => {
    setIsJoint(e);
  };
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (Name_of_Research_Grant.trim() === "") {
      newErrors.Name_of_Research_Grant = "Name of Research Grant is required";
      valid = false;
    }
    if (Nationality.trim() === "") {
      newErrors.Nationality = "Nationality is required";
      valid = false;
    }
    if (Title_of_ResearchProposal.trim() === "") {
      newErrors.Title_of_ResearchProposal =
        "Title of Research Proposal is required";
      valid = false;
    }
    if (Name_of_PI.trim() === "") {
      newErrors.Name_of_PI = "Name of PI is required";
      valid = false;
    }
    if (Designation_of_Pi.trim() === "") {
      newErrors.Designation_of_Pi = "Designation of PI is required";
      valid = false;
    }
    if (Department_of_Pi.trim() === "") {
      newErrors.Department_of_Pi = "Department of PI is required";
      valid = false;
    }
    if (StartDate.trim() === "") {
      newErrors.StartDate = "Start Date is required";
      valid = false;
    }
    if (Collaborating_Partner.trim() === "" && isJoint === "Yes") {
      newErrors.Collaborating_Partner = "Collaborating Partner is required";
      valid = false;
    }
    if (EndDate.trim() === "") {
      newErrors.EndDate = "End Date is required";
      valid = false;
    } else if (new Date(EndDate) <= new Date(StartDate)) {
      newErrors.EndDate = "End Date must be after Start Date";
      valid = false;
    }
    if (Total_Funding_Approved.trim() === "") {
      newErrors.Total_Funding_Approved = "Total Funding Approved is required";
      valid = false;
    } else if (
      isNaN(Total_Funding_Approved) ||
      !/^\d+(\.\d+)?$/.test(Total_Funding_Approved)
    ) {
      newErrors.Total_Funding_Approved =
        "Total Funding Approved must be numeric";
      valid = false;
    }
    if (Total_Funding_Released.trim() === "") {
      newErrors.Total_Funding_Released = "Total Funding Released is required";
      valid = false;
    } else if (
      isNaN(Total_Funding_Released) ||
      !/^\d+(\.\d+)?$/.test(Total_Funding_Released)
    ) {
      newErrors.Total_Funding_Released =
        "Total Funding Released must be numeric";
      valid = false;
    }
    if (ORIC_Overhead_in_Approved_Funding.trim() === "") {
      newErrors.ORIC_Overhead_in_Approved_Funding =
        "ORIC Overhead in Approved Funding is required";
      valid = false;
    } else if (isNaN(ORIC_Overhead_in_Approved_Funding)) {
      newErrors.ORIC_Overhead_in_Approved_Funding =
        "ORIC Overhead in Approved Funding must be numeric";
      valid = false;
    }
    if (ORIC_Overhead_in_Released_Funding.trim() === "") {
      newErrors.ORIC_Overhead_in_Released_Funding =
        "ORIC Overhead in Released Funding is required";
      valid = false;
    } else if (isNaN(ORIC_Overhead_in_Released_Funding)) {
      newErrors.ORIC_Overhead_in_Released_Funding =
        "ORIC Overhead in Released Funding must be numeric";
      valid = false;
    }
    if (!AuditedStatement) {
      newErrors.AuditedStatement = "Audited Statement is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNationalityChange = (e) => {
    setNationality(e.target.value);
  };

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };
  const resetFields = () => {
    setName_of_Research_Grant("");
    setNationality("National");
    setTitle_of_ResearchProposal("");
    setName_of_PI("");
    setDesignation_of_Pi("");
    setDepartment_of_Pi("");
    setStartDate("");
    setEndDate("");
    setTotal_Funding_Approved("");
    setTotal_Funding_Released("");
    setORIC_Overhead_in_Approved_Funding("");
    setORIC_Overhead_in_Released_Funding("");
    setRemarks("");
    setCollaborating_Partner("");
    setIsJoint("No");
    setAuditedStatement(null);
    setErrors({});
  };
  const handleSubmit = async () => {
    if (submitting) {
      return;
    }
    setSubmitting(true);
  
    if (!session?.user?.username) {
      alert("Please login to continue");
      signOut({ callbackUrl: "http://localhost:3000/" });
      return;
    }
  
    if (!validateForm()) {
      alert(" Error In Submitting Data Plz Check All the feilds");
      return;
    }
  
    try {
      if (AuditedStatement) {
        await uploadFile(
          AuditedStatement,
          session.user.username,
          `/api/Imagesfeilds/fileupload`,
          `${Title_of_ResearchProposal}_AuditedStatement`,
          "RevenueByORIC"
        );
      } else {
        alert("Please upload Audited Statement Copy");
        return;
      }
    } catch (error) {
      console.error("Error saving image:", error);
      alert("Error uploading Audited Statement");
      return;
    }
  
    try {
      const res = await axios.post(`/api/ORIC_Sustainability/Revenue/insert_RevenueByORIC`, {
        username: session.user.username,
        Name_of_Research_Grant:Name_of_Research_Grant,
        Nationality:Nationality,
        Title_of_ResearchProposal:Title_of_ResearchProposal,
        Name_of_PI:Name_of_PI,
        Designation_of_Pi:Designation_of_Pi,
        Department_of_Pi:Department_of_Pi,
        StartDate: new Date(StartDate),
        EndDate: new Date(EndDate),
        Total_Funding_Approved:Total_Funding_Approved,
        Total_Funding_Released:Total_Funding_Released,
        ORIC_Overhead_in_Approved_Funding:ORIC_Overhead_in_Approved_Funding,
        ORIC_Overhead_in_Released_Funding:ORIC_Overhead_in_Released_Funding,
        Remarks:Remarks,
        Collaborating_Partner: isJoint === "Yes" ? Collaborating_Partner : null,
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
  };
  
  return (
    <>
      <Modal
        id={"RevenueByORICFormModal"}
        consumer={children}
        isOpen={isOpen}
        setOpen={setOpen}
      >
        <div className="grid gap-y-8 grid-col bg-white h-screen overflow-y-auto shadow-lg rounded-md px-6 py-2 mt-">
          <div className="flex justify-end items-end  gap-x-6">
            <FaTimes
              className="text-red-500 text-xl cursor-pointer"
              onClick={() => {
                setOpen(false);
              }}
            />
          </div>
          <h1 className="text-blue-900 font-serif font-bold text-xl  border-black">
            Revenue Generated by ORIC
          </h1>
          <div className="p-2">
            <InputField
              label={"Title of Research Proposal"}
              value={Title_of_ResearchProposal}
              setVal={setTitle_of_ResearchProposal}
              required
            />
            {errors.Title_of_ResearchProposal && (
              <span className="text-red-500">
                {errors.Title_of_ResearchProposal}
              </span>
            )}
          </div>
          <div className="">
            <div className="grid grid-cols-2 grid p-2  w-auto gap-y-8 gap-x-16">
              <div>
                <Dropdown
                  label={"Nationality"}
                  dropdownOptions={["National", "International"]}
                  value={Nationality}
                  handleOptionChange={handleNationalityChange}
                  required
                />
                {errors.Nationality && (
                  <span className="text-red-500">{errors.Nationality}</span>
                )}
              </div>
              <div>
                <InputField
                  label={"Name of Research Grant"}
                  value={Name_of_Research_Grant}
                  setVal={setName_of_Research_Grant}
                  required
                />
                {errors.Name_of_Research_Grant && (
                  <span className="text-red-500">
                    {errors.Name_of_Research_Grant}
                  </span>
                )}
              </div>
            </div>
            <h1 className="text-blue-900 mt-2 font-serif font-bold text-xl  border-black">
              Details of Pi
            </h1>
            <div className="grid grid-cols-2  p-2  w-auto gap-y-8 gap-x-16">
              <div>
                <InputField
                  label={"Name of PI"}
                  value={Name_of_PI}
                  setVal={setName_of_PI}
                  required
                />
                {errors.Name_of_PI && (
                  <span className="text-red-500">{errors.Name_of_PI}</span>
                )}
              </div>
              <div>
                <InputField
                  label={"Designation of PI"}
                  value={Designation_of_Pi}
                  setVal={setDesignation_of_Pi}
                  required
                />
                {errors.Designation_of_Pi && (
                  <span className="text-red-500">
                    {errors.Designation_of_Pi}
                  </span>
                )}
              </div>
              <div>
                <InputField
                  label={"Department of PI"}
                  value={Department_of_Pi}
                  setVal={setDepartment_of_Pi}
                  required
                />
                {errors.Department_of_Pi && (
                  <span className="text-red-500">
                    {errors.Department_of_Pi}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-x-3   text-black">
                <label className="text-base font-medium">
                  Audited Statement <span className="text-red-500">*</span>
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
                  <span className="text-red-500">
                    {errors.AuditedStatement}
                  </span>
                )}
              </div>
            </div>

            <h1 className="text-blue-900 font-serif mt-2 font-bold text-xl  border-black">
              Duration
            </h1>
            <div className="grid grid-cols-2  p-2  w-auto gap-y-8 gap-x-16 mt-2">
              <div>
                <InputField
                  label={"Start Date"}
                  type={"date"}
                  value={StartDate}
                  setVal={setStartDate}
                  required
                />
                {errors.StartDate && (
                  <span className="text-red-500">{errors.StartDate}</span>
                )}
              </div>
              <div>
                <InputField
                  label={"End Date"}
                  type={"date"}
                  value={EndDate}
                  setVal={setEndDate}
                  required
                />
                {errors.EndDate && (
                  <span className="text-red-500">{errors.EndDate}</span>
                )}
              </div>
            </div>
            <h1 className="text-blue-900 mt-2 font-serif font-bold text-xl  border-black">
              Funding Details
            </h1>
            <div className="grid grid-cols-2 mt-2 p-2 w-auto gap-y-8 gap-x-16">
              <div>
                <InputField
                  label={"Total Funding Approved"}
                  value={Total_Funding_Approved}
                  setVal={setTotal_Funding_Approved}
                  required
                />
                {errors.Total_Funding_Approved && (
                  <span className="text-red-500">
                    {errors.Total_Funding_Approved}
                  </span>
                )}
              </div>
              <div>
                <InputField
                  label={"Total Funding Released"}
                  value={Total_Funding_Released}
                  setVal={setTotal_Funding_Released}
                  required
                />
                {errors.Total_Funding_Released && (
                  <span className="text-red-500">
                    {errors.Total_Funding_Released}
                  </span>
                )}
              </div>
              <div>
                <InputField
                  label={"ORIC Overhead in Approved Funding"}
                  value={ORIC_Overhead_in_Approved_Funding}
                  setVal={setORIC_Overhead_in_Approved_Funding}
                  required
                />
                {errors.ORIC_Overhead_in_Approved_Funding && (
                  <span className="text-red-500">
                    {errors.ORIC_Overhead_in_Approved_Funding}
                  </span>
                )}
              </div>
              <div>
                <InputField
                  label={"ORIC Overhead in Released Funding"}
                  value={ORIC_Overhead_in_Released_Funding}
                  setVal={setORIC_Overhead_in_Released_Funding}
                  required
                />
                {errors.ORIC_Overhead_in_Released_Funding && (
                  <span className="text-red-500">
                    {errors.ORIC_Overhead_in_Released_Funding}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-2">
              <h1 className="text-blue-900 font-serif font-bold text-xl  border-black">
                Additional Details
              </h1>
            </div>
            <div className="mt-2">
              <RadioButtonGroup
                label={"Is Research Proposal Joint"}
                options={["Yes", "No"]}
                value={isJoint}
                handleChange={handletype}
              />
              {isJoint === "Yes" && (
                <>
                  <InputField
                    label={"Collaborating Partner"}
                    value={Collaborating_Partner}
                    setVal={setCollaborating_Partner}
                    required
                  />
                  {errors.Name_of_Sponcering && (
                    <span className="text-red-500">
                      {errors.Name_of_Sponcering}
                    </span>
                  )}
                </>
              )}
            </div>
            <div className="flex flex-col mt-2">
              <label
                htmlFor="textarea"
                className="text-base font-medium text-black"
              >
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
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-950 w-5/6 text-white font-semibold rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
      {showSuccessModal && (
        <SuccessModal
          isOpen={showSuccessModal}
          p={`Your Data has been Saved `}
          onClose={() => {
            setShowSuccessModal(false);
          }}
        />
      )}
    </>
  );
}
