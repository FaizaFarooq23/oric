import React, { useState,useEffect } from "react";
import IPLicensingdata from "./IP_LicensingData";
import { FaPencil, FaCheck } from "react-icons/fa6";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaTimes, FaEdit } from 'react-icons/fa'; 
import Dropdown from "@/components/FacultyDashboard/Profile/components/Common/Dropdown";
import InputField from "@/components/FacultyDashboard/Profile/components/Common/InputField";
import Modal from "react-modal";
import { signIn, signOut, useSession } from "next-auth/react";
import { uploadFile } from "../../Utility/Saveimagefiles";
import SuccessModal from "../../components/UI/SuccessMessage";
export default function IPLicensingfeild({ data, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [AgreementCopy, setAgreementCopy] = useState("");
  const [Status_of_Licensee, setStatus_of_Licensee] = useState("License Negotitaed");
  const [Date_of_Agreement, setDate_of_Agreement] = useState("");
  const [Licensee_Type, setLicensee_Type] = useState("Exclusive");
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State to control SuccessModal visibility
  const [id, setid] = useState(null);
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      console.log(session);
    }
    if (data) {
      setid(data.id);
      setStatus_of_Licensee(data.Status_of_Licensee);
    }
  }, [session, data]);
  
  const handleStatus_of_Licensee = (e) => {
    setStatus_of_Licensee(e.target.value);
  };
  const handleLicenseetype = (e) => {
    setLicensee_Type(e.target.value);
  };
  const handleValueClick = () => {
    setEditing(true);
    // Activate editing mode
  };
const resetfeilds=()=>{
setDate_of_Agreement("")
setLicensee_Type("Exclusive")
setStatus_of_Licensee("License Negotiated")
}
const UploadFile = async () => {
if (Status_of_Licensee==="Signed") {
  try {
    if (AgreementCopy) {
      await uploadFile(
        AgreementCopy,
        session.user.username,
        `/api/Imagesfeilds/fileupload`,
        `${data.Title}_LicenseAgreementCopy`,
        "ip_licensing"
      );
    } else {
      alert("Please upload Filing Copy");
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
        const res = await axios.post(
          `/api/IPLicensing/Update_IPLicensing?id=${id}`,
          {
            Status_of_Licensee: Status_of_Licensee,
            Licensee_Type: Licensee_Type,
            Date_of_Agreement: new Date(Date_of_Agreement),
          }
        );
        console.log(res);
        setEditing(false);
        setShowSuccessModal(true);
        resetfeilds() // Show SuccessModal after successful deletion
      } catch (error) {
        console.error("Error updating information:", error);
      }
    
    }
  };
  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  const getFilenamesToDelete = (data) => {
    let filenames = [];
    if (data.Status_of_Licensee ==="Granted") {
      filenames.push(`${data.Title}_LicenseAgreementCopy.png`);
    }
    if(data.Status_of_Licensee ==="Granted"||data.Status_of_Licensee==="Negotiations Initiated") {
      filenames.push(`${data.Title}_NegotationCopy.png`);
    }
    
    return filenames;
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col bg-white shadow-lg m-4 h-48 rounded-md   ">
      <div className="flex justify-end items-center mr-6 mt-2">
        <button onClick={() => onDelete(
          data.id,getFilenamesToDelete(data))
          }>
          <RiDeleteBin6Line className="text-red-600 cursor-pointer" />
        </button>
      </div>
      <div className={`flex  flex-row  h-36 justify-between px-10 py-8  `}>
        <div className={`flex flex-col gap-y-4  m-4 gap-x-10`}>
          <div className=" flex items-start justify-start">
            {" "}
            <span className="text-gray-500  font-medium">
              Title of Invention
            </span>
          </div>
          <div className="flex justify-center ">
            <span className="text-black ">{data.Title}</span>
          </div>
        </div>

        <div className={`flex flex-col gap-y-4 m-3  m-4 gap-x-10`}>
          <div className=" flex items-start justify-start ">
            {" "}
            <span className="text-gray-500  font-medium">Category</span>
          </div>
          <div className="flex items-end justify-center ">
            <span className="text-black ">{data.Category}</span>
          </div>
        </div>
        <div className={`flex flex-col gap-y-4 m-3  m-4 gap-x-10`}>
          <div className=" flex items-start justify-start ">
            {" "}
            <span className="text-gray-500  font-medium">
              Development Status
            </span>
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
                          label={"Status of Lisencee"}
                          dropdownOptions={[
                            "Negotiations Initiated ",
                            "Signed",
                          ]}
                          value={Status_of_Licensee}
                          handleOptionChange={handleStatus_of_Licensee}
                          required
                        />
                        {Status_of_Licensee === "Signed" && (
                          <>
                            <Dropdown
                              label={"Type of Lisencee"}
                              dropdownOptions={["Exclusive", "Non-Exclusive"]}
                              value={Licensee_Type}
                              handleOptionChange={handleLicenseetype}
                              required
                            />
                            <div>
                              <InputField
                                label={"Date of Agreement"}
                                value={Date_of_Agreement}
                                setVal={setDate_of_Agreement}
                                type={"date"}
                                required
                              />

                            </div>
                            {
                  Status_of_Licensee==="Signed"&&
                  <div className="grid grid-cols-2 gap-x-3   text-black">

                  <label className="text-base font-medium">
                    AgreementCopy <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="outline outline-1 focus:outline-2 focus:outline-blue-900 outline-black px-2 rounded-sm"
                    type="file"
                    defaultValue={AgreementCopy}
                    onChange={(e) => {
                      console.log("File selected:", e.target.files[0]);
                      setAgreementCopy(e.target.files[0]);
                    }}
                    required
                  />

                </div>
                }
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Modal>
              ) : (
                <>
                  <div className="flex ">
                    <span className="text-gray-500 font-medium">
                      Status of Licence
                    </span>
                    {!editing && data.Status_of_Licensee !== "Signed" && (
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
          </div>
          <div className="flex justify-start ">
            <span className="text-black ">{data.Status_of_Licensee} </span>
          </div>
        </div>
        {showSuccessModal && <SuccessModal isOpen={showSuccessModal} p={`Your Data Has Been Updated`} onClose={()=>{
          setShowSuccessModal(false)
        }} />}
        <div className={`flex flex-col gap-y-4 m-3  m-4 gap-x-10`}>
          <div className=" flex items-start justify-start ">
            {" "}
            <span className="text-gray-500  font-medium">Nationaity</span>
          </div>
          <div className="flex items-end justify-center ">
            <span className="text-black ">{data.Nationality}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end mr-6">
        <button onClick={openModal}>Click to View Full Details</button>
      </div>
      <IPLicensingdata
        isOpen={isModalOpen}
        closeModal={closeModal}
        data={data}
      />
    </div>
  );
}
