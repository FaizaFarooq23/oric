import Dropdown from "@/components/FacultyDashboard/Profile/components/Common/Dropdown";
import InputField from "@/components/FacultyDashboard/Profile/components/Common/InputField";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { uploadFile } from "../../Utility/Saveimagefiles";
import { signIn, signOut, useSession } from "next-auth/react";
import Modal, { useModalState } from "react-simple-modal-provider";
import SuccessModal from "../../components/UI/SuccessMessage";
import useFieldCheck from "../../Utility/CheckExsistingFeilds";
function Product_to_IndustryForm({children}) {
  const [errors, setErrors] = useState({});
  const [isOpen, setOpen] = useModalState();
  const [Name_of_leadInventor, setName_of_leadInventor] = useState("");
  const [Designation_of_leadInventor, setDesignation_of_leadInventor] =
    useState("");
  const [Department_of_leadInventor, setDepartment_of_leadInventor] =
    useState("");
  const [Title_of_Invention, setTitle_of_Invention] = useState("");
  const [category, setcategory] = useState("Product");
  const [Remarks, setRemarks] = useState("");
  const[Development_Status,setDevelopment_status]=useState("idea")
  const[KeyAspects,setKeyAspects]=useState("")
  const [Nationality, setNationality] = useState("National");
  const [Feild_of_use, setFeild_of_use] = useState("");
  const [Name_of_Partner, setName_of_Partner] = useState("");
  const [Detail_of_Partner, setDetail_of_Partner] = useState("");
  const [Financial_support, setFinancial_support] = useState("");
  const [PdProof, setPdProof] = useState("");
  const [stage, setStage] = useState(1)
  const [submitting, setSubmitting] = useState(false);

  const [showSuccessModal, setshowSuccessSuccessModal] = useState(false); // State to control SuccessModal visibility
  const handlecategoryChange = (e) => {
    setcategory(e.target.value);
  };

  const { data: session } = useSession();
  useEffect(() => {
    console.log(session);
  }, [session]);
  const { isExisting: isExistingProject, loading: loadingProjectCheck } = useFieldCheck(
    session?.user?.username,
    'Title_of_Invention',
    Title_of_Invention,
    `/api/Product_to_Industry/Get_Product`
  );
  const handleDevelopment_Status = (e) => {
    setDevelopment_status(e.target.value);
  };
  const handleKeyAspects = (e) => {
    setKeyAspects(e.target.value);
  };
  const handleRemarks = (e) => {
    setRemarks(e.target.value);
  };
  const handleNationalitychange = (e) => {
    setNationality(e.target.value);
  };
  const handleDetail_of_Partnerchange = (e) => {
    setDetail_of_Partner(e.target.value);
  };
  const validateFormStage1 = () => {
    let valid = true;
    const newErrors = {};
    if (Title_of_Invention.trim() === "") {
      newErrors.Title_of_Invention = "Title of Invention is required";
      valid = false;
    } else if (isExistingProject) {
      newErrors.Title_of_Invention = "A Project with this title already exists for you";
      valid = false;
    } else {
      newErrors.Title_of_Invention= "";
    }
   
    if (Feild_of_use.trim() === "") {
      newErrors.Feild_of_use = "Feild of Use is required";
      valid = false;
    } else {
      newErrors.Feild_of_use = "";
    }
    setErrors(newErrors);
    return valid;
  }
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

    if (Name_of_Partner.trim() === "") {
      newErrors.Name_of_Partner = "Name of Partner is required";
      valid = false;
    } else {
      newErrors.Name_of_Partner = "";
    }
    if (Detail_of_Partner.trim() === "") {
      newErrors.Detail_of_Partner = "Detail of partner  is required";
      valid = false;
    } else {
      newErrors.Detail_of_Partner= "";
    }
    setErrors(newErrors);
    return valid;
  };
  const validateFormStage4 = () => {
    let valid = true;
    const newErrors = {};
    if (KeyAspects.trim() === "") {
      newErrors.Keyaspects = "Key Aspects is required";
      valid = false;
    } else {
      newErrors.Keyaspects = "";
    }
    if (!PdProof.trim() === "") {
      newErrors.PdProof = "PdProof is required";
      valid = false;
    } 
    else if (!['image/jpeg', 'image/jpg', 'image/png'].includes(PdProof.type)) {
      newErrors.PdProof = "Only jpg, jpeg, and png files are allowed";
      valid = false;
    }
    else {
      newErrors.PdProof = "";
    }
    setErrors(newErrors);
    return valid;
  };
  const resetInventionFormFields = () => {
    setOpen(false);
    setName_of_leadInventor("");
    setPdProof(null)
    setDesignation_of_leadInventor("");
    setDepartment_of_leadInventor("");
    setTitle_of_Invention("");
    setcategory("Product");
    setRemarks("");
    setDevelopment_status("idea");
    setKeyAspects("");
    setNationality("National");
    setFeild_of_use("");
    setName_of_Partner("");
    setDetail_of_Partner("");
    setFinancial_support("");
    setPdProof("");
    setStage(1);
  };
  
  // Call resetInventionFormFields whenever you need to reset these form fields
  
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
  }

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
        setSubmitting(false)
        return;
      }
      // Check if the user is authenticated
      if (!session || !session.user || !session.user.username) {
        alert("Please log in to continue");
        signOut({ callbackUrl: "http://localhost:3000/" });;
        return;
      }
      try {
        if (PdProof) {
          await uploadFile(
            PdProof,
            session.user.username,
            `/api/Imagesfeilds/fileupload`,
            `${Title_of_Invention}_PdProof`,
            "product_to_industry"
          );
        }
        else{
          alert("Please upload Pdprof")
        }
  
    } catch (error) {
      console.error("Error saving image:", error);
      alert("error")
    }
      // Construct the data object based on the conditions
      const data = {
        username: session.user.username,
        Title_of_Invention: Title_of_Invention,
        Category: category,
        Remarks: Remarks,
        Name_of_leadInventor: Name_of_leadInventor,
        Designation_of_leadInventor: Designation_of_leadInventor,
        Department_of_leadInventor: Department_of_leadInventor,
        Development_Status:Development_Status,
        KeyAspects:KeyAspects,
        Feild_of_use: Feild_of_use,
        Name_of_partner: Name_of_Partner,
        Detail_of_partner: Detail_of_Partner,
        Financial_support: Financial_support,
        PdProof:PdProof,
        Nationality: Nationality,
        
      };

      // Make the POST request to save the data
      const res = await axios.post(`/api/Product_to_Industry/Insert_Product`, data);

      setOpen(false);
      resetInventionFormFields()
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
    id={"Product_to_IndustryFormModal"}
    consumer={children}
    isOpen={isOpen}
    setOpen={setOpen}
    >
    <div className="text-black">
      {stage === 1 && (
        <div className=" flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 ">
          <div>
            <h1 className="text-blue-900   font-bold text-xl py-2 m-2 border-black">
             Enter Infromation of  Research products / process / prototype gone into prefeasibility / industrial scale testing or prototype development
            </h1>
          </div>
          <div>
              <InputField
                label={"Title of Invention"}
                value={Title_of_Invention}
                setVal={setTitle_of_Invention}
                required
              />
              {errors.Title_of_Invention && (
                <span className="text-red-500">{errors.Title_of_Invention}</span>
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
            label={"Feild of Use"}
            value={Feild_of_use}
            setVal={setFeild_of_use}
            required
          />
           {errors.Feild_of_use && (
                <span className="text-red-500">{errors.Feild_of_use}</span>
              )}
              </div>
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
                <InputField
                label={"Financial Support"}
                value={Financial_support}
                setVal={setFinancial_support}
              />
          </div>
          <div className="flex flex-row   ml-auto ">
            <button
              onClick={nextStage}
              className="bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-56"
            >
              Next
            </button>
          </div>
        </div>
      )}
    {stage === 2 && (
          <div className=" flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 ">
            <div>
              <h1 className="text-blue-900   font-bold text-xl py-2 m-2 border-black">
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
                  <span className="text-red-500">
                    {errors.Name_of_leadInventor}
                  </span>
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
                  <span className="text-red-500">
                    {errors.Department_of_leadInventor}
                  </span>
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
                  <span className="text-red-500">
                    {errors.Designation_of_leadInventor}
                  </span>
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
              <h1 className="text-blue-900   font-bold text-xl  py-2 m-2 border-black">
                Details of Partner
              </h1>
            </div>
            <div className="grid grid-cols-2 w-auto gap-y-8 gap-x-16 ">
              <div>
              <InputField
                label={"Name of Partner"}
                value={Name_of_Partner}
                setVal={setName_of_Partner}
                required
              />
                {errors.Name_of_Partner && (
                <span className="text-red-500">{errors.Name_of_Partner}</span>
              )}
           </div>
            </div>
            <div className="flex fex-col"> 
            <label
              htmlFor="textarea"
              className="text-base font-medium text-black"
            >
              Detail of Partner
            </label>
            <textarea
              className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
              rows="4"
              cols="50"
              id="Textarea"
              value={Detail_of_Partner}
              onChange={handleDetail_of_Partnerchange}
            />
              {errors.Detail_of_Partner && (
                <span className="text-red-500">{errors.Detail_of_Partner}</span>
              )}
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
          <div className="grid gap-y-8 grid-col bg-white max-h-screen overflow-y-scroll shadow-lg rounded-md px-6 py-2 w-[60rem] mt-4 max-h-full">
            <h1 className="text-blue-900   font-bold text-xl py-2 m-2 border-black">
              Additional Details
            </h1>
            <div className="grid grid-cols-2 gap-x-3   text-black">
        <label className="text-base font-medium">
      PdProof Copy<span className="text-red-500">*</span></label>
      <input
    className="outline outline-1 focus:outline-2 focus:outline-blue-900 outline-black px-2 rounded-sm"
    type="file"
    defaultValue={PdProof}
    onChange={(e) => {
      console.log("File selected:", e.target.files[0]);
      setPdProof(e.target.files[0]);
    }}
    required
  />
  {errors.PdProof && (
                <span className="text-red-500">{errors.P}</span>
              )}
 
    </div>
            <div className="grid grid-cols-2 w-auto gap-y-8 gap-x-16 ">
            <div className="grid grid-cols-2 gap-y-8 gap-x-16">
            </div>
            </div>
            <label
              htmlFor="textarea"
              className="text-base font-medium text-black"
            >
              Remarks
            </label>
            <textarea
              className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
              rows="4"
              cols="50"
              id="Textarea"
              value={Remarks}
              onChange={handleRemarks}
            />
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
                value={KeyAspects}
                onChange={handleKeyAspects}
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

export default Product_to_IndustryForm;
