import Dropdown from "@/components/FacultyDashboard/Profile/components/Common/Dropdown";
import InputField from "@/components/FacultyDashboard/Profile/components/Common/InputField";
import React, { useState, useEffect } from "react";
import { Label } from "recharts";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import Modal, { useModalState } from "react-simple-modal-provider";
function IPandPatentForm({ children }) {
  const [errors, setErrors] = useState({});
  const [isOpen, setOpen] = useModalState();
  const [Name_of_leadInventor, setName_of_leadInventor] = useState("");
  const [Designation_of_leadInventor, setDesignation_of_leadInventor] =
    useState("");
  const [Department_of_leadInventor, setDepartment_of_leadInventor] =
    useState("");
  const [TitleofInvention, setTitleofInvention] = useState("");
  const [category, setcategory] = useState("Product");
  const [Status_of_patent, setStatus_of_patent] = useState("Filed");
  const [Nationality, setNationality] = useState("National");
  const [Development_Status, setDevelopment_status] = useState("Idea");
  const [Date_of_Filing, setDate_of_Filing] = useState("");
  const [Keyaspects, setKeyaspects] = useState("");
  const [delivery, setdelivery] = useState("");
  const [Date_of_disclosure, setDate_of_disclosure] = useState("");
  const [type, settype] = useState("IP disclosures");
  const [Commercial_partner, setCommercial_partner] = useState("");
  const [Name_of_patentdept, setName_of_patentdept] = useState("");
  const [Detail_of_patentdept, setDetail_of_patentdept] = useState("");
  const [Financial_support, setFinancial_support] = useState("");
  const [Previous_disclosure, setPrevious_disclosure] = useState("");
  const [DisclosureCopy, setDisclosureCopy] = useState("");
  const [Filingcopy, setFilingcopy] = useState("");
  const [GrantingCopy, setGrantingCopy] = useState("");
  const [stage, setStage] = useState(1);
  const handlecategoryChange = (e) => {
    setcategory(e.target.value);
  };
  const handleStatus_of_patentChange = (e) => {
    setStatus_of_patent(e.target.value);
  };
  const handletype = (e) => {
    settype(e.target.value);
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
    switch (stage) {
      case 1:
        if (validateFormStage1()) {
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
  const validateFormStage1 = () => {
    let valid = true;
    const newErrors = {};

    if (TitleofInvention.trim() === "") {
      newErrors.TitleofInvention = "Title of Invention is required";
      valid = false;
    } else {
      newErrors.TitleofInvention = "";
    }
    if (Date_of_disclosure.trim() === "") {
      newErrors.Date_of_disclosure = "Date of Disclosure is required";
      valid = false;
    } else {
      newErrors.Date_of_disclosure = "";
    }
    if (type !== "IP disclosures") {
      if (Date_of_Filing.trim() === "") {
        newErrors.Date_of_Filing = "Date of Filing  is required";
        valid = false;
      } else {
        newErrors.Date_of_Filing = "";
      }
    }

    setErrors(newErrors);
    return valid;
  };
  const validateFormStage2 = () => {
    let valid = true;
    const newErrors = {};

    if (Name_of_leadInventor.trim() === "") {
      newErrors.Name_of_leadInventor = "Name of Lead Inventor is required";
      valid = false;
    } else {
      newErrors.Name_of_leadInventor = "";
    }
    if (Designation_of_leadInventor.trim() === "") {
      newErrors.Designation_of_leadInventor = "Designation  is required";
      valid = false;
    } else {
      newErrors.Designation_of_leadInventor = "";
    }
    if (Department_of_leadInventor.trim() === "") {
      newErrors.Department_of_leadInventor = "Department  is required";
      valid = false;
    } else {
      newErrors.Department_of_leadInventor = "";
    }

    setErrors(newErrors);
    return valid;
  };
  const validateFormStage3 = () => {
    let valid = true;
    const newErrors = {};

    if (Name_of_patentdept.trim() === "") {
      newErrors.Name_of_patentdept = "Name of Patent Department or Authority is required";
      valid = false;
    } else {
      newErrors.Name_of_patentdept = "";
    }

    setErrors(newErrors);
    return valid;
  };
  const validateFormStage5 = () => {
    let valid = true;
    const newErrors = {};

    if (Keyaspects.trim() === "") {
      newErrors.Keyaspects = "Key Aspects is required";
      valid = false;
    } else {
      newErrors.Keyaspects = "";
    }

    setErrors(newErrors);
    return valid;
  };
  const { data: session } = useSession();
  useEffect(() => {
    console.log(session);
  }, [session]);

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!validateFormStage5) {
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
        Title_of_Invention: TitleofInvention,
        Type: type,
        Category: category,
        Status_of_patent: Status_of_patent,
        Date_of_Filing: Date_of_Filing ? new Date(Date_of_Filing) : null,
        Date_of_disclosure: Date_of_disclosure
          ? new Date(Date_of_disclosure)
          : null,
        Name_of_leadInventor: Name_of_leadInventor,
        Designation_of_leadInventor: Designation_of_leadInventor,
        Department_ofleadInventor: Department_of_leadInventor,
        KeyAspects: Keyaspects,
        delivery: delivery,
        Commercial_partner: Commercial_partner,
        Name_of_patentdept: Name_of_patentdept,
        Detail_of_patentdept: Detail_of_patentdept,
        Financial_support: Financial_support,
        Disclosure: DisclosureCopy,
        Development_Status: Development_Status,
        Filingcopy: Filingcopy,
        GrantingCopy: GrantingCopy,
        Nationality: Nationality,
        Previous_disclosure: Previous_disclosure,
      };

      // Make the POST request to save the data
      const res = await axios.post(`/api/IPandPatent/insert_ipandpatent`, data);

      setOpen(false);
      console.log(res);
    } catch (error) {
      console.error("Error inserting information:", error);
    }
    alert("You clicked ");
  };

  return (
    <Modal
      id={"IPandPatentFormModal"}
      consumer={children}
      isOpen={isOpen}
      setOpen={setOpen}
    >
      <div>
        {stage === 1 && (
          <div className=" flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 ">
            <div>
              <h1 className="text-blue-900 font-serif font-bold text-xl py-2 m-2 border-black">
                IP And Patent Information
              </h1>
            </div>
            <div>
              <InputField
                label={"Title of Invention"}
                value={TitleofInvention}
                setVal={setTitleofInvention}
                required
              />
              {errors.TitleofInvention && (
                <span className="text-red-500">{errors.TitleofInvention}</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
              <Dropdown
                label={"Type of IP"}
                dropdownOptions={[
                  "IP disclosures",
                  "Patent ",
                  "TradeMarks",
                  "Copyrights",
                  "others",
                ]}
                value={type}
                handleOptionChange={handletype}
              />
              {type !== "IP disclosures" && (
                <>
                  <Dropdown
                    label={`Status of ${type}`}
                    dropdownOptions={["Filed", "Granted"]}
                    value={Status_of_patent}
                    handleOptionChange={handleStatus_of_patentChange}
                  />
                  <div>
                    <InputField
                      label={"Date of Filing"}
                      value={Date_of_Filing}
                      setVal={setDate_of_Filing}
                      type={"date"}
                      required
                    />
                    {errors.Date_of_Filing && (
                      <span className="text-red-500">
                        {errors.Date_of_Filing}
                      </span>
                    )}
                  </div>
                </>
              )}
              {type === "IP disclosures" && (
                <>
                  <div>
                    <InputField
                      label={"Date of Disclosure"}
                      value={Date_of_disclosure}
                      setVal={setDate_of_disclosure}
                      type={"date"}
                      required
                    />
                    {errors.Date_of_disclosure && (
                      <span className="text-red-500">
                        {errors.Date_of_disclosure}
                      </span>
                    )}
                  </div>
                  <InputField
                    label={"Previous Disclosure"}
                    value={Previous_disclosure}
                    setVal={setPrevious_disclosure}
                  />
                </>
              )}{" "}
              <Dropdown
                label={"Nationality"}
                dropdownOptions={["National", "International"]}
                value={Nationality}
                handleOptionChange={handleNationalitychange}
                required
              />
              <Dropdown
                label={"Category of IP"}
                dropdownOptions={["Product", "Process", "Technology", "Others"]}
                value={category}
                handleOptionChange={handlecategoryChange}
                required
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
                required
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
              <h1 className="text-blue-900 font-serif font-bold text-xl py-2 m-2 border-black">
                Details of Lead Inventor
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
              <div>
              <InputField
                label={"Name of Lead Inventor"}
                value={Name_of_leadInventor}
                setVal={setName_of_leadInventor}
                required
              />
            {errors.Name_of_leadInventor && (
                <span className="text-red-500">{errors.Name_of_leadInventor}</span>
              )}
              </div>
              <div>
              <InputField
                label={"Department of Lead Inventor"}
                value={Department_of_leadInventor}
                setVal={setDepartment_of_leadInventor}
                required
              />
               {errors.Department_of_leadInventor && (
                <span className="text-red-500">{errors.Department_of_leadInventor}</span>
              )}
</div>
<div>
              <InputField
                label={"Designation of Lead Inventor"}
                value={Designation_of_leadInventor}
                setVal={setDesignation_of_leadInventor}
                required
              />
               {errors.Designation_of_leadInventor && (
                <span className="text-red-500">{errors.Designation_of_leadInventor}</span>
              )}
              </div>
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
            <div className="grid gap-y-8 grid-col w-960 m-auto max-h-screen overflow-y-scroll bg-white shadow-lg rounded-md px-6 py-2 mt-4 ">
              <div>
                <h1 className="text-black font-serif font-bold text-xl  py-2 m-2 border-black">
                  Details of Patent Department or Patent Authority
                </h1>
              </div>
              <div className="flex flex-col">
            <label For="Inputfeild" className="text-base font-medium text-black">
            Name of Patent Authority or Department<span className="text-red-500">*</span>
            </label>
            <input
              className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
      
              id="Inputfeild"
              value={Name_of_patentdept}
              onChange={(e)=>{
            setName_of_patentdept(e.target.value)
              }}
              required
            />
            {errors.Name_of_patentdept && (
              <span className="text-red-500">{errors.Name_of_patentdept}</span>
            )}
          </div>
              <label
                htmlFor="textarea"
                className="text-base font-medium text-black"
              >
                Detail of Patent Department or Patent Authority
              </label>
              <textarea
                className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
                rows="4"
                cols="50"
                id="Textarea"
                value={Detail_of_patentdept}
                onChange={handleDetail_of_patentdeptchange}
               
              />
              <div className="grid grid-cols-2 gap-y-8 gap-x-16">
                <button
                  onClick={prevStage}
                  className="bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-2/4"
                >
                  Previous
                </button>
                <button
                  onClick={nextStage}
                  className="ml-auto bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-2/4"
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
                  label={"Disclosure Copy"}
                  value={DisclosureCopy}
                  setVal={setDisclosureCopy}
                  type={"file"}
                />
                <InputField
                  label={"Filing Copy"}
                  value={Filingcopy}
                  setVal={setFilingcopy}
                  type={"file"}
                />
                <InputField
                  label={"Granting Copy"}
                  value={GrantingCopy}
                  setVal={setGrantingCopy}
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
                  label={"Financial Support"}
                  value={Financial_support}
                  setVal={setFinancial_support}
                />
                <InputField
                  label={"Commercial Partners"}
                  value={Commercial_partner}
                  setVal={setCommercial_partner}
                />
              </div>
              <label
                htmlFor="textarea"
                className="text-base font-medium text-black"
              >
                Write Key Aspects<span className="text-red-500">*</span>
              </label>
              <textarea
                className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
                rows="3"
                cols="50"
                id="Textarea"
                value={Keyaspects}
                onChange={handleKeyaspectschange}
                required
              />
               {errors.Keyaspects && (
              <span className="text-red-500">{errors.Keyaspects}</span>
            )}

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

export default IPandPatentForm;
