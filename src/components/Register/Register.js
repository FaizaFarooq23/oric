import React, { useState } from "react";
import FormInput from "../Common/FormInput";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const handleRegister = async () => {
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
        console.error("Registration failed:", data.error);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Error during registration");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-between   ">
      <div className=" flex flex-col items-center">
        <div className="flex justify-between items-center px-12 ">
          <div className="flex justify-center ">
            <img src="images/white-logo.png" alt="logo" className="h-24  " />
          </div>
        </div>
        <div
          // style={{ backgroundImage: `url("images/")` }}
          className=" w-screen  pt-8 gap-x-16 border-t flex justify-between items-center pl-40 pr-20  "
        >
          <div
            className={`w-[600px]  bg-white py-10 px-10 flex flex-col gap-y-4 rounded-xl `}
          >
            <div className=" flex gap-x-4 gap-y-5">
              <FormInput
                lable={"Name"}
                value={name}
                type={"text"}
                setVal={setName}
              />
              <FormInput
                lable={"Username"}
                value={username}
                type={"text"}
                setVal={setUsername}
              />
            </div>
            <div className=" flex gap-x-4 gap-y-5">
              <FormInput
                lable={"Password"}
                value={password}
                type={"password"}
                setVal={setPassword}
              />
              <FormInput
                lable={"Confirm Password"}
                value={confirmPassword}
                type={"password"}
                setVal={setConfirmPassword}
              />
            </div>
            <div className=" flex gap-x-4 gap-y-5">
              <FormInput
                lable={"Email"}
                value={email}
                type={"email"}
                setVal={setEmail}
              />
              <FormInput
                lable={"Date of Birth"}
                value={dateOfBirth}
                type={"date"}
                setVal={setDateOfBirth}
              />
            </div>
            <div className=" flex gap-x-4 gap-y-5">
              <FormInput
                lable={"CNIC"}
                value={cnic}
                type={"text"}
                setVal={setCnic}
              />
              <FormInput
                lable={"Phone Number"}
                value={phoneNumber}
                type={"text"}
                setVal={setPhoneNumber}
              />
            </div>
            <div className=" flex gap-x-4 gap-y-5 ">
              <FormInput
                lable={"Department"}
                value={department}
                type={"text"}
                setVal={setDepartment}
              />
              <FormInput
                lable={"Qualification"}
                value={qualification}
                type={"text"}
                setVal={setQualification}
              />
              <FormInput
                lable={"Designation"}
                value={designation}
                type={"text"}
                setVal={setDesignation}
              />
            </div>

            <div className="w-full flex justify-center items-center mt-10">
              <button
                onClick={handleRegister}
                className="flex w-[60%] justify-center border border-transparent
            bg-mustard-yellow py-2 px-4 text-sm font-medium text-blue-900 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
