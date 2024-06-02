import Dropdown from "@/components/FacultyDashboard/Profile/components/Common/Dropdown";
import InputField from "@/components/FacultyDashboard/Profile/components/Common/InputField";
import React, { useState, useEffect } from "react";
import SuccessModal from "../../components/UI/SuccessMessage";
import { signIn, signOut, useSession } from "next-auth/react";
import Modal, { useModalState } from "react-simple-modal-provider";
import axios from "axios";
import useFieldCheck from "../../Utility/CheckExsistingFeilds";

import { uploadFile } from "../../Utility/Saveimagefiles";
function Product_DisplayedForm({children}) {
  const [isOpen, setOpen] = useModalState();
  const [Name_of_lead, setName_of_lead] = useState("");
  const [Designation_of_lead, setDesignation_of_lead] =
    useState("");
  const [Department_of_lead, setDepartment_of_lead] =
    useState("");
    const [submitting, setSubmitting] = useState(false);
  const [Title, setTitle] = useState("");
  const [category, setcategory] = useState("Product");
  const [Status, setStatus] = useState("");
  const [Nationality, setNationality] = useState("National");
  const [Feild_of_use, setFeild_of_use] = useState("");
  const [Name_of_Forum, setName_of_Forum] = useState("");
  const [Detail_of_Forum, setDetail_of_Forum] = useState("");
  const [Financial_support, setFinancial_support] = useState("");
  const [showSuccessModal, setshowSuccessSuccessModal] = useState(false); // State to control SuccessModal visibility
  const [Breif, setBreif] = useState("");
  const [stage, setStage] = useState(1);
  const [errors, setErrors] = useState({});
  const { data: session } = useSession();
  useEffect(() => {
    console.log(session);
  }, [session]);
  const { isExisting: isExistingProject, loading: loadingProjectCheck } = useFieldCheck(
    session?.user?.username,
    'Title',
    Title,
  `/api/Research_products/get_product_displayed`
    
  );
  const handlecategoryChange = (e) => {
    setcategory(e.target.value);
  };
  const handleNationalitychange = (e) => {
    setNationality(e.target.value);
  };
  const handleDetail_of_Forumchange = (e) => {
    setDetail_of_Forum(e.target.value);
  };
  const validateFormStage1 = () => {
    let valid = true;
    const newErrors = {};

    if (Title.trim() === "") {
      newErrors.Title= "Title of Invention is required";
      valid = false;
    } else if (isExistingProject) {
      newErrors.Title = "A Project with this title already exists for you";
      valid = false;
    } else {
      newErrors.Title= "";
    }
    if (Status.trim() === "") {
      newErrors.Status= "Status is required";
      valid = false;
    } else {
      newErrors.Status= "";
    }
    setErrors(newErrors);
    return valid;
  };
  const validateFormStage2 = () => {
    let valid = true;
    const newErrors = {};

    if (Name_of_lead.trim() === "") {
      newErrors.Name_of_lead = "Name of Lead  is required";
      valid = false;
    } else {
      newErrors.Name_of_lead = "";
    }
    if (Designation_of_lead.trim() === "") {
      newErrors.Designation_of_lead = "Designation  is required";
      valid = false;
    } else {
      newErrors.Designation_of_lead = "";
    }
    if (Department_of_lead.trim() === "") {
      newErrors.Department_of_lead = "Department  is required";
      valid = false;
    } else {
      newErrors.Department_of_lead = "";
    }

    setErrors(newErrors);
    return valid;
  };
  const validateFormStage3 = () => {
    let valid = true;
    const newErrors = {};

    if (Name_of_Forum.trim() === "") {
      newErrors.Name_of_Forum = "Name of Forum is required";
      valid = false;
    } else {
      newErrors.Name_of_Forum = "";
    }

    setErrors(newErrors);
    return valid;
  };
  const validateFormStage4 = () => {
    let valid = true;
    const newErrors = {};

    if (!Breif) {
      newErrors.Breif = "Breif copy is required";
      valid = false;
    } 
    else if (!['image/jpeg', 'image/jpg', 'image/png'].includes(Breif.type)) {
      newErrors.Breif = "Only jpg, jpeg, and png files are allowed";
      valid = false;
    }

    else {
      newErrors.Breif = "";
    }

    setErrors(newErrors);
    return valid;
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
  
  const resetFormFields = () => {
    setOpen(false);
    setName_of_lead("");
    setBreif(null);
    setDesignation_of_lead("");
    setDepartment_of_lead("");
    setTitle("");
    setcategory("Product");
    setStatus("");
    setNationality("National");
    setFeild_of_use("");
    setName_of_Forum("");
    setDetail_of_Forum("");
    setFinancial_support("");
    setBreif("");
    setStage(1);
  };
  
  // Call resetFormFields whenever you need to reset these form fields
  
  // Define a function to handle moving to the previous stage
  const prevStage = () => {
    setStage(stage - 1);
    if (stage === 0) {
      setStage(1);
    }
  };
  
  const handleSubmit = async () => {
    if (submitting) {
      return;
    }
    setSubmitting(true);
    try {
      // Validate required fields
      if (!validateFormStage4 ) {
        alert("Please fill all the required fields");
        setSubmitting(true)
        return;
      }

      // Check if the user is authenticated
      if (!session || !session.user || !session.user.username) {
        alert("Please log in to continue");
        signOut({ callbackUrl: "http://localhost:3000/" });;
        return;
      }
      try {
        if (Breif) {
          await uploadFile(
            Breif,
            session.user.username,
            `/api/Imagesfeilds/fileupload`,
            `${Title}_BreifCopy`,
            "product_displayed"
          );
        }
        else{
          alert("Please upload Breif copy")
        }
  
    } catch (error) {
      console.error("Error saving image:", error);
      alert("error")
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
      resetFormFields();
      setshowSuccessSuccessModal(true)
      console.log(res);
    } catch (error) {
      console.error("Error inserting information:", error);
    }finally {
      setSubmitting(false);
    }
    
  };

  return (
    <>
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
            <h1 className="text-blue-900 font-serif font-bold text-xl py-2 m-2 border-black">
             Enter Infromation of  Product Displayed or Represented At National or Internation level
            </h1>
          </div>
          <div>
          <div className="flex ">
            <label For="Inputfeild" className="text-base font-medium text-black px-4">
            Title<span className="text-red-500">*</span>
            </label>
            <input
              className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm w-5/6"
              id="Inputfeild"
              value={Title}
              onChange={(e)=>{
            setTitle(e.target.value)
              }}
              required
            />

          </div>
          {errors.Title && (
              <span className="text-red-500">{errors.Title}</span>
            )}
            </div>
          <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
            <Dropdown
              label={"Nationality"}
              dropdownOptions={["National", "International"]}
              value={Nationality}
              handleOptionChange={handleNationalitychange}
              required
            />
            <Dropdown
              label={"Category"}
              dropdownOptions={["Product", "Process", "Technology", "Others"]}
              value={category}
              handleOptionChange={handlecategoryChange}
              required
            />
            <div>
             <InputField
                label={"Status"}
                value={Status}
                setVal={setStatus}
                required
              />
               {errors.Status && (
              <span className="text-red-500">{errors.Status}</span>
            )}
            </div>
          </div>
          <div className="flex flex-row ml-auto ">
          <button
              onClick={nextStage}
              className="bg-blue-900  text-white px-4 py-2 rounded-md mt-4 w-52"
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
                Details of Lead
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
              <div>
              <InputField
                label={"Name of Lead "}
                value={Name_of_lead}
                setVal={setName_of_lead}
                required
              />
            {errors.Name_of_lead && (
                <span className="text-red-500">{errors.Name_of_lead}</span>
              )}
              </div>
              <div>
              <InputField
                label={"Department of Lead"}
                value={Department_of_lead}
                setVal={setDepartment_of_lead}
                required
              />
               {errors.Department_of_lead && (
                <span className="text-red-500">{errors.Department_of_lead}</span>
              )}
</div>
<div>
              <InputField
                label={"Designation of Lead"}
                value={Designation_of_lead}
                setVal={setDesignation_of_lead}
                required
              />
               {errors.Designation_of_lead && (
                <span className="text-red-500">{errors.Designation_of_lead}</span>
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
          <div className="grid gap-y-8 grid-col bg-white shadow-lg rounded-md px-6 py-2 mt-4 ">
            <div>
              <h1 className="text-blue-900 font-serif font-bold text-xl  py-2 m-2 border-black">
                Details of Forum Where Product is Displayed /Registered or Performed
              </h1>
            </div>
            <div className="grid grid-cols-2 w-auto gap-y-8 gap-x-16 ">
              <InputField
                label={"Name of Forum"}
                value={Name_of_Forum}
                setVal={setName_of_Forum}
                required
              />
              {errors.Name_of_Forum && (
              <span className="text-red-500">{errors.Name_of_Forum}</span>
            )}
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
            <h1 className="text-blue-900 font-serif font-bold text-xl py-2 m-2 border-black">
              Additional Details
            </h1>
            <div className="grid grid-cols-2 gap-y-8 gap-x-16">
            <div className="grid grid-cols-2 gap-x-3   text-black">
        <label className="text-base font-medium">
      Breif Copy</label>
      <input
    className="outline outline-1 focus:outline-2 focus:outline-blue-900 outline-black px-2 rounded-sm"
    type="file"
    defaultValue={Breif}
    onChange={(e) => {
      console.log("File selected:", e.target.files[0]);
      setBreif(e.target.files[0]);
    }}
    required
  />
  {errors.Breif && (
                <span className="text-red-500">{errors.Breif}</span>
              )}
 
    </div>
              <InputField
                label={"Financial Support"}
                value={Financial_support}
                setVal={setFinancial_support}
              />
              <InputField
                label={"Feild of Use"}
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
                    disabled={submitting}
                    className="ml-auto bg-blue-900 text-white px-4 py-2 rounded-md mt-4 ">
                    {submitting ? "Saving..." : "Save"}
                  </button>
            </div>
          </div>
        </>
      )}
    </div>
     </Modal>
         {
            showSuccessModal &&
            (
          
              <SuccessModal isOpen={showSuccessModal} p={`Your Data has been Saved `} onClose={()=>{
                setshowSuccessSuccessModal(false)
              }}/>
            )
          } 
            </>
  );

}

export default Product_DisplayedForm;
