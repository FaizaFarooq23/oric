import React, { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useModal } from 'react-simple-modal-provider';
import axios from 'axios';
import { deleteFile } from '../Utility/Deleteimage';
import { useSession } from 'next-auth/react';
import Product_to_Industryfield from '../Forms/ResearchProducts/ProductDisplayedFeilds';
import Product_to_IndustryForm from '../Forms/Product_to_Industry/Product_to_industryForm';
import Product_to_IndustryFeilds from '../Forms/Product_to_Industry/Product_to_IndustryFeild';
import SuccessModal from '../components/UI/SuccessMessage';
export default function Product_to_IndustryTab() {
  const { open: openModal } = useModal("Product_to_IndustryFormModal");
  const [isFormVisible, setFormVisibility] = useState(false);
  const {data: session} = useSession();
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false); // State to control SuccessModal visibility

  const [Product_to_IndustryData, setProduct_to_IndustryData] = useState([]);
  useEffect(() => {
    const fetchProduct_to_Industrydata = async () => {
      try {
        if (session) {
          const res = await axios.get(`/api/Product_to_Industry/Get_Product`, {
            params: {
              username: session.user.username,
            }
          });
          setProduct_to_IndustryData(res.data);
        }
      } catch (error) {
        console.error("Error fetching information:", error);
      }
    };

    fetchProduct_to_Industrydata();
  }, [session]);
 
const handleDeleteProject = async (id,filename) => {
  try {
    await deleteFile(
      session.user.username,
        "product_to_industry", // or any other table name relevant to your project
        filename, // The filename you want to delete
      `/api/Imagesfeilds/filedelete`
    );
    await axios.delete(`/api/Product_to_Industry/delete_Product?id=${id}`);
    console.log('Project deleted successfully');
    setShowDeleteSuccessModal(true); // Show SuccessModal after successful deletion
  } catch (error) {
    console.error('Error deleting project:', error);
  }
};

  return (
    <div >
      
      <div className='flex justify-end items-center gap-x-8 text-2xl m-4'>
        <FiPlusCircle className='text-blue-900 cursor-pointer' onClick={openModal} />
        {/* <RiDeleteBin6Line className='text-red-600' onClick={handleDeleteProject} /> */}
      </div>

      {isFormVisible && (
    <Product_to_IndustryForm/>
      )}
     {Product_to_IndustryData.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No data exists at the moment.
        </div>
      ) : (
        Product_to_IndustryData.map((data, index) => (
          <div className="flex flex-col" key={index}>
            <Product_to_IndustryFeilds data={data} onDelete={handleDeleteProject} />
          </div>
        ))
      )}
        {showDeleteSuccessModal && <SuccessModal isOpen={showDeleteSuccessModal} p={`Your Data Has Been Deleted`} onClose={()=>{
          setShowDeleteSuccessModal(false)
        }} />}

      
    </div>
  );
}
