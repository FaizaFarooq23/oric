import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Modal, { useModalState } from "react-simple-modal-provider";
import InputField from "../Common/InputField";
import RadioButtonGroup from "../Common/Radiobutton";
import axios from "axios";
import { uploadFile } from "@/components/FacultyDashboard/ResearchExcellence/Utility/Saveimagefiles";
import SuccessModal from "@/components/FacultyDashboard/ResearchExcellence/components/UI/SuccessMessage";
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
  const [errors, setErrors] = useState({});
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setshowSuccessSuccessModal] = useState(false); // State to control SuccessModal visibility

  const handleRelevantCertificateChange = (option) => {
    setRelevant_Certificate(option);
  };
   
  const checkExistingAward = async () => {
    try {
      // Check if an award with the same title already exists for the user
      const existingAwardsResponse = await axios.get(`/api/faculty/Awards/getAwards`, {
        params: {
          username: session.user.username,
          title: title,
        },
      });
  
      const existingAwards = existingAwardsResponse.data;
  
      return existingAwards.some(Awards => Awards.Title_of_award === title);
      
    } catch (error) {
      console.error("Error checking existing award:", error);
      return false;
    }
  };
  
  
  const validateFormStage1 =async () => {
    let valid = true;
    const newErrors = {};

    if (title.trim() === "") {
      newErrors.title = "Title is required";
      valid = false;
    } else {
      // Check if an award with the same title already exists for the user
      const isExistingAward = await checkExistingAward();
  
      if (isExistingAward) {
        newErrors.title = "An award with this title already exists for you";
        valid = false;
      } else {
        newErrors.title = "";
      }
    }
    if (organization_name.trim() === "") {
      newErrors.organization_name= "Organiation is required";
      valid = false;
    } else {
      newErrors.organization_name= "";
    }
    if (amount.trim() === "") {
      newErrors.amount= "Amount of Prize is required";
      valid = false;
    }else if (!/^\d+$/.test(amount)) {
      newErrors.amount = "Amount must contain only numeric digits";
      valid = false;
    } else {
      newErrors.amount= "";
    }
   
    setErrors(newErrors);
    return valid;
  };
  const validateFormStage2 = () => {
    let valid = true;
    const newErrors = {};
  
    if (name_of_winner.trim() === "") {
      newErrors.name_of_winner = "Name is required";
      valid = false;
    } else {
      newErrors.name_of_winner = "";
    }
  
    if (department_of_winner.trim() === "") {
      newErrors.department_of_winner = "Department is required";
      valid = false;
    } else {
      newErrors.department_of_winner = "";
    }
  
    if (Designation_of_winner.trim() === "") {
      newErrors.Designation_of_winner = "Designation is required";
      valid = false;
    } else {
      newErrors.Designation_of_winner = "";
    }
  
    setErrors(newErrors);
    return valid;
  };
  
  const validateFormStage3 = () => {
    let valid = true;
    const newErrors = {};
  
    if (details.trim() === "") {
      newErrors.details = "Brief Detail of Work Honoured is required";
      valid = false;
    } else {
      newErrors.details = "";
    }
    
    if (!copy_of_Mou) {
      newErrors.copy_of_Mou = "Copy of MoU is required";
      valid = false;
    } else if (!['image/jpeg', 'image/jpg', 'image/png'].includes(copy_of_Mou.type)) {
      newErrors.copy_of_Mou = "Only jpg, jpeg, and png files are allowed";
      valid = false;
    }else {
      newErrors.copy_of_Mou = "";
    }
  
  
    setErrors(newErrors);
    return valid;
  };
  const handledetails = (e) => {
    setdetails(e.target.value);
  };
  const handleRemarks = (option) => {
    setRemarks(option.target.value);
  };
  const resetForm = () => {
    setTitle("");
    setorganization_name("");
    setRelevant_Certificate("yes");
    setamount("");
    setdetails("");
    setname_of_winner("");
    setDesignation_of_winner("");
    setdepartment_of_winner("");
    setRemarks("");
    setcopy_of_Mou("");
    setStage(1);
    setErrors({});
  };
  useEffect(() => {
    console.log(session);
  }, [session]);
  const handleSubmit = async () => {
    if (submitting) {
      return;
    }
    setSubmitting(true);
    try {
      if (!validateFormStage3()) {
        alert("Please fill all the fields");
        setSubmitting(false);
        return;
      }

      if (session.user.username === "") {
        alert("Please login to continue");
        signOut({ callbackUrl: "http://localhost:3000/" });
        setSubmitting(false);
        return;
      }

      try {
        if (copy_of_Mou) {
          await uploadFile(
            copy_of_Mou,
            session.user.username,
            `/api/Imagesfeilds/fileupload`,
            `${title}_MoUcopy`,
            "awards"
          );
        } else {
          alert("Please upload MoU Copy");
        }
      } catch (error) {
        console.error("Error saving image:", error);
        alert("error");
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
      resetForm();
      setshowSuccessSuccessModal(true);
      console.log(res);
    } catch (error) {
      console.error("Error inserting information:", error);
    } finally {
      setSubmitting(false);
    }
  };
 // Define a function to handle moving to the next stage
 const nextStage =async () => {
  switch (stage) {
    case 1:
      if (await validateFormStage1()) {
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
  return (
    <>
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
                <div>               
                   <InputField
                  label={"Title of Award"}
                  value={title}
                  setVal={setTitle}
                  required
                />
              {errors.title && (
              <span className="text-red-500">{errors.title}</span>
            )}
            </div>
            <div>
            <InputField
                  label={"Organization Name"}
                  value={organization_name}
                  setVal={setorganization_name}
                  required
                />
               {errors.organization_name && (
              <span className="text-red-500">{errors.organization_name}</span>
            )}
            </div>
              <div>
              <InputField
                  label={"Amount of Prize Money"}
                  value={amount}
                  setVal={setamount}
                  required
                />
                 {errors.amount && (
              <span className="text-red-500">{errors.amount}</span>
            )}
              </div>
                
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
                <div>
                <InputField
                  label={"Name"}
                  value={name_of_winner}
                  setVal={setname_of_winner}
                  required
                />
 {errors.name_of_winner && (
              <span className="text-red-500">{errors.name_of_winner}</span>
            )}
            </div>
            <div>
            <InputField
                  label={"Department"}
                  value={department_of_winner}
                  setVal={setdepartment_of_winner}
                  required
                />
                 {errors.department_of_winner && (
              <span className="text-red-500">{errors.department_of_winner}</span>
            )}
            </div>
                
<div>

                <InputField
                  label={"Designation"}
                  value={Designation_of_winner}
                  setVal={setDesignation_of_winner}
                  required
                />
                 {errors.Designation_of_winner && (
              <span className="text-red-500">{errors.Designation_of_winner}</span>
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
              <div className="grid grid-cols-2 gap-x-3   text-black">
                      <label className="text-base font-medium">
                       Copy of MoU <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="outline outline-1 focus:outline-2 focus:outline-blue-900 outline-black px-2 rounded-sm"
                        type="file"
                        defaultValue={copy_of_Mou}
                        onChange={(e) => {
                          console.log("File selected:", e.target.files[0]);
                          setcopy_of_Mou(e.target.files[0]);
                        }}
                        required
                      />
                      {errors.copy_of_Mou && (
                        <span className="text-red-500">
                          {errors.copy_of_Mou}
                        </span>
                      )}
                    </div>
              </div>
              <label
                htmlFor="textarea"
                className="text-base font-medium text-black"
              >
                Breif Detail of Work Honoured:
                <span className="text-red-500">*</span>
              </label>
             
              <textarea
                className="outline  outline-1 focus:outline-2 focus:outline-blue-900 outline-black  px-2 rounded-sm"
                rows="4"
                cols="50"
                id="Textarea"
                value={details}
                onChange={handledetails}
                required
              />
              {errors.details && (
              <span className="text-red-500">{errors.details}</span>
            )}
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
                    disabled={submitting}
                    className="ml-auto bg-blue-900 text-white px-4 py-2 rounded-md mt-4 ">
                    {submitting ? "Submitting..." : "Submit"}
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
