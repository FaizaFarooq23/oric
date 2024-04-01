import React, { useState } from 'react'
import Modal, { useModalState } from 'react-simple-modal-provider';
import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/react';
import InputField from '../Common/InputField';
import Dropdown from '../Common/Dropdown';

export default function Researches({children}) {
  const [isOpen, setOpen] = useModalState();
  const {data: session} = useSession();

  const [researchTitle, setResearchTitle] = useState("");
  const [category, setCategory] = useState("Government");
  const [typeOfResearch, setTypeOfResearch] = useState("Basic");
  const [status, setStatus] = useState("Ongoing");
  const [fundedProject, setFundedProject] = useState("No");
  const [fundingAgency, setFundingAgency] = useState("No");
  const [fundingReceived, setFundingReceived] = useState("No");
  const [fundingUtilized, setFundingUtilized] = useState("No");
  const [ipDisclosure, setIpDisclosure] = useState("No");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  }

  const handleTypeOfResearchChange = (e) => {
    setTypeOfResearch(e.target.value);
  }

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  }

  const handleFundedProjectChange = (e) => {
    setFundedProject(e.target.value);
  }

  const handleFundingAgencyChange = (e) => {
    setFundingAgency(e.target.value);
  }

  const handleFundingReceivedChange = (e) => {
    setFundingReceived(e.target.value);
  }

  const handleFundingUtilizedChange = (e) => {
    setFundingUtilized(e.target.value);
  }

  const handleIpDisclosureChange = (e) => {
    setIpDisclosure(e.target.value);
  }


  const handleSubmit = async () => {
    if (researchTitle === "" || category === "" || typeOfResearch === "" || status === "" || fundedProject === "" || fundingAgency === "" || fundingReceived === "" || fundingUtilized === "" || ipDisclosure === "" || startDate === "" || endDate === "") {
      alert("Please fill all the fields");
      return;
    }
    if (session.user.username === "") {
      alert("Please login to continue");
      signOut();
      return;
    }

    try{
      const res = await axios.post(`/api/faculty/research_project/insert`, {
        username: session.user.username,
        title: researchTitle,
        category: category,
        type_of_research: typeOfResearch,
        status: status,
        funded_project: fundedProject,
        funding_agency: fundingAgency,
        funding_received: fundingReceived,
        funding_utilized: fundingUtilized,
        ip_disclosure: ipDisclosure,
        start_Date: new Date(startDate),
        end_Date: new Date(endDate),
      });

      setOpen(false);

    } catch(error){
      console.error(error);
      alert("Something went wrong");
    }


  }
  
  return (
    <Modal
    id={"ResearchProjectsModal"}
    consumer={children}
    isOpen={isOpen}
    setOpen={setOpen}
  >
    <div className=" flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 ">
    <InputField
            label={"Research Title"}
            value={researchTitle}
            setVal={setResearchTitle}
          />
          
    <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
      <Dropdown
        label={"Category"}
        dropdownOptions={["Research", "Development"]}
        value={category}
        handleOptionChange={handleCategoryChange}
      />

      <Dropdown
        label={"Type of Research"}
        dropdownOptions={["Basic", "Applied"]}
        value={typeOfResearch}
        handleOptionChange={handleTypeOfResearchChange}
      />

      <Dropdown
        label={"Status"}
        dropdownOptions={["Ongoing", "Completed"]}
        value={status}
        handleOptionChange={handleStatusChange}
      />

      <Dropdown
        label={"Funded Project"}
        dropdownOptions={["Yes", "No"]}
        value={fundedProject}
        handleOptionChange={handleFundedProjectChange}
      />

      <Dropdown
        label={"Funding Agency"}
        dropdownOptions={["Government", "Private"]}
        value={fundingAgency}
        handleOptionChange={handleFundingAgencyChange}
      />

      <Dropdown
        label={"Funding Received"}
        dropdownOptions={["Yes", "No"]}
        value={fundingReceived}
        handleOptionChange={handleFundingReceivedChange}
      />

      <Dropdown
        label={"Funding Utilized"}
        dropdownOptions={["Yes", "No"]}
        value={fundingUtilized}
        handleOptionChange={handleFundingUtilizedChange}
      />

      <Dropdown
        label={"IP Disclosure"}
        dropdownOptions={["Yes", "No"]}
        value={ipDisclosure}
        handleOptionChange={handleIpDisclosureChange}
      />

      <InputField
        label={"Start Date"}
        value={startDate}
        setVal={setStartDate}
        type={"date"}
      />

      <InputField
        label={"End Date"}
        value={endDate}
        setVal={setEndDate}
        type={"date"}
      />

    </div>
    <div className="flex items-center justify-center w-full">
      <button
        onClick={handleSubmit}
      className="bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-1/4">
        Save
      </button>
      </div>
      </div>
  </Modal>
  )
}
