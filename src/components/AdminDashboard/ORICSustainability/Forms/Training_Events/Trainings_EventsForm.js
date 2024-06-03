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
export default function Trainings_EventsForm({ children }) {
  const [isOpen, setOpen] = useModalState();
  const { data: session } = useSession();
  const [Title_of_Training, setTitle_of_Training] = useState("");
  const [Date_of_Event, setDate_of_Event] = useState("");
  const [No_of_Participants, setNo_of_Participants] = useState("");
  const [Name_of_ORICPerosnal, setName_of_ORICPersonal] = useState("");
  const [Outcomes, setOutcomes] = useState("");
  const [Audience_Type, setAudience_Type] = useState("Faculty");
  const [Arranged_by, setArranged_by] = useState("ORIC");
  const [Organizer, setOrganizer] = useState("");
  const [Type_of_Event, setType_of_Event] = useState("");
  const [Category, setCategory] = useState("Trainings / Workshops / Seminars / Conferences");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});


  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleOutcomes = (e) => {
    setOutcomes(e.target.value);
  };
  const handleArrangedbychange = (e) => {
    setArranged_by(e.target.value);
  };

  const handleORICPersonalchange = (e) => {
    setName_of_ORICPersonal(e.target.value);
  };

  const handleAudienceType = (e) => {
    setAudience_Type(e.target.value);
  };
  const resetFields = () => {
    setTitle_of_Training("");
    setDate_of_Event("");
    setNo_of_Participants("");
    setName_of_ORICPersonal("");
    setOutcomes("");
    setAudience_Type("");
    setArranged_by("");
    setOrganizer("");
    setType_of_Event("");
    setCategory("");
    setErrors({});
  };
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (Category === "Trainings / Workshops / Seminars / Conferences") {
      if (Title_of_Training.trim() === "") {
        newErrors.Title_of_Training = "Title of Training is required";
        valid = false;
      }
    }

    if (Category === "Exhibitions / Showcasing Events / Industry Linkages Fair") {
      if (Type_of_Event.trim() === "") {
        newErrors.Type_of_Event = "Type of Event is required";
        valid = false;
      }
    }

    if (Arranged_by.trim() === "") {
      newErrors.Arranged_by = "Arranged By is required";
      valid = false;
    }

    if (Arranged_by === "Other HEIs" && Organizer.trim() === "") {
      newErrors.Organizer = "Organizer is required";
      valid = false;
    }

    if (Date_of_Event.trim() === "") {
      newErrors.Date_of_Event = "Date of Event is required";
      valid = false;
    }

    if (No_of_Participants.trim() === "") {
      newErrors.No_of_Participants = "Number of Participants is required";
      valid = false;
    } else if (isNaN(No_of_Participants) || !/^\d+$/.test(No_of_Participants)) {
      newErrors.No_of_Participants = "Number of Participants must be numeric";
      valid = false;
    }

    if (Audience_Type.trim() === "") {
      newErrors.Audience_Type = "Audience Type is required";
      valid = false;
    }

    if (Audience_Type === "ORIC Personal" && Name_of_ORICPersonal.trim() === "") {
      newErrors.Name_of_ORICPersonal = "Name of ORIC Personal is required";
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
   
      if (session.user.username === "") {
        alert("Please Login to Continue")
        signOut({ callbackUrl: "http://localhost:3000/" })
      }
if(validateForm()){

      try {
        const res = await axios.post(`/api/ORIC_Sustainability/Trainings_Events/insert`, {
          username: session.user.username,
          Title_of_Training: Title_of_Training,
          Date_of_Event: new Date(Date_of_Event),
          No_of_Participants: No_of_Participants,
          Category: Category,
          Outcomes: Outcomes,
          Audience_Type: Audience_Type,
          Arranged_by: Arranged_by,
          Name_of_ORICPersonal: Name_of_ORICPerosnal,
          Organizer: Organizer,
          Type_of_Event: Type_of_Event,
        })


        console.log(res);
        setOpen(false);
        setShowSuccessModal(true);
        resetFields()


      } catch (error) {
        console.error(error);
        alert("Something went wrong. An error occurred.");
      } finally {
        setSubmitting(false);
      }
    }
    else{
      alert("Please Fill all feilds")
      setSubmitting(false);
    }
    }
  return (
    <>
      <Modal
        id={"Trainings_EventsForm"}
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
          <h1 className="text-blue-900   font-bold text-xl  border-black">
            <h1 className="text-blue-900 mt-2   font-bold text-xl  border-black">
              Details of Events
            </h1>
          </h1>
          <div >
            <Dropdown
              label={"Category"}
              dropdownOptions={["Trainings / Workshops / Seminars / Conferences", "Exhibitions / Showcasing Events / Industry Linkages Fair"]}
              value={Category}
              handleOptionChange={handleCategoryChange}
              required
            />
            {errors.Nationality && (
              <span className="text-red-500">{errors.Nationality}</span>
            )}
          </div>
          <div >
            <div className="grid grid-cols-2 grid p-2  w-auto gap-y-8 gap-x-16">
              {
                Category === "Trainings / Workshops / Seminars / Conferences" ? (
                  <div>

                    <InputField
                      label={"Title of Training"}
                      value={Title_of_Training}
                      setVal={setTitle_of_Training}
                      required
                    />
                    {errors.Title_of_Training && (
                      <span className="text-red-500">
                        {errors.Title_of_Training}
                      </span>
                    )}
                  </div>
                ) :
                  <div >

                    <InputField
                      label={"Type of Event"}
                      value={Type_of_Event}
                      setVal={setType_of_Event}
                      required
                    />
                    {errors.Type_of_Event && (
                      <span className="text-red-500">
                        {errors.Type_of_Event}
                      </span>
                    )}
                  </div>

              }
              <div >
                <Dropdown
                  label={"Arranged By"}
                  dropdownOptions={["ORIC", "Other HEIs"]}
                  value={Arranged_by}
                  handleOptionChange={handleArrangedbychange}
                  required
                />
                {errors.Arranged_by && (
                  <span className="text-red-500">{errors.Arranged_by}</span>
                )}
              </div>
              {
                Arranged_by === "Other HEIs" &&
                <div>
                  <InputField
                    label={"Organizer"}
                    value={Organizer}
                    setVal={setOrganizer}
                    required
                  />
                  {errors.Organizer && (
                    <span className="text-red-500">{errors.Organizer}</span>
                  )}
                </div>
              }
            </div>

            <div className="grid grid-cols-2  p-2 mt-2 w-auto gap-y-8 gap-x-16">
              <div>
                <InputField
                  label={"Date Of event"}
                  value={Date_of_Event}
                  setVal={setDate_of_Event}
                  type={"date"}
                  required
                />
                {errors.Date_of_Event && (
                  <span className="text-red-500">
                    {errors.Date_of_Event}
                  </span>
                )}
              </div>
              <div>
                <InputField
                  label={"Number of Participants"}
                  value={No_of_Participants}
                  setVal={setNo_of_Participants}
                  required
                />
                {errors.No_of_Participants && (
                  <span className="text-red-500">
                    {errors.No_of_Participants}
                  </span>
                )}
              </div>
              <div >
                <Dropdown
                  label={"Audience Type"}
                  dropdownOptions={["Faculty","Students","Researcher","ORIC Personal"]}
                  value={Audience_Type}
                  handleOptionChange={handleAudienceType}
                  required
                />
                {errors.Audience_Type && (
                  <span className="text-red-500">{errors.Audience_Type}</span>
                )}
              </div>
            </div>





            <div className="mt-2">
              <h1 className="text-blue-900   font-bold text-xl  border-black">
                Additional Details
              </h1>
            </div>

            <div className="flex flex-col mt-2">
              <label
                htmlFor="textarea"
                className="text-base font-medium text-black"
              >
                Outcomes and Key FocusArea{" "}
              </label>
              <textarea
                className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
                rows="4"
                cols="50"
                id="Textarea"
                value={Outcomes}
                onChange={handleOutcomes}
              />
            </div>
            {
              Audience_Type === "ORIC Personal" &&
              <div className="flex flex-col mt-2">
                <label
                  htmlFor="textarea"
                  className="text-base font-medium text-black"
                >
                  Name of ORIC Personal Who Attended{" "}
                </label>
                <textarea
                  className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
                  rows="4"
                  cols="50"
                  id="Textarea"
                  value={Name_of_ORICPerosnal}
                  onChange={handleORICPersonalchange}
                  required
                />
              </div>

            }

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
