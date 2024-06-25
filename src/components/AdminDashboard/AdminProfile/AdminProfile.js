import React, { useContext, useState } from "react";
import Breadcrum from "./Breadcrum";
import AdminLayout from "../AdminLayout/AdminLayout";
import { IoCameraOutline } from "react-icons/io5";
import ProfileForm from "./ProfileForm";
import { UserContext } from "@/context/UserContext/GlobalProvider";
import axios from "axios";

export default function AdminProfile() {
  const { user } = useContext(UserContext);
  const [profilePhoto, setProfilePhoto] = useState(`/uploads/${user.email}.png`);
console.log(user.email);
  const [coverPhoto, setCoverPhoto] = useState(`/uploads/cover_${user.email}.png`);

  const initialProfile = {
    oldUsername: user.username,
    username: user.username,
    designation: user.designation,
    email: user.email,
    password: user.password,
    confirmPassword: user.password,
  };

  const [updatedProfile, setUpdatedProfile] = useState(initialProfile);

  async function uploadProfilePicture(profilePicture) {
    console.log("Uploading profile picture:", profilePicture);

    const formData = new FormData();
    formData.append("profile_picture", profilePicture);
    formData.append('profile_picture_name', user.email);

    try {
      const response = await fetch("/api/images_upload/profile", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload profile picture");
      }

      const data = await response.json();
      console.log("Profile picture uploaded:", data.profile_picture_path);
    } catch (error) {
      console.error("Error uploading profile picture:", error.message);
    }
  }

  const handleProfilePhotoUpload = async (event) => {
    const selectedImage = event.target.files && event.target.files[0];
    await uploadProfilePicture(selectedImage);
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  async function uploadCoverPicture(profilePicture) {
    console.log("Uploading cover picture:", profilePicture);

    const formData = new FormData();
    formData.append("cover_picture", profilePicture);

    try {
      const response = await fetch("/api/images_upload/cover", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload cover picture");
      }

      const data = await response.json();
      console.log("Cover picture uploaded:", data.cover_picture_path);
    } catch (error) {
      console.error("Error uploading cover picture:", error.message);
    }
  }

  const handleCoverPhotoUpload = async (event) => {
    const selectedImage = event.target.files && event.target.files[0];
    await uploadCoverPicture(selectedImage);
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverPhoto(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (updatedProfile.password === "") {
        alert("Password cannot be empty")
        return
      } else if (updatedProfile.password !== updatedProfile.confirmPassword) {
        alert("Passwords do not match")
        return
      }

      const res = await axios.post(`/api/admin/update_admin_profile`, updatedProfile);
      console.log(res);
      alert("Profile updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const rejectChange = () => {
    setUpdatedProfile(initialProfile);
    alert("Changes Rejected");
  };

  return (
    <AdminLayout>
      <div className="w-full py-8">
        <Breadcrum pageName="Profile" />
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default">
          <div className="relative h-35 md:h-65">
            <img
              src={coverPhoto}
              alt="profile cover"
              className="h-[260px] w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/profile.png";
              }}
            />
            <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
              <label
                htmlFor="cover"
                className="flex cursor-pointer items-center justify-center gap-2 rounded bg-blue-900 px-2 py-1 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
              >
                <input
                  type="file"
                  name="cover"
                  id="cover"
                  className="sr-only"
                  onChange={handleCoverPhotoUpload}
                />
                <span>
                  <IoCameraOutline />
                </span>
                <span>Edit</span>
              </label>
            </div>
          </div>
          <div className="px-4 pb-6 text-center ">
            <div className="relative z-10  mx-auto w-[12%] -mt-16   rounded-full bg-white/20 p-1 backdrop-blur   sm:p-3">
              <div className="relative drop-shadow-2 rounded-full">
                <img
                  src={profilePhoto}
                  className="rounded-full items-center w-28 h-28"
                  alt="profile"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/profile.png";
                  }}
                />
                <label
                  htmlFor="profile"
                  className=" absolute top-[70%]  bottom-0 right-0 flex w-8 h-8 cursor-pointer items-center justify-center rounded-full bg-blue-900 text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                >
                  <IoCameraOutline />
                  <input
                    type="file"
                    name="profile"
                    id="profile"
                    className="sr-only"
                    onChange={handleProfilePhotoUpload}
                  />
                </label>
              </div>
            </div>

            <div className="flex items-center justify-center pt-8">
              <ProfileForm
                fullName={updatedProfile.username}
                emailAddress={updatedProfile.email}
                password={updatedProfile.password}
                designation={updatedProfile.designation}
                handleCancelChange={rejectChange}
                handleChange={handleInputChange}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
