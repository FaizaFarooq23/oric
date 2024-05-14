import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { FaTimes, } from "react-icons/fa";
import { FaPencil, FaCheck } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import Researchprojectdata from "./Researchprojectdata";
import Dropdown from "@/components/FacultyDashboard/Profile/components/Common/Dropdown";
import InputField from "@/components/FacultyDashboard/Profile/components/Common/InputField";
import SuccessModal from "../../components/UI/SuccessMessage";
export default function Researchprojectfeilds({ data, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editingproject, setEditingproject] = useState(false);
  const [project_id, setProjectId] = useState(null);
  const [Status_of_proposal, setStatus_of_proposal] = useState("Submitted");
  const [DateofApproval, setDateofApproval] = useState("");
  const [DateofCompletion, setDateofCompletion] = useState("");
  const [ORIC_overhead, setORIC_overhead] = useState("");
  const [fundingApproved, setFundingApproved] = useState("");
  const [fundingRealesed, setFundingRealesed] = useState("");
  const [fundingUtilized, setFundingUtilized] = useState("");
  const [fundingagency, setfundingagency] = useState("");
  const [Status_of_project, setStatus_of_project] = useState("Ongoing");
  const [delivery, setdelivery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control SuccessModal visibility
  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleValueClick = () => {
    setEditing(true);
    // Activate editing mode
  };
  const HandleProjectChangeValue = () => {
    setEditingproject(true);
  };
  const handleStatus_of_proposalChange = (e) => {
    setStatus_of_proposal(e.target.value);
  };
  const handleStatus_of_projectChange = (e) => {
    setStatus_of_project(e.target.value);
  };
  const handledeliverychange = (e) => {
    setdelivery(e.target.value);
  };
  useEffect(() => {
    if (data) {
      setProjectId(data.project_id);
      setStatus_of_proposal(data.Status_of_proposal);
      setStatus_of_proposal(data.Status_of_project);
    }
  }, [data]);
  const resetinfofeilds = () => {
    setStatus_of_proposal("Submitted");
    setStatus_of_project("Ongoing");
    setORIC_overhead("");
    setDateofApproval("");
    setFundingApproved("");
    setFundingRealesed("");
    setFundingUtilized("");
    setfundingagency("");
    setDateofCompletion("");
  };

  const resetprojectfeilds = () => {
    setStatus_of_project("Ongoing");
    setdelivery("");
    setFundingRealesed("");
    setFundingUtilized("");
    setfundingagency("");
    setDateofCompletion("");
  };
  const updateinfo = async () => {
    if (project_id) {
      try {
        const res = await axios.post(
          `/api/Research_projects/update_research_project?projectId=${project_id}`,
          {
            Status_of_proposal: Status_of_proposal,
            Status_of_project: Status_of_project,
            ORIC_Overhead: ORIC_overhead,
            Date_of_Approval: new Date(DateofApproval),
            funding_approved: fundingApproved,
            funding_realesed: fundingRealesed,
            fundingUtilized: fundingUtilized,
            funding_agency: fundingagency,
            Date_of_Completion: new Date(DateofCompletion),
          }
        );
        console.log(res);
        setEditing(false);
        resetinfofeilds();
        setEditingproject(false);
        setShowSuccessModal(true);
      } catch (error) {
        console.error("Error updating information:", error);
      }
    }
  };

  const updateprojectinfo = async () => {
    if (project_id) {
      try {
        const res = await axios.post(
          `/api/Research_projects/update_research_project?projectId=${project_id}`,
          {
            Status_of_project: Status_of_project,
            funding_realesed: fundingRealesed,
            fundingUtilized: fundingUtilized,
            funding_agency: fundingagency,
            Date_of_Completion: new Date(DateofCompletion),
            delivery: delivery,
          }
        );
        console.log(res);
        setShowSuccessModal(true);
        resetprojectfeilds();
        setEditingproject(false);
      } catch (error) {
        console.error("Error updating information:", error);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col bg-white shadow-lg rounded-md  m-4 ">
      <div className="flex justify-end items-center mr-6 mt-4">
        <button onClick={() => onDelete(data.project_id)}>
          <RiDeleteBin6Line className="text-red-600 cursor-pointer" />
        </button>
      </div>
      <div className={`flex  flex-row  justify-between px-10 py-8  `}>
        <div className={`flex flex-col w-52  gap-y-4 m-3  gap-x-8`}>
          <div className=" flex items-start justify-start ">
           
            <span className="text-gray-500  font-medium">Title</span>
          </div>
          <div className="flex items-end justify-start ">
            <span className="text-black ">{data.title}</span>
          </div>
        </div>
        <div className={`flex flex-col w-48 gap-y-4 m-3 gap-x-8`}>
          <div className=" flex items-start justify-start w-40">
           
            <span className="text-gray-500  font-medium">Thematic Area</span>
          </div>
          <div className="flex items-end justify-start ">
            <span className="text-black ">{data.Thematic_Area}</span>
          </div>
        </div>
        <div className={`flex flex-col w-48 gap-y-4 m-3 gap-x-8 `}>
          <div className=" flex items-start justify-start">
            <span className="">
              {editing ? (
                <Modal
                  isOpen={editing}
                  className={`flex flex-col my-10 gap-y-8 w-4/5 max-h-screen overflow-y-scroll  mx-auto  bg-white shadow-lg rounded-md px-10 py-8`}
                >
                  <div className="flex gap-y-8 flex-col  px-10 py-8">
                    <div className="flex flex-row justify-between py-2 m-2 gap-x-10 ">
                      <h1 className="text-blue-900 font-serif font-bold text-xl  border-black">
                        Update Information
                      </h1>
                      <div className="flex justify-end items-end gap-x-6">
                        <span>
                          <FaCheck
                            className="text-base text-green-500  h-4 w-4 cursor-pointer"
                            onClick={updateinfo}
                          />
                        </span>
                        <FaTimes
                          className="text-red-500 text-xl  cursor-pointer"
                          onClick={() => {
                            setEditing(false);
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-row ">
                      <div className="grid grid-cols-2 gap-x-16 gap-y-10 ">
                        <Dropdown
                          label="Status of Proposal :"
                          dropdownOptions={["Submitted", "Approved"]}
                          value={Status_of_proposal}
                          handleOptionChange={handleStatus_of_proposalChange}
                        />

                        {data.type_of_research === "Solo Project" &&
                          data.category === "HEC" &&
                          Status_of_proposal === "Approved" && (
                            <>
                              <InputField
                                label={"ORIC Overhead "}
                                value={ORIC_overhead}
                                setVal={setORIC_overhead}
                                type={"text"}
                                required
                              />
                            </>
                          )}
                        {Status_of_proposal === "Approved" && (
                          <>
                            <InputField
                              label={"Date of Approval"}
                              value={DateofApproval}
                              setVal={setDateofApproval}
                              type={"date"}
                              required
                            />

                            <Dropdown
                              label={"Status of project"}
                              dropdownOptions={[
                                "Ongoing",
                                "Delayed",
                                "Completed",
                              ]}
                              value={Status_of_project}
                              handleOptionChange={handleStatus_of_projectChange}
                              required
                            />
                            <InputField
                              label={"Total Funding Approved(PKR)"}
                              value={fundingApproved}
                              setVal={setFundingApproved}
                              required
                            />
                          </>
                        )}

                        {Status_of_project === "Completed" && (
                          <>
                            <InputField
                              label={"Total Funding Utilized(PKR)"}
                              value={fundingUtilized}
                              setVal={setFundingUtilized}
                              required
                            />
                            <InputField
                              label={"Total Funding Realesed(PKR)"}
                              value={fundingRealesed}
                              setVal={setFundingRealesed}
                              required
                            />
                            <InputField
                              label={"Date of Completion"}
                              value={DateofCompletion}
                              setVal={setDateofCompletion}
                              type={"date"}
                              required
                            />
                          </>
                        )}
                        {data.typeofresearch !== "Contract Research" &&
                          Status_of_project === "Completed" && (
                            <div>
                              <InputField
                                label={"Funding Agency/Body"}
                                value={fundingagency}
                                setVal={setfundingagency}
                                required
                              />
                            </div>
                          )}
                      </div>
                    </div>
                    {Status_of_project === "Completed" && (
                      <>
                        <label
                          htmlFor="textarea"
                          className="text-base font-medium text-black"
                        >
                          Write key project deliverables
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
                          rows="5"
                          cols="50"
                          id="Textarea"
                          value={delivery}
                          required
                          onChange={handledeliverychange}
                        />
                      </>
                    )}
                  </div>
                </Modal>
              ) : (
                <>
                  <div className="flex ">
                    <span className="text-gray-500 font-medium">
                      Status of Proposal
                    </span>
                    {!editing && data.Status_of_proposal !== "Approved" && (
                      <FaPencil
                        className="text-base text-blue-900 h-4 w-4 cursor-pointer"
                        onClick={handleValueClick}
                      />
                    )}
                  </div>
                </>
              )}
              {editing && (
                <FaCheck
                  className="text-base text-green-500 ml-2 h-4 w-4 cursor-pointer"
                  onClick={updateinfo}
                />
              )}
            </span>
            {showSuccessModal && (
              <SuccessModal
                isOpen={showSuccessModal}
                p={`Your Data Has Been Updated`}
                onClose={() => {
                  setShowSuccessModal(false);
                }}
              />
            )}
          </div>
          <div className="flex justify-start ">
            <span className="text-black ">{data.Status_of_proposal} </span>
          </div>
        </div>
        <div className={`flex flex-col w-48 gap-y-4 m-3   gap-x-8`}>
          <div className=" flex items-start justify-start w-48">
           
            <span className="text-gray-500  font-medium">
              Name of Research Grant
            </span>
          </div>
          <div className="flex items-end justify-start ">
            <span className="text-black ">{data.Name_of_Research_Grant}</span>
          </div>
        </div>

        <div className={`flex flex-col gap-y-4  w-48 m-3 gap-x-8`}>
          <div className=" flex items-start justify-start">
           
            <span className="text-gray-500  font-medium">Type of Research</span>
          </div>

          <div className="flex justify-start ">
            <span className="text-black ">{data.type_of_research}</span>
          </div>
        </div>
        <div className={`flex flex-col w-48 gap-y-4 m-3 gap-x-8 `}>
          <div className=" flex items-start justify-start">
            <span className="">
              {editingproject ? (
                <Modal
                  isOpen={editingproject}
                  onRequestClose={() => setEditingproject(false)}
                  contentLabel="Edit Project Status"
                  className={`flex my-10 w-4/5  mx-auto   bg-white shadow-lg rounded-md p-4`}
                >
                  <div className="flex px-10 py-4  flex-col">
                    <div className="flex flex-row justify-between py-2 m-2 gap-x-10 ">
                      <h1 className="text-blue-900 font-serif font-bold text-xl  border-black">
                        Update Information
                      </h1>
                      <div className="flex justify-end items-end gap-x-6">
                        <span>
                          <FaCheck
                            className="text-base text-green-500  h-4 w-4 cursor-pointer"
                            onClick={updateprojectinfo}
                          />
                        </span>
                        <FaTimes
                          className="text-red-500 text-xl  cursor-pointer"
                          onClick={() => {
                            setEditingproject(false);
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex ">
                      <div className="grid grid-cols-2 gap-x-16 gap-y-10 ">
                        <Dropdown
                          label={"Status of project"}
                          dropdownOptions={["Ongoing", "Delayed", "Completed"]}
                          value={data.Status_of_project}
                          handleOptionChange={handleStatus_of_projectChange}
                          required
                        />
                        {Status_of_project === "Completed" && (
                          <>
                            <InputField
                              label={"Total Funding Utilized(PKR)"}
                              value={fundingUtilized}
                              setVal={setFundingUtilized}
                              required
                            />
                            <InputField
                              label={"Total Funding Realesed(PKR)"}
                              value={fundingRealesed}
                              setVal={setFundingRealesed}
                              required
                            />
                            <InputField
                              label={"Date of Completion"}
                              value={DateofCompletion}
                              setVal={setDateofCompletion}
                              type={"date"}
                              required
                            />
                          </>
                        )}
                        {data.typeofresearch !== "Contract Research" &&
                          Status_of_project === "Completed" && (
                            <div>
                              <InputField
                                label={"Funding Agency/Body"}
                                value={fundingagency}
                                setVal={setfundingagency}
                                required
                              />
                            </div>
                          )}
                      </div>
                    </div>
                    {Status_of_project === "Completed" && (
                      <>
                        <label
                          htmlFor="textarea"
                          className="text-base mt-2 font-medium text-black"
                        >
                          Write key project deliverables
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
                          rows="5"
                          cols="50"
                          id="Textarea"
                          value={delivery}
                          required
                          onChange={handledeliverychange}
                        />
                      </>
                    )}
                  </div>
                </Modal>
              ) : (
                <>
                  <div className="flex ">
                    <span className="text-gray-500 font-medium ">
                      Project Status
                    </span>
                    {!editingproject &&
                      data.Status_of_project !== "Completed" && (
                        <FaPencil
                          className="text-base ml-2 text-blue-900 h-4 w-4 cursor-pointer"
                          onClick={HandleProjectChangeValue}
                        />
                      )}
                  </div>
                </>
              )}
              {editingproject && (
                <FaCheck
                  className="text-base text-green-500 ml-2 h-4 w-4 cursor-pointer"
                  onClick={updateprojectinfo}
                />
              )}
            </span>
            {showSuccessModal && (
              <SuccessModal
                isOpen={showSuccessModal}
                p={`Your Data Has Been Updated`}
                onClose={() => {
                  setShowSuccessModal(false);
                }}
              />
            )}
          </div>
          <div className="flex justify-start ">
            <span className="text-black ">{data.Status_of_project} </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end mr-6">
        <button onClick={openModal}>Click to View Full Details</button>
      </div>
      <Researchprojectdata
        isOpen={isModalOpen}
        closeModal={closeModal}
        data={data}
      />
    </div>
  );
}
