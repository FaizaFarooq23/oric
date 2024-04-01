import React, { useContext, useEffect, useState } from "react";
import DataDisplay from "../components/Common/DataDisplay";
import { UserContext } from "@/context/UserContext/GlobalProvider";
import axios from "axios";


function calculate_age(dob) {
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

export default function PersonalInfo() {
  const [myUser, setMyUser] = useState(null);
  const [personalInfo, setPersonalInfo] = useState(false);
  const [contactInfo, setContactInfo] = useState(false);
  const { user } = useContext(UserContext)

  useEffect(() => {
    console.log(user)
    if (user) {
      setMyUser(user);
    }
    const data = [
      {
        label: "Name",
        value: user.name,
      },
      {
        label: "Email",
        value: user.email,
      },
      {
        label: "Date of Birth",
        value: user.date_of_birth.split("T")[0],
      },
      {
        label: "Age",
        value: calculate_age(new Date(user.date_of_birth)),
      },
      {
        label: "CNIC",
        value: user.cnic,
      },


    ]

    setPersonalInfo(data);


    const contact_data = [

      {
        label: "Phone",
        value: user.contact_number,
      },
      {
        label: "Address",
        value: user.address,
      },
      {
        label: "Designation",
        value: user.designation,
      },
      {
        label: "Department",
        value: user.department,
      }
    ];

    setContactInfo(contact_data);
  }, [user]);






  // Update the contact info of the user
  useEffect(() => {
    const updateContactInfo = async () => {
      console.log("Contact Info", contactInfo);
      if (contactInfo) {
        try {
          const res = await axios.post(`/api/faculty/update_faculty_contact_info`, {
            username: user.username,
            contact_number: contactInfo[0].value,
            address: contactInfo[1].value,
            designation: contactInfo[2].value,
            department: contactInfo[3].value,
          });
          console.log(res);
        } catch (error) {
          console.error("Error updating contact information:", error);
        }
      }
    };
    if (contactInfo) {
      updateContactInfo();
    }
  }, [contactInfo]);

  return (
    <div className="">
      {personalInfo ? (
        <React.Fragment>
          <div className="flex gap-x-10">
            <DataDisplay data={personalInfo} updateInfo={setPersonalInfo} heading={"Personal Information"} />
            <DataDisplay data={contactInfo} updateInfo={setContactInfo} heading={""} isEditable={true} />
          </div>
        </React.Fragment>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
