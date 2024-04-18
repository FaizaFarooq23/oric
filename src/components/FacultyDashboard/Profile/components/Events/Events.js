import React, { useState } from "react";
import Modal, { useModalState } from "react-simple-modal-provider";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import InputField from "../Common/InputField";
import Dropdown from "../Common/Dropdown";
import RadioButtonGroup from "../Common/Radiobutton";
export default function CivilEventsModal({ children }) {
  const [isOpen, setOpen] = useModalState();
  const { data: session } = useSession();
  const [stage, setStage] = useState(1);
  const [Title_of_event, setTitle_of_event] = useState("");
  const [Date_of_event, setDate_of_event] = useState("");
  const [Venue_of_event, setVenue_of_event] = useState("");
  const [Community_Addressed, setCommunity_Addressed] = useState("");
  const [Name_of_Sponcering, setName_of_Sponcering] = useState("");
  const [Sponcerned, setSponcerned] = useState("No");
  const [Grant, setGrant] = useState("");
  const [Role, setRole] = useState("");
  const [outcome, setoutcome] = useState("");
  const [outcomeMaterial, setoutcomeMaterial] = useState("");
  const [Remarks, setRemarks] = useState("");
  const [Event_detail, setEvent_detail] = useState("");
  const [Organization_involved, setOrganization_involved] = useState("");
  const [Collaborated_developed, setCollaborated_developed] = useState("");

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
  const nextStage = () => {
    setStage(stage + 1);
  };

  // Define a function to handle moving to the previous stage
  const prevStage = () => {
    setStage(stage - 1);
    if (stage === 0) {
      setStage(1);
    }
  };

  const handleSubmit = async () => {
    // if (
    
    // ) {
    //   alert("Please fill all the fields");
    //   return;
    // }
    if (session.user.username === "") {
      alert("Please login to continue");
      signOut();
      return;
    }

    try{
      const res = await axios.post(`/api/faculty/Events/insert`, {
        username: session.user.username,
          Title_of_Event :Title_of_event ,
          Date_of_Event : new Date(Date_of_event) ,
          Community : Community_Addressed,
          Remarks : Remarks ,
          Outcome : outcome ,
          Collaboration_Developed :Collaborated_developed ,
          Name_of_Collaborating_org :Organization_involved ,
          Sponcerned : Sponcerned,
          Name_of_Sponcoring_agency :Name_of_Sponcering ,
          Grant_Value :Grant,
          Role : Role,
          Venue : Venue_of_event,
          Outcome_Material :outcomeMaterial ,
          event_detail : Event_detail,
      });

      setOpen(false);

    } catch(error){
      console.error(error);
      alert("Something went wrong error occured");
    }
  };

  return (
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
              <InputField
                label={"Title of Event"}
                value={Title_of_event}
                setVal={setTitle_of_event}
              />
              <Dropdown
                label={"Role"}
                dropdownOptions={["Organizor ", "Participant"]}
                value={Role}
                handleOptionChange={handleRoleChange}
                required
              />
              <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
                <InputField
                  label={"Date of Event"}
                  value={Date_of_event}
                  setVal={setDate_of_event}
                  type="date"
                />
                <InputField
                  label={"Venue of Event"}
                  value={Venue_of_event}
                  setVal={setVenue_of_event}
                />
              </div>
              <InputField
                label={"Component of community involved Or Addresed  "}
                value={Community_Addressed}
                setVal={setCommunity_Addressed}
              />
              
              <RadioButtonGroup
                label={"Sponcerd Event"}
                options={["Yes", "No"]}
                value={Sponcerned}
                handleChange={handleSponcernedChange}
              />
        
              {Sponcerned === "Yes" && (
                <>
                  <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
                    <InputField
                      label={"Sponcering Agency"}
                      value={Name_of_Sponcering}
                      setVal={setName_of_Sponcering}
                    />
                    <InputField
                      label={"Grant Value"}
                      value={Grant}
                      setVal={setGrant}
                    />
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
              <InputField
                label={"Collaborated Dveloped"}
                value={Collaborated_developed}
                setVal={setCollaborated_developed}
              />
              <label
                htmlFor="textarea"
                className="text-base font-medium text-black"
              >
                Outcome:
              </label>
              <textarea
                className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
                rows="4"
                cols="50"
                id="Textarea"
                value={outcome}
                onChange={handleoutcomeChange}
              />
                 <InputField
                label={"Name of Organization/Soceity Involved"}
                value={Organization_involved}
                setVal={setOrganization_involved}
              />
             
                 <InputField
                label={"Dissemination/ outcome Material/ Literature (Brochure, report, web link, etc.)"}
                value={outcomeMaterial}
                setVal={setoutcomeMaterial}
              />
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
<InputField
                      label={"Event Details"}
                      value={Event_detail}
                      setVal={setEvent_detail}
                      type={"file"}
                    />
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
  );
}
