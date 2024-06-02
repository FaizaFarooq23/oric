import React, { useState } from "react";
import Modal, { useModalState } from "react-simple-modal-provider";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import InputField from "@/components/FacultyDashboard/Profile/components/Common/InputField";
import SuccessModal from "@/components/FacultyDashboard/ResearchExcellence/components/UI/SuccessMessage";
import { FaTimes } from 'react-icons/fa';

export default function VisitsForm({ children }) {
  const [isOpen, setOpen] = useModalState();
  const { data: session } = useSession();
  const [Name_of_Visitor, setName_of_Visitor] = useState("");
  const [Date_of_Visit, setDate_of_Visit] = useState("");
  const [Agenda_of_Visit, setAgenda_of_Visit] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
 
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (Name_of_Visitor.trim() === "") {
      newErrors.Name_of_Visitor = "Name of Visitor is required";
      valid = false;
    }
    if (Date_of_Visit.trim() === "") {
      newErrors.Date_of_Visit = "Date of Visit is required";
      valid = false;
    }
    if (Agenda_of_Visit.trim() === "") {
      newErrors.Agenda_of_Visit = "Agenda of Visit is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (submitting) {
      return;
    }
    setSubmitting(true);

    if (!validateForm()) {
      alert("Please fill all the required fields");
      setSubmitting(false)
      return;
    }

    try {
      const res = await axios.post(`/api/ORIC_Sustainability/Visits/insert`, {
        username: session.user.username,
        Name_of_Visitor: Name_of_Visitor,
        Date_of_Visit: new Date(Date_of_Visit),
        Agenda_of_Visit: Agenda_of_Visit,
      });

      console.log(res);
      setOpen(false);
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
        id={"VisitForm"}
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
            Visitor Information
          </h1>
          <div>
            <InputField
              label={"Name of Visitor"}
              value={Name_of_Visitor}
              setVal={setName_of_Visitor}
              required
            />
            {errors.Name_of_Visitor && (
              <span className="text-red-500">{errors.Name_of_Visitor}</span>
            )}
          </div>
          <div>
            <InputField
              label={"Date of Visit"}
              value={Date_of_Visit}
              setVal={setDate_of_Visit}
              type="date"
              required
            />
            {errors.Date_of_Visit && (
              <span className="text-red-500">{errors.Date_of_Visit}</span>
            )}
          </div>
          <div className="flex flex-col">
          <label htmlFor="textarea" className="text-base font-medium text-black">
            Agenda of Visit{" "}
          </label>
          <textarea
            className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
            rows="4"
            cols="50"
            id="Textarea"
            value={Agenda_of_Visit}
            onChange={(e)=>{
                setAgenda_of_Visit(e.target.value);
            }}
          />
          </div>
          <div className="flex justify-center">
          <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="ml-auto bg-blue-900 text-white px-4 py-2 rounded-md mt-4 ">
                    {submitting ? "Saving..." : "Save"}
                  </button>
          </div>
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
