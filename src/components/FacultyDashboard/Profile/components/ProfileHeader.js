import React from "react";
import { FaEnvelope, FaPencil, FaPhone } from "react-icons/fa6";
import { IoIosCamera } from "react-icons/io";

export default function ProfileHeader({
  username,
  designation,
  email,
  contactNumber,
  nationality,
  handleProfilePhotoUpload,
  handleCoverPhotoUpload,
  profilePhoto,
  coverPhoto,
}) {
  return (
    <div className="rounded-md shadow-md">
      <div
        style={{ backgroundImage: `url("${coverPhoto}")` }}
        className="rounded-md bg-no-repeat bg-cover flex justify-end h-32"
      >
        <div className="flex w-8 h-8 justify-center items-center bg-white rounded-full my-4 mx-8">
          <label htmlFor="uploadInput" className="cursor-pointer">
            <IoIosCamera className="h-6 w-6 text-blue-900" />
            <input
              id="uploadInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverPhotoUpload}
            />
          </label>
        </div>
      </div>
      <div className="-mt-14 px-8 z-10 ">
        {profilePhoto && (
          <label htmlFor="profilePhotoInput" className="cursor-pointer">
            <img
              src={profilePhoto}
              className="rounded-full border-2 border-white h-28 w-28 cursor-pointer"
              alt="profile"
              onClick={handleProfilePhotoUpload}
            />
            <input
              id="profilePhotoInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePhotoUpload}
            />
          </label>
        )}
      </div>

      <div className=" w-full flex justify-between items-center pt-2 pb-4  px-8  text-gray-500 text-sm">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold text-blue-900 pl-4">
              {username}
            </span>
            {/* <FaPencil className="text-base text-blue-900" /> */}
          </div>
          <div className="w-full flex  items-center justify-between pl-4">
            <div className="flex flex-col items-start ">
              <span className="">{designation}</span>
              <span>{nationality}</span>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-inline items-center gap-x-2">
                <FaEnvelope className="" />
                <span className="">{email}</span>
              </div>
              <div className="flex flex-inline items-center gap-x-2">
                <FaPhone className="" />
                <span>{contactNumber}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
