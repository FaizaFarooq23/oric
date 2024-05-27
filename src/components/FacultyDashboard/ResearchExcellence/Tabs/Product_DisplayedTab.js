import React, { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useModal } from 'react-simple-modal-provider';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Product_DisplayedForm from '../Forms/ResearchProducts/ProductDisplayedform';
import Product_Displayedfield from '../Forms/ResearchProducts/ProductDisplayedFeilds';
import SuccessModal from '../components/UI/SuccessMessage';
import { deleteFile ,deleteFiles } from '../Utility/Deleteimage';
export default function Product_DisplayedTab() {
  const { open: openModal } = useModal("Product_DisplayedFormModal");
  const [isFormVisible, setFormVisibility] = useState(false);
  const {data: session} = useSession();
  const [Product_DisplayedData, setProduct_DisplayedData] = useState([]);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false); // State to control SuccessModal visibility


  useEffect(() => {
    const fetchProduct_Displayeddata = async () => {
      try {
        if (session) {
          const res = await axios.get(`/api/Research_products/get_product_displayed`, {
            params: {
              username: session.user.username,
            }
          });
          setProduct_DisplayedData(res.data);
        }
      } catch (error) {
        console.error("Error fetching information:", error);
      }
    };

    fetchProduct_Displayeddata();
  }, [session]);
 
const handleDeleteProject = async (id,filename) => {
  try {
    await deleteFile(
      session.user.username,
        "product_displayed", // or any other table name relevant to your project
        filename, // The filename you want to delete
      `/api/Imagesfeilds/filedelete`
    );

    await axios.delete(`/api/Research_products/delete_product_displayed?id=${id}`);
    console.log('Project deleted successfully');
    setShowDeleteSuccessModal(true); 
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
    <Product_DisplayedForm/>
      )}
         {Product_DisplayedData.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No data exists at the moment.
        </div>
      ) : (
        Product_DisplayedData.map((data, index) => (
          <div className="flex flex-col" key={index}>
            <Product_Displayedfield data={data} onDelete={handleDeleteProject} />
          </div>
        ))
      )}
        {
          showDeleteSuccessModal &&
          (
            <SuccessModal isOpen={showDeleteSuccessModal} p={`Your Data has been deleted `} onClose={()=>{
              setShowDeleteSuccessModal(false)
            }}/>
          )
        }
    </div>
  );
}
