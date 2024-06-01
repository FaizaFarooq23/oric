
import React, { useState,useEffect } from "react";
import Modal from "react-modal";
import axios from 'axios';
import { FaTimes } from "react-icons/fa";
import { FaPencil, FaCheck } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import Dropdown from "@/components/FacultyDashboard/Profile/components/Common/Dropdown";
import IPdata from "./IPdata";
import { uploadFile } from "../../Utility/Saveimagefiles";
import SuccessModal from "../../components/UI/SuccessMessage";
import { signIn, signOut, useSession } from "next-auth/react";
export default function IPfield({data ,onDelete}) {
  const [GrantingCopy, setGrantingCopy] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [isformVisible, setisformVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [Status_of_patent, setStatus_of_patent] = useState("Filed");
  const [id, setProjectId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control SuccessModal visibility
  const { data: session } = useSession();
 
  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleStatus_of_patentChange = (e) => {
    setStatus_of_patent(e.target.value);
  };
  const handleValueClick = () => {
    setEditing(true);
   // Activate editing mode
  };
  useEffect(() => {
    if(data) {
      setProjectId(data.id);
      setStatus_of_patent(data.Status_of_patent)
    }
    if(session){
      console.log(session)
    }
  }, [data,session]);
const resetfeilds=()=>{
  setStatus_of_patent("")
}
const UploadFile = async () => {
  if (Status_of_patent ==="Granted" && (`${data.Type}`!=="IP disclosures")) {
    try {
      if (GrantingCopy) {
        await uploadFile(
          GrantingCopy,
          session.user.username,
          `/api/Imagesfeilds/fileupload`,
          `${data.Title_of_Invention}_ Grantingcopy`,
          "ipandpatent"
        );
      } else {
        alert("Please upload Granting Copy");
      }
    } catch (error) {
      console.error("Error saving image:", error);
      alert("error");
    }
  } 
  
  };
const updateinfo = async () => {
    await UploadFile();
    if (id) {
      try {
        const res = await axios.post(`/api/IPandPatent/update_ipdisclosures?id=${id}`, {
          Status_of_patent: Status_of_patent ,
        });
        console.log(res);
        setEditing(false);
        setShowSuccessModal(true);
        resetfeilds()
      } catch (error) {
        console.error("Error updating information:", error);
      }
    }
  };
  const getFilenamesToDelete = (data) => {
    let filenames = [];
    if ((Status_of_patent === "Granted") && (`${data.Type}`!=="IP disclosures")) {
      filenames.push(`${data.Title_of_Invention}_Grantingcopy.png`);
    }
    if (data.Status_of_patent ==="Granted"||data.Status_of_patent==="Filed") {
      filenames.push(`${data.Title_of_Invention}_Filingcopy.png`);
    }
    
    return filenames;
  };
  
  
  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col bg-white shadow-lg m-4 h-48 rounded-md">
       <div className="flex justify-end items-center mr-6 mt-2">
          <button onClick={() => onDelete(data.id,getFilenamesToDelete(data))}>
            <RiDeleteBin6Line className="text-red-600 cursor-pointer" />
          </button>
        </div>
    <div className={`flex  flex-row  h-36 justify-between px-10 py-8  `}>
      <div className={`flex flex-col gap-y-4  m-4 gap-x-10`}>
        <div className=" flex items-start justify-start"> <span className="text-gray-500  font-medium">Title of Invention</span>
        </div>
        <div className="flex justify-center ">
        <span className="text-black ">{`${data.Title_of_Invention
              .split(" ")
              .slice(0, 4)
              .join(" ")}...`}</span>
        </div>
      </div>

      <div className={`flex flex-col gap-y-4 m-3  m-4 gap-x-10`}>
        <div className=" flex items-start justify-start "> <span className="text-gray-500  font-medium">Category Of IP</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Category}</span>
        </div>
      </div>
      <div className={`flex flex-col gap-y-4 m-3  m-4 gap-x-10`}>
        <div className=" flex items-start justify-start "> <span className="text-gray-500  font-medium">Development Status</span>
        </div>
        <div className="flex items-end justify-center ">
          <span className="text-black ">{data.Development_Status}</span>
        </div>
      </div>
      <div className={`flex flex-col w-48 gap-y-4 m-3 gap-x-8 `}>
          <div className=" flex items-start justify-start">
            <span className="">
              {editing ? (
                <Modal
                  isOpen={editing}
                  onRequestClose={() => setEditing(false)}
                  contentLabel="Edit Project Status"
                  className={`flex flex-col  my-10 w-4/5 b-2-red   mx-auto  bg-white shadow-lg rounded-md p-4`}
                >
                  <div className="flex px-10 py-4  flex-col">

                  <div className="flex flex-row py-2 m-2 gap-x-10 ">
                  <h1 className="text-blue-900 font-serif font-bold text-xl  border-black">

Update Information

</h1>

  <span> 
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
  </span>        

                  </div>
                  
                  <div className="flex flex-row ">
                    <div className="grid grid-cols-2 gap-x-16 gap-y-10 ">
                       
                    <Dropdown
                    label={`Status of ${data.Type}`}
                    dropdownOptions={["Filed", "Granted"]}
                    value={Status_of_patent}
                    handleOptionChange={handleStatus_of_patentChange}
                  />
                  {
                    ((Status_of_patent === "Granted") && (`${data.Type}`!=="IP disclosures") && (
                      <div className="grid grid-cols-2 gap-x-3   text-black">
                        <label className="text-base font-medium">
                          Granting Copy <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="outline outline-1 focus:outline-2 focus:outline-blue-900 outline-black px-2 rounded-sm"
                          type="file"
                          defaultValue={GrantingCopy}
                          onChange={(e) => {
                            console.log("File selected:", e.target.files[0]);
                            setGrantingCopy(e.target.files[0]);
                          }}
                          required
                        />
                       
                      </div>
                    ))}
                  </div>

                    </div>
                    </div>
                </Modal>
              ) : (
                <>
                  <div className="flex ">
                    <span className="text-gray-500 font-medium ">
                      Project Status 
                    </span>
                    {!editing  && data.Status_of_patent !== "Granted" && (
  <FaPencil className="text-base text-blue-900 h-4 w-4 cursor-pointer" onClick={handleValueClick} />
)}

                  </div>
                </>
              )}
            
            </span>
          </div>
          <div className="flex justify-start ">
            <span className="text-black ">{data.Status_of_patent} </span>
          </div>
        </div>
        {showSuccessModal && <SuccessModal isOpen={showSuccessModal} p={`Your Data Has Been Updated`} onClose={()=>{
          setShowSuccessModal(false)
        }} />}
      </div>

<div className="flex justify-end mr-6">
<button onClick={openModal}>Click to View Full Details
</button>
</div>  
<IPdata isOpen={isModalOpen} closeModal={closeModal} data={data}/>
  
</div>
  );
}
