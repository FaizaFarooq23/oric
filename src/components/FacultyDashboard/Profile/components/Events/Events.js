import React, { useState } from "react";
import Modal, { useModalState } from "react-simple-modal-provider";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import InputField from "../Common/InputField";
import Dropdown from "../Common/Dropdown";
import RadioButtonGroup from "../Common/Radiobutton";
import { uploadFile } from "@/components/FacultyDashboard/ResearchExcellence/Utility/Saveimagefiles";
import SuccessModal from "@/components/FacultyDashboard/ResearchExcellence/components/UI/SuccessMessage";
export default function CivilEventsModal({ children }) {
  const [isOpen, setOpen] = useModalState();
  const { data: session } = useSession();
  const [stage, setStage] = useState(1);
  const [Title_of_Event, setTitle_of_Event] = useState("");
  const [Date_of_event, setDate_of_event] = useState("");
  const [Venue_of_event, setVenue_of_event] = useState("");
  const [Community_Addressed, setCommunity_Addressed] = useState("");
  const [Name_of_Sponcering, setName_of_Sponcering] = useState("");
  const [Sponcerned, setSponcerned] = useState("No");
  const [Grant, setGrant] = useState("");
  const [Role, setRole] = useState("Organized");
  const [outcome, setoutcome] = useState("");
  const [outcomeMaterial, setoutcomeMaterial] = useState("");
  const [Remarks, setRemarks] = useState("");
  const [Event_detail, setEvent_detail] = useState("");
  const [Organization_involved, setOrganization_involved] = useState("");
  const [Collaborated_developed, setCollaborated_developed] = useState("");
  const [showSuccessModal, setshowSuccessSuccessModal] = useState(false); // State to control SuccessModal visibility

  const [errors, setErrors] = useState({});
  const handleSponcernedChange = (e) => {
    setSponcerned(e);
  };
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };
  const handleoutcomeChange = (e) => {
    setoutcome(e.target.value);
  };
  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };
  const checkExistingEvent = async () => {
    try {
      // Check if an award with the same title already exists for the user
      const existingEventsResponse = await axios.get(`/api/faculty/Events/fetch`, {
        params: {
          username: session.user.username,
          Title_of_Event: Title_of_Event,
        },
      });
  
      const existingEvents = existingEventsResponse.data;
  
      return existingEvents.some(Events => Events.Title_of_Event === Title_of_Event);
    } catch (error) {
      console.error("Error checking existing Events:", error);
      return false;
    }
  };
  

  const validateFormStage1 = async () => {
    let valid = true;
    const newErrors = {};
  
    if (Title_of_Event.trim() === "") {
      newErrors.Title_of_Event = "Title of Event is required";
      valid = false;
    } else {
      // Check if an award with the same title already exists for the user
      const isExistingEvents = await checkExistingEvent();
  
      if (isExistingEvents) {
        newErrors.Title_of_Event = "An Events with this title already exists for you";
        valid = false;
      } else {
        newErrors.Title_of_Event = "";
      }
    }
    
    if (Role.trim() === "") {
      newErrors.Role = "Role is required";
      valid = false;
    } else {
      newErrors.Role = "";
    }
    if (Date_of_event.trim() === "") {
      newErrors.Date_of_event = "Date of Event is required";
      valid = false;
    } else {
      newErrors.Date_of_event = "";
    }
    if (Venue_of_event.trim() === "") {
      newErrors.Venue_of_event = "Venue of Event is required";
      valid = false;
    } else {
      newErrors.Venue_of_event = "";
    }
    if (Community_Addressed.trim() === "") {
      newErrors.Community_Addressed = "Community Addressed is required";
      valid = false;
    } else {
      newErrors.Community_Addressed = "";
    }
    if (Sponcerned === "Yes") {
      if (Name_of_Sponcering.trim() === "") {
        newErrors.Name_of_Sponcering = "Name of Sponcering is required";
        valid = false;
      } else {
        newErrors.Name_of_Sponcering = "";
      }
      if (Grant.trim() === "") {
        newErrors.Grant = "Grant is required";
        valid = false;
      } else {
        newErrors.Grant = "";
      }
    }
  
    setErrors(newErrors);
    return valid;
  };
  
  const validateFormStage2 = () => {
    let valid = true;
    const newErrors = {};

    if (Collaborated_developed.trim() === "") {
      newErrors.Collaborated_developed =
        "Collaborated Developed field is required";
      valid = false;
    } else {
      newErrors.Collaborated_developed = "";
    }
    if (outcome.trim() === "") {
      newErrors.outcome = "Outcome field is required";
      valid = false;
    } else {
      newErrors.outcome = "";
    }
    if (Organization_involved.trim() === "") {
      newErrors.Organization_involved =
        "Name of Organization/Soceity Involved is required";
      valid = false;
    } else {
      newErrors.Organization_involved = "";
    }
    if (outcomeMaterial.trim() === "") {
      newErrors.outcomeMaterial =
        "Dissemination/outcome Material/Literature field is required";
      valid = false;
    } else {
      newErrors.outcomeMaterial = "";
    }

    setErrors(newErrors);
    return valid;
  };
  const validateFormStage3 = () => {
    let valid = true;
    const newErrors = {};
  
   
    if (!Event_detail) {
      newErrors.Event_detail = "Brief Event Report is required";
      valid = false;
    } else {
      newErrors.Event_detail = "";
    }
  
  
    setErrors(newErrors);
    return valid;
  };
  const nextStage = async () => {
    switch (stage) {
      case 1:
        if (await validateFormStage1()) {
          setStage(stage + 1);
        }
        break;
      case 2:
        if (validateFormStage2()) {
          setStage(stage + 1);
        }
        break;
        case 3:
          if (validateFormStage3()) {
            setStage(stage + 1);
          }
          break;
      default:
        setStage(stage + 1); // Update the state with setStage
        break;
    }
  };
  // Define a function to handle moving to the previous stage
  const prevStage = () => {
    setStage(stage - 1);
    if (stage === 0) {
      setStage(1);
    }
  };
  const resetForm = () => {
    setTitle_of_Event("");
    setDate_of_event("");
    setVenue_of_event("");
    setCommunity_Addressed("");
    setName_of_Sponcering("");
    setSponcerned("No");
    setGrant("");
    setRole("");
    setoutcome("");
    setoutcomeMaterial("");
    setRemarks("");
    setEvent_detail("");
    setOrganization_involved("");
    setCollaborated_developed("");
    setStage(1);
  };
  const handleSubmit = async () => {
    if (session.user.username === "") {
      alert("Please login to continue");
      signOut();
      return;
    }

    try {
      if (Event_detail) {
        await uploadFile(
          Event_detail,
          session.user.username,
          `/api/Imagesfeilds/fileupload`,
          `${Title_of_Event}_Eventreport_bonchures`,
          "civil_engagement_events"
        );
      } else {
        alert("Please upload Event Report Copy");
      }
    } catch (error) {
      console.error("Error saving image:", error);
      alert("error");
    }
    try {
      const res = await axios.post(`/api/faculty/Events/insert`, {
        username: session.user.username,
        Title_of_Event: Title_of_Event,
        Date_of_Event: new Date(Date_of_event),
        Community: Community_Addressed,
        Remarks: Remarks,
        Outcome: outcome,
        Collaboration_Developed: Collaborated_developed,
        Name_of_Collaborating_org: Organization_involved,
        Sponcerned: Sponcerned,
        Name_of_Sponcoring_agency: Name_of_Sponcering,
        Grant_Value: Grant,
        Role: Role,
        Venue: Venue_of_event,
        Outcome_Material: outcomeMaterial,
      });

      setOpen(false);
      resetForm();
      setshowSuccessSuccessModal(true);
    } catch (error) {
      console.error(error);
      alert("Something went wrong error occured");
    }
  };

  return (
    <>
      <Modal
        id={"CivilEventsModal"}
        consumer={children}
        isOpen={isOpen}
        setOpen={setOpen}
      >
        <div className="">
          {stage === 1 && (
            <>
              <div className=" flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 ">
                <h1 className="text-blue-900 font-serif font-bold text-xl py-2 border-black">
                  Details of Event
                </h1>
                <div>
                  <InputField
                    label={"Title of Event"}
                    value={Title_of_Event}
                    setVal={setTitle_of_Event}
                    required
                  />
                  {errors.Title_of_Event && (
                    <span className="text-red-500">
                      {errors.Title_of_Event}
                    </span>
                  )}
                </div>
                <div>
                  <Dropdown
                    label={"Role"}
                    dropdownOptions={["Organizor ", "Participant"]}
                    value={Role}
                    handleOptionChange={handleRoleChange}
                    required
                  />
                  {errors.Role && (
                    <span className="text-red-500">{errors.Role}</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
                  <div>
                    <InputField
                      label={"Date of Event"}
                      value={Date_of_event}
                      setVal={setDate_of_event}
                      type="date"
                      required
                    />
                    {errors.Date_of_event && (
                      <span className="text-red-500">
                        {errors.Date_of_event}
                      </span>
                    )}
                  </div>
                  <div>
                    <InputField
                      label={"Venue of Event"}
                      value={Venue_of_event}
                      setVal={setVenue_of_event}
                    />
                    {errors.Venue_of_event && (
                      <span className="text-red-500">
                        {errors.Venue_of_event}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <InputField
                    label={"Component of community involved Or Addresed  "}
                    value={Community_Addressed}
                    setVal={setCommunity_Addressed}
                  />
                  {errors.Community_Addressed && (
                    <span className="text-red-500">
                      {errors.Community_Addressed}
                    </span>
                  )}
                </div>
                <RadioButtonGroup
                  label={"Sponcerd Event"}
                  options={["Yes", "No"]}
                  value={Sponcerned}
                  handleChange={handleSponcernedChange}
                />

                {Sponcerned === "Yes" && (
                  <>
                    <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
                      <div>
                        <InputField
                          label={"Sponcering Agency"}
                          value={Name_of_Sponcering}
                          setVal={setName_of_Sponcering}
                        />
                        {errors.Name_of_Sponcering && (
                          <span className="text-red-500">
                            {errors.Name_of_Sponcering}
                          </span>
                        )}
                      </div>
                      <div>
                        <InputField
                          label={"Grant Value"}
                          value={Grant}
                          setVal={setGrant}
                        />
                        {errors.Grant && (
                          <span className="text-red-500">{errors.Grant}</span>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <div className="flex flex-row ml-auto ">
                  <button
                    onClick={nextStage}
                    className="bg-blue-900 text-white px-4 py-2  rounded-md"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
          {stage === 2 && (
            <>
              <div className="grid gap-y-8 grid-col bg-white shadow-lg rounded-md px-6 py-2 mt-4 ">
                <div>
                  <h1 className="text-blue-900 font-serif font-bold text-xl  py-2 m-2 border-black">
                    Additional Details
                  </h1>
                </div>
                <div>
                  <InputField
                    label={"Collaborated Dveloped"}
                    value={Collaborated_developed}
                    setVal={setCollaborated_developed}
                  />
                  {errors.Collaborated_developed && (
                    <span className="text-red-500">
                      {errors.Collaboration_Developed}
                    </span>
                  )}
                </div>
                <label
                  htmlFor="textarea"
                  className="text-base font-medium text-black"
                >
                  Outcome:
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
                  rows="4"
                  cols="50"
                  id="Textarea"
                  value={outcome}
                  onChange={handleoutcomeChange}
                />
                {errors.outcome && (
                  <span className="text-red-500">{errors.outcome}</span>
                )}
                <div>
                  <InputField
                    label={"Name of Organization/Soceity Involved"}
                    value={Organization_involved}
                    setVal={setOrganization_involved}
                    required
                  />
                  {errors.Organization_involved && (
                    <span className="text-red-500">
                      {errors.Organization_involved}
                    </span>
                  )}
                </div>
                <div>
                  <InputField
                    label={
                      "Dissemination/ outcome Material/ Literature (Brochure, report, web link, etc.)"
                    }
                    value={outcomeMaterial}
                    setVal={setoutcomeMaterial}
                    required
                  />
                  {errors.outcomeMaterial && (
                    <span className="text-red-500">
                      {errors.outcomeMaterial}
                    </span>
                  )}
                </div>{" "}
                <div className="grid grid-cols-2 gap-y-8 gap-x-16">
                  <button
                    onClick={prevStage}
                    className="bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-1/4"
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextStage}
                    className="ml-auto bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-1/4"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}

          {stage === 3 && (
            <>
              <div className="grid gap-y-8 grid-col bg-white shadow-lg rounded-md px-6 py-2 w-[60rem] mt-4 max-h-full">
                <h1 className="text-blue-900 font-serif font-bold text-xl py-2 m-2 border-black">
                  Additional Details
                </h1>
                <label
                  htmlFor="textarea"
                  className="text-base font-medium text-black"
                >
                  Remarks:
                </label>
                <textarea
                  className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
                  rows="4"
                  cols="50"
                  id="Textarea"
                  value={Remarks}
                  onChange={handleRemarksChange}
                />
                <div className="grid grid-cols-2 gap-x-3   text-black">
                      <label className="text-base font-medium">
                      Brief Event Report/Bonchures  <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="outline outline-1 focus:outline-2 focus:outline-blue-900 outline-black px-2 rounded-sm"
                        type="file"
                        defaultValue={Event_detail}
                        onChange={(e) => {
                          console.log("File selected:", e.target.files[0]);
                          setEvent_detail(e.target.files[0]);
                        }}
                        required
                      />
                      {errors.Event_detail && (
                        <span className="text-red-500">
                          {errors.Event_detail}
                        </span>
                      )}
                    </div>
                <div className="grid grid-cols-2 gap-y-8 gap-x-16">
                  <button
                    onClick={prevStage}
                    className="bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-1/4 "
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="ml-auto bg-blue-900 text-white px-4 py-2 rounded-md mt-4 "
                  >
                    Save
                  </button>
                </div>
              </div>
            </>
          )}
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
