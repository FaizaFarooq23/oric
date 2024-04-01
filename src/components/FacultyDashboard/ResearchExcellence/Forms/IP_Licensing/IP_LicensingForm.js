import Dropdown from "@/components/FacultyDashboard/Profile/components/Common/Dropdown";
import InputField from "@/components/FacultyDashboard/Profile/components/Common/InputField";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import Modal, { useModalState } from "react-simple-modal-provider";
function IPlicensingForm({ children }) {
  const [isOpen, setOpen] = useModalState();
  const [Name_of_leadInventor, setName_of_leadInventor] = useState("");
  const [Designation_of_leadInventor, setDesignation_of_leadInventor] =
    useState("");
  const [Department_of_leadInventor, setDepartment_of_leadInventor] =
    useState("");
  const [TitleofInvention, setTitleofInvention] = useState("");
  const [category, setcategory] = useState("Product");
  const [Status_of_Negotiations, setStatus_of_Negotiations] = useState("");
  const [Nationality, setNationality] = useState("National");
  const [Development_Status, setDevelopment_status] = useState("Idea");
  const [Date_of_Agreement, setDate_of_Agreement] = useState("");
  const [Keyaspects, setKeyaspects] = useState("");
  const [Start_Date, setStart_Date] = useState("");
  const [End_Date, setEnd_Date] = useState("");
  const [Status_of_Licensee, setStatus_of_Licensee] = useState(
    "Negotiations Initiated"
  );
  const [Feild_of_use, setFeild_of_use] = useState("");
  const [Licensee_Name, setLicensee_Name] = useState("");
  const [Licensee_Organization, setLicensee_Organization] = useState("");
  const [Licensee_Type, setLicensee_Type] = useState("Exclusive");
  const [Negotiationcopy, setNegotiationcopy] = useState("");
  const [AgreementCopy, setAgreementCopy] = useState("");
  const [stage, setStage] = useState(1);
 
  const handlecategoryChange = (e) => {
    setcategory(e.target.value);
  };
  const handleStatus_of_NegotiationsChange = (e) => {
    setStatus_of_Negotiations(e.target.value);
  };
  const handleStatus_of_Licensee = (e) => {
    setStatus_of_Licensee(e.target.value);
  };
  const handleLicenseetype = (e) => {
    setLicensee_Type(e.target.value);
  };
  const handleDevelopment_Status = (e) => {
    setDevelopment_status(e.target.value);
  };
  const handleKeyaspectschange = (e) => {
    setKeyaspects(e.target.value);
  };

  const handleNationalitychange = (e) => {
    setNationality(e.target.value);
  };
  const handleDetail_of_patentdeptchange = (e) => {
    setDetail_of_patentdept(e.target.value);
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
  const { data: session } = useSession();
  useEffect(() => {
    console.log(session);
  }, [session]);

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (TitleofInvention === "" ) {
        alert("Please fill all the required fields");
        return;
      }

      // Check if the user is authenticated
      if (!session || !session.user || !session.user.username) {
        alert("Please log in to continue");
        signOut();
        return;
      }

      // Construct the data object based on the conditions
      const data = {
        username: session.user.username,
        Title: TitleofInvention,
        Category: category,
        Status_of_Negotiations: Status_of_Negotiations,
        Date_of_Agreement: Date_of_Agreement
          ? new Date(Date_of_Agreement)
          : null,
        Name_of_leadInventor: Name_of_leadInventor,
        Designation_of_leadInventor: Designation_of_leadInventor,
        Department_of_leadInventor: Department_of_leadInventor,
        Feild_of_use: Feild_of_use,
        Licensee_Name: Licensee_Name,
        Licensee_Organization: Licensee_Organization,
        Development_Status: Development_Status,
        Negotiationcopy: Negotiationcopy,
        AgreementCopy: AgreementCopy,
        Nationality: Nationality,
        Licensee_Type: Licensee_Type,
        Status_of_Licensee:Status_of_Licensee,
        start_Date:new Date(Start_Date),
        end_Date:new Date(End_Date),
        KeyAspects:Keyaspects
      };

      // Make the POST request to save the data
      const res = await axios.post(`/api/IPLicensing/insert_IPLicensing`, data);

      setOpen(false);
      console.log(res);
    } catch (error) {
      console.error("Error inserting information:", error);
    }
    alert("You clicked ");
  };

  return (
  <Modal
  id={"IPLicensingModal"}
  consumer={children}
  isOpen={isOpen}
  setOpen={setOpen}
  >
      <div>
        {stage === 1 && (
          <div className=" flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 ">
            <div>
              <h1 className="text-black font-serif font-bold text-xl py-2 m-2 border-black">
                IP Licensing Information
              </h1>
            </div>
            <InputField
              label={"Title of Innovation"}
              value={TitleofInvention}
              setVal={setTitleofInvention}
            />

            <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
              <Dropdown
                label={"Status of Lisencee"}
                dropdownOptions={[
                  "Negotiations Initiated ",
                  "Signed",
                ]}
                value={Status_of_Licensee}
                handleOptionChange={handleStatus_of_Licensee}
              />
              {Status_of_Licensee === "Signed" ? (
                <>
                <Dropdown
                  label={"Type of Lisencee"}
                  dropdownOptions={["Exclusive", "Non-Exclusive"]}
                  value={Licensee_Type}
                  handleOptionChange={handleLicenseetype}
                />
                <InputField
                label={"Date of Agreement"}
                value={Date_of_Agreement}
                setVal={setDate_of_Agreement}
                type={"date"}
              />
              </>
              ):(
                <InputField
                label={"Status of Negotiation"}
                value={Status_of_Negotiations}
                setVal={setStatus_of_Negotiations}
                />
              )}


              <Dropdown
                label={"Nationality"}
                dropdownOptions={["National", "International"]}
                value={Nationality}
                handleOptionChange={handleNationalitychange}
              />
              <Dropdown
                label={"Category of IP"}
                dropdownOptions={["Product", "Process", "Technology", "Others"]}
                value={category}
                handleOptionChange={handlecategoryChange}
              />
              <Dropdown
                label={"Development Status"}
                dropdownOptions={[
                  "Idea",
                  "Prototype ",
                  "Validation",
                  "Production",
                ]}
                value={Development_Status}
                handleOptionChange={handleDevelopment_Status}
              />
            </div>
            <div className="flex flex-row   ml-auto ">
              <button
                onClick={nextStage}
                className="bg-blue-900 text-white px-4 py-2  w-40 rounded-md mt-4 w-1/4"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {stage === 2 && (
          <div className=" flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 ">
            <div>
              <h1 className="text-black font-serif font-bold text-xl py-2 m-2 border-black">
                Details of Lead Inventor
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
              <InputField
                label={"Name of Lead Inventor"}
                value={Name_of_leadInventor}
                setVal={setName_of_leadInventor}
              />

              <InputField
                label={"Department of Lead Inventor"}
                value={Department_of_leadInventor}
                setVal={setDepartment_of_leadInventor}
              />

              <InputField
                label={"Designation of Lead Inventor"}
                value={Designation_of_leadInventor}
                setVal={setDesignation_of_leadInventor}
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
        )}
        {stage === 3 && (
          <>
            <div className="grid gap-y-8 grid-col bg-white shadow-lg rounded-md px-6 py-2 mt-4 ">
              <div>
                <h1 className="text-black font-serif font-bold text-xl  py-2 m-2 border-black">
                  Details of Licensee
                </h1>
              </div>
              <div className="grid grid-cols-2 w-auto gap-y-8 gap-x-16 ">
                <InputField
                  label={"Name of Licensee"}
                  value={Licensee_Name}
                  setVal={setLicensee_Name}
                />
                <InputField
                  label={"Organization"}
                  value={Licensee_Organization}
                  setVal={setLicensee_Organization}
                />
          
              </div>
              <div>
                <h1 className="text-black font-serif font-bold text-xl  py-2 m-2 border-black">
                  Duration of Agreement
                </h1>
              </div>
              <div className="grid grid-cols-2 w-auto gap-y-8 gap-x-16 ">

                  <InputField
                  label={"Start Date"}
                  value={Start_Date}
                  setVal={setStart_Date}
                  type={"date"}
                />
                   <InputField
                  label={"End Date"}
                  value={End_Date}
                  setVal={setEnd_Date}
                  type={"date"}
                />
              </div>

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
            <div className="flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 ml-auto mr-auto w-5/6 ">
              <h1 className="text-blue-900 font-serif font-bold text-xl py-2 m-2 border-black">
                Additional Details
              </h1>
              <div className="grid grid-cols-2 gap-y-8 gap-x-16">
                <InputField
                  label={"Negotiation Copy"}
                  value={Negotiationcopy}
                  setVal={setNegotiationcopy}
                  type={"file"}
                />
                <InputField
                  label={"Agreement Copy"}
                  value={AgreementCopy}
                  setVal={setAgreementCopy}
                  type={"file"}
                />
              </div>
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
        {stage === 5 && (
          <>
            <div className="grid gap-y-8 grid-col bg-white shadow-lg rounded-md px-6 py-2 w-[60rem] mt-4 max-h-full">
              <h1 className="text-blue-900 font-serif font-bold text-xl py-2 m-2 border-black">
                Additional Details
              </h1>
              <div className="grid grid-cols-2 gap-y-8 gap-x-16">
                <InputField
                  label={"Feild of Use"}
                  value={Feild_of_use}
                  setVal={setFeild_of_use}
                />
              </div>
              <label
                htmlFor="textarea"
                className="text-base font-medium text-black"
              >
                Write Key Aspects
              </label>
              <textarea
                className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
                rows="3"
                cols="50"
                id="Textarea"
                value={Keyaspects}
                onChange={handleKeyaspectschange}
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

export default IPlicensingForm;
