import InputField from '@/components/FacultyDashboard/Profile/components/Common/InputField'
import React, { useState,useEffect } from 'react'
import { Label } from 'recharts';
import Modal, { useModalState } from "react-simple-modal-provider";
import { signIn, signOut, useSession } from 'next-auth/react';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Liasendeveloped({ children }) {
    const [isOpen, setOpen] = useModalState();
    const {data: session} = useSession();
  
  
    useEffect(() => {
      console.log(session)
    }, [session]);
  
    const [Liasendeveloped, setLiasendeveloped] = useState("");
    const [DateofExecution, setDateofExecution] = useState("");
    const handleSubmit = async () => {
       
        try {
          if (Liasendeveloped === "" || DateofExecution === "" ) {
            alert("Please fill all the fields");
            return;
          }
          if (session.user.username === "") {
            alert("Please login to continue");
            signOut();
            return;
          }
          const res = await axios.post(`/api/Research_projects/insert_liasen`, {
            username:session.user.username,
            Liasen_developed_with:Liasendeveloped,
            Date_of_exceution:new Date(DateofExecution),
          });
    
          setOpen(false);

          toast.success('Data saved successfully!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 10000,
        });
          setLiasendeveloped("");
            setDateofExecution("");
          console.log(res);
        } catch (error) {
          console.error("Error inserting Liasen information:", error);
        }
      }

    return (
        <Modal
        id={"LiasendevelopedFormModal"}
        consumer={children}
        isOpen={isOpen}
        setOpen={setOpen}
      >
        <div className=" flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 ">
            <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
                <InputField
                    label={"Liasen Developed with"}
                    value={Liasendeveloped}
                    setVal={setLiasendeveloped}
                />
                <InputField
                    label={"Date of Execution"}
                    value={DateofExecution}
                    setVal={setDateofExecution}
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


export default Liasendeveloped
