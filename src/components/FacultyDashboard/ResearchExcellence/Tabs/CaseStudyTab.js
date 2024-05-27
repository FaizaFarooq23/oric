import React, { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useModal } from "react-simple-modal-provider";
import axios from "axios";
import { useSession } from "next-auth/react";
import CasestudyForm from "../Forms/CaseStudy/CasestudyForm";
import Casestudyfeilds from "../Forms/CaseStudy/Casestudyfeilds";
import SuccessModal from "../components/UI/SuccessMessage";
import { deleteFile } from "../Utility/Deleteimage";
export default function CaseStudyTab() {
  const { open: openModal } = useModal("CaseStudyFormModal");
  const [isFormVisible, setFormVisibility] = useState(false);
  const { data: session } = useSession();
  const [policy_casestudyData, setpolicy_casestudyData] = useState([]);
  const [showDeleteSuccessDialog, setShowDeleteSuccessDialog] = useState(false);

  useEffect(() => {
    const fetchPolicy_CasestudyData = async () => {
      try {
        if (session) {
          const res = await axios.get(
            `/api/Research_projects/get_policy_advocacy`,
            {
              params: {
                username: session.user.username,
              },
            }
          );
          setpolicy_casestudyData(res.data);
        }
      } catch (error) {
        console.error("Error fetching CaseStudy  information:", error);
      }
    };

    fetchPolicy_CasestudyData();
  }, [session]);
  const handleDeleteProject = async (id,filename) => {
    try {
      await deleteFile(
        session.user.username,
          "policy_casestudy", // or any other table name relevant to your project
          filename, // The filename you want to delete
        `/api/Imagesfeilds/filedelete`
      );
      await axios.delete(
        `/api/Research_projects/deletePolicycaseStudy?id=${id}`
      );
      setShowDeleteSuccessDialog(true);
      console.log("Project deleted successfully");
      setTimeout(() => {
        setShowDeleteSuccessDialog(false);
      }, 3000);
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-end items-center gap-x-8 text-2xl m-4">
        <FiPlusCircle
          className="text-blue-900 cursor-pointer"
          onClick={openModal}
        />
      </div>

      {isFormVisible && <CasestudyForm />}

      {policy_casestudyData.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No data exists at the moment.
        </div>
      ) : (
        policy_casestudyData.map((data, index) => (
          <div className="flex flex-col" key={index}>
            <Casestudyfeilds data={data} onDelete={handleDeleteProject} />
          </div>
        ))
      )}
      {showDeleteSuccessDialog && (
        <SuccessModal
          isOpen={showDeleteSuccessDialog}
          p={`Your Data has been deleted `}
          onClose={() => {
            setShowDeleteSuccessDialog(false);
          }}
        />
      )}
    </div>
  );
}
