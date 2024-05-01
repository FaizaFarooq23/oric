import React, { useEffect, useState } from "react";
import Dropdown from "../Common/Dropdown";
import Modal, { useModalState } from "react-simple-modal-provider";
import InputField from "../Common/InputField";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import SuccessModal from "@/components/FacultyDashboard/ResearchExcellence/components/UI/SuccessMessage";

export default function EducationFormModal({ children }) {
  const [isOpen, setOpen] = useModalState();
  const {data: session} = useSession();
  const [showSuccessModal, setshowSuccessSuccessModal] = useState(false); // State to control SuccessModal visibility
  useEffect(() => {
    console.log(session)
  }, [session]);

  
  const dropdown = [
    {
      label: "Degree",
      option: ["BS", "MS", "Mphil", "Phd"],
      selectedValue: "",
    },
    {
      label: "Field of Study",
      option: ["MBBS", "BDS", "BBA", "BCS", "BS", "MS", "Mphil", "Phd"],
      selectedValue: "",
    },
    {
      label: "Institute",
      option: [
        "NED University",
        "Aga Khan University",
        "Iqra University",
        "Karachi University",
        "LUMS",
        "Nust",
        "FAST",
        "IBA",
      ],
      selectedValue: "",
    },
  ];

  const [degree, setDegree] = useState("BS");
  const [fieldOfStudy, setFieldOfStudy] = useState("MBBS");
  const [institute, setInstitute] = useState("NED University");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [errors, setErrors] = useState({});

  const handleDegreeChange = (e) => {
    setDegree(e.target.value);
  };

  const handleFieldOfStudyChange = (e) => {
    setFieldOfStudy(e.target.value);
  };

  const handleInstituteChange = (e) => {
    setInstitute(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (degree.trim()==="") {
      newErrors.degree = "Degree is required";
      isValid = false;
    }

    if (!fieldOfStudy.trim()) {
      newErrors.fieldOfStudy = "Field of Study is required";
      isValid = false;
    }

    if (!institute.trim()) {
      newErrors.institute = "Institute is required";
      isValid = false;
    }

    if (!registrationNumber.trim()) {
      newErrors.registrationNumber = "Registration Number is required";
      isValid = false;
    }

    if (!cgpa.trim()) {
      newErrors.cgpa = "CGPA is required";
      isValid = false;
    }

    if (!graduationYear.trim()) {
      newErrors.graduationYear = "Graduation Year is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  const resetForm = () => {
    setDegree("BS");
    setFieldOfStudy("MBBS");
    setInstitute("NED University");
    setRegistrationNumber("");
    setCgpa("");
    setGraduationYear("");
    setErrors({});
  };
  const handleSubmit = async () => {
    try {
      if (!validateForm()) {
        alert("Please fill all the fields");
        return;
      }
      if (session.user.account_number === "") {
        alert("Login to continue");
        signOut();
        return;
      }
      const res = await axios.post(`/api/faculty/education/insert_faculty_education`, {
        account_number: session.user.account_number,
        registration_number: registrationNumber,
        degree: degree,
        institute: institute,
        cgpa: parseFloat(cgpa),
        year: new Date(graduationYear),
        field_of_study: fieldOfStudy,
      });
  
      setOpen(false);
      console.log(res);
      resetForm();
      setshowSuccessSuccessModal(true); // Show success modal after successful form submission
    } catch (error) {
      console.error("Error inserting educational information:", error);
    }
  }
  


  return (
    <>
    <Modal
      id={"EducationFormModal"}
      consumer={children}
      isOpen={isOpen}
      setOpen={setOpen}
    >
      <div className=" flex gap-y-8 flex-col bg-white shadow-lg rounded-md px-10 py-8 ">
        <div className="grid grid-cols-2 gap-y-8 gap-x-16 ">
          <div>
          <Dropdown
            label={"Degree"}
            dropdownOptions={dropdown[0].option}
            value={degree}
            handleOptionChange={handleDegreeChange}
            required
          />
           {errors.degree && (
              <span className="text-red-500">{errors.degree}</span>
            )}
</div>
<div>
          <Dropdown
            label={"Field of Study"}
            dropdownOptions={dropdown[1].option}
            value={fieldOfStudy}
            handleOptionChange={handleFieldOfStudyChange}
            required
          />
 {errors.fieldOfStudy && (
              <span className="text-red-500">{errors.fieldOfStudy}</span>
            )}
            </div>
            <div>
  <Dropdown
    label={"Field of Study"}
    dropdownOptions={dropdown[1].option}
    value={fieldOfStudy}
    handleOptionChange={handleFieldOfStudyChange}
    required
  />
  {errors.fieldOfStudy && (
    <span className="text-red-500">{errors.fieldOfStudy}</span>
  )}
</div>

<div>
  <Dropdown
    label={"Institute"}
    dropdownOptions={dropdown[2].option}
    value={institute}
    handleOptionChange={handleInstituteChange}
    required
  />
  {errors.institute && (
    <span className="text-red-500">{errors.institute}</span>
  )}
</div>

<div>
  <InputField
    label={"Registration Number"}
    value={registrationNumber}
    setVal={setRegistrationNumber}
    required
  />
  {errors.registrationNumber && (
    <span className="text-red-500">{errors.registrationNumber}</span>
  )}
</div>

<div>
  <InputField
    label={"CGPA"}
    value={cgpa}
    setVal={setCgpa}
    required
  />
  {errors.cgpa && (
    <span className="text-red-500">{errors.cgpa}</span>
  )}
</div>

<div>
  <InputField 
    label={"Graduation Year"}
    value={graduationYear}
    setVal={setGraduationYear}
    required
    type={'date'}
  />
  {errors.graduationYear && (
    <span className="text-red-500">{errors.graduationYear}</span>
  )}
</div>


        </div>
        <div className="flex items-center justify-center w-full">
          <button onClick= {handleSubmit} className="bg-blue-900 text-white px-4 py-2 rounded-md mt-4 w-1/4">
            Save
          </button>
        </div>
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
