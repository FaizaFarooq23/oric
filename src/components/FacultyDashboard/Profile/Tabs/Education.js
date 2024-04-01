import React, { useEffect, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import EducationFormModal from '../components/Education/EducationForm';
import { useModal } from 'react-simple-modal-provider';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import EducationField from '../components/Common/EducationField';

export default function Education() {
  const { open: openModal } = useModal("EducationFormModal");
  const [isFormVisible, setFormVisibility] = useState(false);
  const [educationalData, setEducationalData] = useState([]); // [{},{}
  const {data: session} = useSession();


  const fetchEducationalData = async () => {
    try{
      const res = await axios.get(`/api/faculty/education/get_faculty_education` , {
        params: {
          account_number: session.user.account_number,
        }
      });

      console.log(res)

      setEducationalData(res.data);
    }

    catch(error){
      console.error("Error fetching personal information:", error);
    }
  }

  useEffect(() => {
    // fetch data from db
    if(session){
      fetchEducationalData();
    }
    // setEducationalData(data)
  }, [session]);

  // const data = [
  //   {
  //     label: "Degree",
  //     value: "BS",
  //   },
  //   {
  //     label: "Field of Study",
  //     value: "MBBS",
  //   },
  //   {
  //     label: "Institute",
  //     value: "NED University",
  //   },
  //   {
  //     label: "Registration Number",
  //     value: "1192983982398271",
  //   },
  //   {
  //     label: "Cgpa",
  //     value: "3.8",
  //   },
  //   {
  //     label: "Graduation Year",
  //     value: "2017",
  //   },
  // ];

  



  return (
    <div >
      <div className='flex justify-end items-center gap-x-8 text-2xl'>
        <FiPlusCircle className='text-blue-900 cursor-pointer' onClick={openModal} />
        <RiDeleteBin6Line className='text-red-600' />
      </div>

      {isFormVisible && (
        <EducationFormModal />
      )}
      {educationalData.map((data, index) => (
      <EducationField key={index} data={data} />
      ))}
    </div>
  );
}
