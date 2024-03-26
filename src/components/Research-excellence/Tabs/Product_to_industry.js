import React, { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useModal } from 'react-simple-modal-provider';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Product_to_Industryfield from '../Forms/ResearchProducts/ProductDisplayedFeilds';
import Product_to_IndustryForm from '../Forms/Product_to_Industry/Product_to_industryForm';
import Product_to_IndustryFeillds from '../Forms/Product_to_Industry/Product_to_IndustryFeild';
export default function Product_to_IndustryTab() {
  const { open: openModal } = useModal("Product_to_IndustryFormModal");
  const [isFormVisible, setFormVisibility] = useState(false);
  const {data: session} = useSession();
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
 
const handleDeleteProject = async (id) => {
  try {
    await axios.delete(`/api/Product_to_Industry/delete_Product?id=${id}`);
    console.log('Project deleted successfully');
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
      {Product_to_IndustryData.map((data, index) => (
        <div className= "flex flex-col "key={index}>
          <Product_to_IndustryFeillds data={data} onDelete={handleDeleteProject} />
        
        </div>
      ))}
    </div>
  );
}
