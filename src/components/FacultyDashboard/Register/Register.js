import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import FormInput from "../../Common/FormInput";
import { useRouter } from "next/router";
import PhoneInputComponent from "../../Common/PhoneNumberInput";
import CnicInput from "../../Common/CNICInput";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [department, setDepartment] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [qualification, setQualification] = useState("");
  const [designation, setDesignation] = useState("");
  const [cnic, setCnic] = useState("");
  const [errors, setErrors] = useState({});

  const router = useRouter();
  const [cnicError, setCnicError] = useState("");
  const validateForm = async () => {
    const newErrors = {};
    let isValid = true;
    const requiredFields = [
      { field: "name", value: name, error: "Name is required" },
      { field: "email", value: email, error: "Email is required" },
      { field: "username", value: username, error: "Username is required" },
      { field: "password", value: password, error: "Password is required" },
      {
        field: "confirmPassword",
        value: confirmPassword,
        error: "Confirm Password is required",
      },
      {
        field: "phoneNumber",
        value: phoneNumber,
        error: "Phone Number is required",
      },
      {
        field: "department",
        value: department,
        error: "Department is required",
      },
      {
        field: "dateOfBirth",
        value: dateOfBirth,
        error: "Date of Birth is required",
      },
      {
        field: "qualification",
        value: qualification,
        error: "Qualification is required",
      },
      {
        field: "designation",
        value: designation,
        error: "Designation is required",
      },
      { field: "cnic", value: cnic, error: "CNIC is required" },
    ];

    requiredFields.forEach(({ field, value, error }) => {
      if (value.trim() === "") {
        newErrors[field] = error;
        isValid = false;
      }
    });

    if (cnic && !/^[0-9]{5}-[0-9]{7}-[0-9]{1}$/.test(cnic)) {
      newErrors.cnic = "Invalid CNIC format.";
      isValid = false;
    }

    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return false;
    }
    // try {
    //   const response = await axios.post("/api/faculty/fieldscheck", {
    //     name,
    //     username,
    //     email,
    //     cnic,
    //     phoneNumber,
    //   });
    //   const existingFields = response.data;

    //   Object.entries(existingFields).forEach(([field, exists]) => {
    //     if (exists) {
    //       newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    //       isValid = false;
    //     }
    //   });
    // } catch (error) {
    //   console.error("Error checking existing fields:", error);
    //   isValid = false;
    // }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    if (await validateForm()) {
      try {
        const response = await fetch("/api/register_faculty", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            phoneNumber,
            confirmPassword,
            username,
            department,
            dateOfBirth,
            qualification,
            designation,
            cnic,
          }),
        });

        if (response.ok) {
          // Registration successful
          console.log("Registration successful");
          alert("Registration successful");
          router.push("/");
        } else {
          // Handle registration error
          const data = await response.json();
          console.error("Registration failed:", data.error || "Unknown error");
          alert(`Registration failed: ${data.error || "Unknown error"}`);
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("Error during registration");
      }
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-between ">
      <div className=" flex flex-col items-center">
        <div className="flex justify-between items-center px-10 ">
          <div className="flex justify-center ">
            <img src="images/white-logo.png" alt="logo" className="h-24" />
          </div>
        </div>
        <div className="w-screen  pt-8 gap-x-16 border-t flex justify-between items-center pl-40 pr-20 pb-10">
          <div
            className={`w-[600px] bg-white py-10 px-10 flex flex-col gap-y-4 rounded-xl`}
          >
            <div className=" flex gap-x-4 gap-y-5">
              <div>
                <FormInput
                  label={"Name"}
                  value={name}
                  type={"text"}
                  setVal={setName}
                  required
                />

                {errors.name && (
                  <span className="text-red-500">{errors.name}</span>
                )}
              </div>
              <div>
                <FormInput
                  label={"Username"}
                  value={username}
                  type={"text"}
                  setVal={setUsername}
                />
                {errors.username && (
                  <span className="text-red-500">{errors.username}</span>
                )}
              </div>
            </div>
            <div className=" flex gap-x-4 gap-y-5">
              <div>
                <FormInput
                  label={"Password"}
                  value={password}
                  type={"password"}
                  setVal={setPassword}
                />
                {errors.password && (
                  <span className="text-red-500">{errors.password}</span>
                )}
              </div>
              <div>
                <FormInput
                  label={"Confirm Password"}
                  value={confirmPassword}
                  type={"password"}
                  setVal={setConfirmPassword}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500">{errors.confirmPassword}</span>
                )}
              </div>
            </div>
            <div className=" flex gap-x-4 gap-y-5">
              <div>
                <FormInput
                  label={"Email"}
                  value={email}
                  type={"email"}
                  setVal={setEmail}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email}</span>
                )}
              </div>
              <div>
                <FormInput
                  label={"Date of Birth"}
                  value={dateOfBirth}
                  type={"date"}
                  setVal={setDateOfBirth}
                />
                {errors.dateOfBirth && (
                  <span className="text-red-500">{errors.dateOfBirth}</span>
                )}
              </div>
            </div>
            <div className=" flex gap-x-4 gap-y-5">
              <div>
                <CnicInput
                  label={"CNIC"}
                  value={cnic}
                  onChange={setCnic}
                  error={cnicError}
                />
                {errors.cnic && (
                  <span className="text-red-500">{errors.cnic}</span>
                )}
              </div>
              <div>
                <PhoneInputComponent
                  label={"Phone Number"} // Pass the label as a prop
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  country={"pk"} // Specify the default country
                />
                {errors.phoneNumber && (
                  <span className="text-red-500">{errors.phoneNumber}</span>
                )}
              </div>
            </div>
            <div className=" flex gap-x-4 gap-y-5 ">
              <div>
                <FormInput
                  label={"Department"}
                  value={department}
                  type={"text"}
                  setVal={setDepartment}
                />
                {errors.department && (
                  <span className="text-red-500">{errors.department}</span>
                )}
              </div>
              <div>
                <FormInput
                  label={"Qualification"}
                  value={qualification}
                  type={"text"}
                  setVal={setQualification}
                />
                {errors.qualification && (
                  <span className="text-red-500">{errors.qualification}</span>
                )}
              </div>
              <div>
                <FormInput
                  label={"Designation"}
                  value={designation}
                  type={"text"}
                  setVal={setDesignation}
                />
                {errors.designation && (
                  <span className="text-red-500">{errors.designation}</span>
                )}
              </div>
            </div>
            <div className="w-full flex justify-center items-center mt-4">
              <button
                onClick={handleRegister}
                className="flex w-[60%] justify-center  border border-transparent bg-mustard-yellow py-2 px-4 text-sm font-medium text-blue-900 hover:bg-blue-900 focus:outline-none hover:text-white"
              >
                Register
              </button>
            </div>
          </div>

          <div className="w-[40%]">
            <div className="flex justify-end">
              <img
                src="images/illustration.png"
                alt="man"
                className="h-96 pt-16 "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
