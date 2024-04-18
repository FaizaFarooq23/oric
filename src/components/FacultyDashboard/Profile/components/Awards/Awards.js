import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Modal, { useModalState } from "react-simple-modal-provider";
import InputField from "../Common/InputField";
import RadioButtonGroup from "../Common/Radiobutton";
import axios from "axios";
export default function AwardsModal({ children }) {
  const [isOpen, setOpen] = useModalState();
  const [title, setTitle] = useState("");
  const [organization_name, setorganization_name] = useState("");
  const [Relevant_Certificate, setRelevant_Certificate] = useState("yes");
  const [amount, setamount] = useState("");
  const [details, setdetails] = useState("");
  const [name_of_winner, setname_of_winner] = useState("");
  const [Designation_of_winner, setDesignation_of_winner] = useState("");
  const [department_of_winner, setdepartment_of_winner] = useState("");
  const [Remarks, setRemarks] = useState("");
  const [copy_of_Mou, setcopy_of_Mou] = useState("");
  const [stage, setStage] = useState(1);
  const { data: session } = useSession();
  const handleRelevantCertificateChange = (option) => {
    setRelevant_Certificate(option);
  };

  const handledetails = (e) => {
    setdetails(e.target.value);
  };
  const handleRemarks = (option) => {
    setRemarks(option.target.value);
  };
  useEffect(() => {
    console.log(session);
  }, [session]);
  const handleSubmit = async () => {
    try {
      if (title==="") {
        alert("Please fill all the fields");
        return;
      }
      if (session.user.username === "") {
        alert("Please login to continue");
        signOut();
        return;
      }
      const res = await axios.post(`/api/faculty/Awards/insertAwards`, {
        username: session.user.username,
        Title_of_award: title,
        Name_of_organization: organization_name,
        Relevant_Award: Relevant_Certificate,
        Breif_Details: details,
        Amount_of_prize: amount,
        Name_of_winner: name_of_winner,
        Designation_of_winner: Designation_of_winner,
        Department_of_winer: department_of_winner,
        Remarks: Remarks,
      });

      setOpen(false);
      setShowModal(true);

      console.log(res);
    } catch (error) {
      console.error("Error inserting information:", error);
    }
  };
  // Define a function to handle moving to the next stage
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
  return (
    <Modal
      id={"AwardsModal"}
      consumer={children}
      isOpen={isOpen}
      setOpen={setOpen}
    >
      <div className="">
        {stage === 1 && (
          <>
            <div className=" flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 ">
              <div>
                <h1 className="text-blue-900 font-serif font-bold text-xl py-2 m-2 border-black">
                  Enter Infromation about National or International Honors or
                  Awards Won
                </h1>
              </div>
              <div className=" grid grid-cols-2 gap-y-8 gap-x-20 ">
                <InputField
                  label={"Title of Award"}
                  value={title}
                  setVal={setTitle}
                />

                <InputField
                  label={"Organization Name"}
                  value={organization_name}
                  setVal={setorganization_name}
                />

                <InputField
                  label={"Amount of Prize Money"}
                  value={amount}
                  setVal={setamount}
                />
              </div>
              <RadioButtonGroup
                label={"Any Relevant Certificate or award Received"}
                options={["Yes", "No"]}
                value={Relevant_Certificate}
                handleChange={handleRelevantCertificateChange}
              />
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
            <div className=" flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 ">
              <div>
                <h1 className="text-blue-900 font-serif font-bold text-xl py-2 m-2 border-black">
                  Enter Infromation about Winner
                </h1>
              </div>
              <div className=" grid grid-cols-2 gap-y-8 gap-x-20 ">
                <InputField
                  label={"Name"}
                  value={name_of_winner}
                  setVal={setname_of_winner}
                />

                <InputField
                  label={"Department"}
                  value={department_of_winner}
                  setVal={setdepartment_of_winner}
                />

                <InputField
                  label={"Designation"}
                  value={Designation_of_winner}
                  setVal={setDesignation_of_winner}
                />
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
            </div>
          </>
        )}
        {stage === 3 && (
          <>
            <div className="grid gap-y-8 grid-col bg-white shadow-lg rounded-md px-6 py-2 mt-4 ">
              <div>
                <h1 className="text-blue-900 font-serif font-bold text-xl  py-2 m-2 border-black">
                  Additional Details
                </h1>
              </div>
              <div className="grid grid-cols-2 w-auto gap-y-8 gap-x-16 ">
                <InputField
                  label={"Mou Copy"}
                  value={copy_of_Mou}
                  setVal={setcopy_of_Mou}
                  type={"file.pdf"}
                />
              </div>
              <label
                htmlFor="textarea"
                className="text-base font-medium text-black"
              >
                Breif Detail of Work Honoured:
              </label>
              <textarea
                className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
                rows="4"
                cols="50"
                id="Textarea"
                value={details}
                onChange={handledetails}
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

        {stage === 4 && (
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
                onChange={handleRemarks}
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
