import Dropdown from "@/components/FacultyDashboard/Profile/components/Common/Dropdown";
import InputField from "@/components/FacultyDashboard/Profile/components/Common/InputField";
import React, { useState, useEffect } from "react";
import { Label } from "recharts";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import Modal, { useModalState } from "react-simple-modal-provider";
function Product_DisplayedForm({children}) {
  const [isOpen, setOpen] = useModalState();
  const [Name_of_lead, setName_of_lead] = useState("");
  const [Designation_of_lead, setDesignation_of_lead] =
    useState("");
  const [Department_of_lead, setDepartment_of_lead] =
    useState("");
  const [Title, setTitle] = useState("");
  const [category, setcategory] = useState("Product");
  const [Status, setStatus] = useState("");
  const [Nationality, setNationality] = useState("National");
  const [Feild_of_use, setFeild_of_use] = useState("");
  const [Name_of_Forum, setName_of_Forum] = useState("");
  const [Detail_of_Forum, setDetail_of_Forum] = useState("");
  const [Financial_support, setFinancial_support] = useState("");
  const [Breif, setBreif] = useState("");
  const [stage, setStage] = useState(1);
  const Dialog = ({ isOpen, onClose, heading, message }) => {
    if (!isOpen) return null;
  };
  const handlecategoryChange = (e) => {
    setcategory(e.target.value);
  };


  const handleNationalitychange = (e) => {
    setNationality(e.target.value);
  };
  const handleDetail_of_Forumchange = (e) => {
    setDetail_of_Forum(e.target.value);
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
      if (Title === "" ) {
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
        Title: Title,
        Category: category,
        Status: Status,
        Name_of_lead: Name_of_lead,
        Designation_of_lead: Designation_of_lead,
        Department_of_lead: Department_of_lead,
        Feild_of_use: Feild_of_use,
        Name_of_Forum: Name_of_Forum,
        Detail_of_Forum: Detail_of_Forum,
        Financial_support: Financial_support,
        Breif: Breif,
     
        Nationality: Nationality,
        
      };

      // Make the POST request to save the data
      const res = await axios.post(`/api/Research_products/Insert_product_displayed`, data);

      setOpen(false);
      console.log(res);
    } catch (error) {
      console.error("Error inserting information:", error);
    }
    alert("You clicked ");
  };

  return (
    <Modal
      id={"Product_DisplayedFormModal"}
      consumer={children}
      isOpen={isOpen}
      setOpen={setOpen}
    >
    <div>
      {stage === 1 && (
        <div className=" flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 ">
          <div>
            <h1 className="text-black font-serif font-bold text-xl py-2 m-2 border-black">
             Enter Infromation of  Product Displayed or Represented At National or Internation level
            </h1>
          </div>
          <InputField
            label={"Title"}
            value={Title}
            setVal={setTitle}
          />

          <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
            
            <Dropdown
              label={"Nationality"}
              dropdownOptions={["National", "International"]}
              value={Nationality}
              handleOptionChange={handleNationalitychange}
            />
            <Dropdown
              label={"Category"}
              dropdownOptions={["Product", "Process", "Technology", "Others"]}
              value={category}
              handleOptionChange={handlecategoryChange}
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
              Details of Lead
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
            <InputField
              label={"Name of Lead "}
              value={Name_of_lead}
              setVal={setName_of_lead}
            />

            <InputField
              label={"Department of Lead "}
              value={Department_of_lead}
              setVal={setDepartment_of_lead}
            />

            <InputField
              label={"Designation of Lead"}
              value={Designation_of_lead}
              setVal={setDesignation_of_lead}
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
                Details of Forum Where Product is Displayed /Registered or Performed
              </h1>
            </div>
            <div className="grid grid-cols-2 w-auto gap-y-8 gap-x-16 ">
              <InputField
                label={"Name of Forum"}
                value={Name_of_Forum}
                setVal={setName_of_Forum}
              />
               <InputField
                label={"Status"}
                value={Status}
                setVal={setStatus}
              />
            </div>
            <label
              htmlFor="textarea"
              className="text-base font-medium text-black"
            >
              Detail of Forum
            </label>
            <textarea
              className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
              rows="4"
              cols="50"
              id="Textarea"
              value={Detail_of_Forum}
              onChange={handleDetail_of_Forumchange}
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
            <h1 className="text-black font-serif font-bold text-xl py-2 m-2 border-black">
              Additional Details
            </h1>
            <div className="grid grid-cols-2 gap-y-8 gap-x-16">
            <InputField
                label={"Breif"}
                value={Breif}
                setVal={setBreif}
                type={"file"}
              />
              <InputField
                label={"Financial Support"}
                value={Financial_support}
                setVal={setFinancial_support}
              />
              <InputField
                label={"Commercial Partners"}
                value={Feild_of_use}
                setVal={setFeild_of_use}
              />
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
  );
}

export default Product_DisplayedForm;
