import Dropdown from "@/components/Profile/components/Common/Dropdown";
import InputField from "@/components/Profile/components/Common/InputField";
import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Label } from "recharts";
import axios from "axios";
import Modal, { useModalState } from "react-simple-modal-provider";
import Consultancy_data from "./Consultancy_data";

// import Modal, { useModalState } from "react-simple-modal-provider";
function ConsultacyContract({children}) {
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
  const handleRemarkschange = (e) => {
    setRemarks(e.target.value);
  };
  const handledelieverychange = (e) => {
    setdelievery(e.target.value);
  };
  const handleconsultancy_services = (e) => {
    setconsultancy_services(e.target.value);
  };
useEffect(() => {
  console.log(session)
}, [session]);

  const handleSubmit = async () => {
    try {
      if (
        NameofPi === "" ||
        DateofExecution === "" ||
        Title_of_Project === "" ||
        Designation_of_Pi === "" ||
        Department_of_Pi === "" ||
        Company_Address === "" ||
        Company_Name === ""||
        Startdate===""||
        Enddate===""||
        Remarks===""||
        delievery===""||
        consultancy_services===""
      ) {
        alert("Please fill all the fields");
        return;
      }
      if (session.user.username === "") {
        alert("Please login to continue");
        signOut();
        return;
      }
      const res = await axios.post(`/api/Research_projects/insert_consultancy_contract`, {
        username:session.user.username,
        Type_of_ConsultancyServices:consultancy_services,
        Title :Title_of_Project,
        Name_of_Pi  :NameofPi,
        Designation_of_Pi :Designation_of_Pi,
        Department_of_Pi :Department_of_Pi,
        Date_of_Execution  :new Date(DateofExecution).toISOString(),
        Company_Name :Company_Name,
        Company_Address :Company_Address,
        start_Date  :new  Date(Startdate).toISOString(),
        end_Date :new  Date(Enddate).toISOString(),
        Contract_Value :Contract_value,
        ORIC_percentage :ORICpercent,
        Remarks :Remarks,
        deliverables:delievery
      });

      setOpen(false);

      //   toast.success('Data saved successfully!', {
      //     position: toast.POSITION.TOP_CENTER,
      //     autoClose: 10000,
      // });
      console.log(res);
    } catch (error) {
      console.error("Error inserting information:", error);
    }
    alert("Clicked clicked u got it gurrl");
  };

  return (
        <Modal
        id={"ConsultancyContractFormModal"}
    consumer={children}
    isOpen={isOpen}
    setOpen={setOpen}
    >
    <div className="h-screen overflow-y-auto bg-white shadow-lg rounded-md mx-auto  my-2 px-10 w-4/5  ">
    <h1 className="text-blue-900 font-serif font-bold text-xl border-l-2 py-2 m-2 border-blue-900">
              Enter Details About Consultacy Contract Executed through ORIC
            </h1>
      <div className="py-2 m-2 flex flex-col gap-y-8   ">
        <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
          <div>
           
          </div>

          <br />
          <InputField
            label={"Title of Project"}
            value={Title_of_Project}
            setVal={setTitle_of_Project}
          />
          <InputField
            label={"Name of Pi"}
            value={NameofPi}
            setVal={setNameofPi}
          />
          <InputField
            label={"Designation_of_Pi"}
            value={Designation_of_Pi}
           setVal={setDesignation_of_Pi}
           
          />
          <InputField
            label={"Department of Pi"}
            value={Department_of_Pi}
            setVal={setDepartment_of_Pi}
          />

          <InputField
            label={"Date of Execution"}
            value={DateofExecution}
            type={"date"}
            setVal={setDateofExecution}
          />

          <InputField
            label={"Name of Company"}
            value={Company_Name}
            setVal={setCompany_Name}
          />
          <InputField
            label={"Contract Value"}
            value={Contract_value}
            setVal={setContract_value}
          />
          <InputField
            label={"Company Address"}
            value={Company_Address}
            setVal={setCompany_Address}
          />
          <InputField
            label={"Start Date"}
            value={Startdate}
            type={"date"}
            setVal={setStartdate}
          />
          <InputField
            label={"End Date"}
            value={Enddate}
            type={"date"}
            setVal={setEnddate}
          />
          <InputField
            label={"ORIC percentage(if any)"}
            value={ORICpercent}
            setVal={setORICpercent}
          />
          <InputField
            label={"Contract Copy"}
            value={Contractcopy}
            setVal={setContractcopy}
            type={"file"}
          />
        </div>
        <div className="flex flex-col gap-x-10 " >
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
          Enter Key Project deliverables
        </label>
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
            className="bg-blue-900 text-white px-4 py-2 rounded-md mt-2 w-1/4"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    </Modal>
  );
}

export default ConsultacyContract;
