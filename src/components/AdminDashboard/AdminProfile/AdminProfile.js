import React, { useContext, useState } from 'react'
import Breadcrum from './Breadcrum'
import AdminLayout from '../AdminLayout/AdminLayout'
import { IoCameraOutline } from 'react-icons/io5'
import ProfileForm from './ProfileForm'
import { UserContext } from '@/context/UserContext/GlobalProvider'

export default function AdminProfile() {
  const { user } = useContext(UserContext);
  console.log("User", user)
  const [formData, setFormData] = useState({
    fullName: '',
    designation: '',
    emailAddress: '',
    password: '',
    confirmPassword: ''
  });
  const [profilePhoto, setProfilePhoto] = useState(`/uploads/${user.email}.png`);
  const [coverPhoto, setCoverPhoto] = useState(`/uploads/cover_${user.email}.png`);

  async function uploadProfilePicture(profilePicture) {
    console.log('Uploading profile picture:', profilePicture);
    // Create a FormData object to send the file and name
    const formData = new FormData();
    console.log('Profile Picture:', user.email)
    formData.append('profile_picture', profilePicture);
    formData.append('profile_picture_name', user.email);

    try {
      // Make a POST request to the API endpoint
      const response = await fetch('/api/images_upload/profile', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload profile picture');
      }

      const data = await response.json();
      console.log('Profile picture uploaded:', data.profile_picture_path);
    } catch (error) {
      console.error('Error uploading profile picture:', error.message);
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
    console.log('Uploading profile picture:', profilePicture);
    // Create a FormData object to send the file and name
    const formData = new FormData();
    console.log('Profile Picture:', user.email)
    formData.append('profile_picture', profilePicture);
    formData.append('profile_picture_name', user.email);

    try {
      // Make a POST request to the API endpoint
      const response = await fetch('/api/images_upload/cover', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload profile picture');
      }

      const data = await response.json();
      console.log('Profile picture uploaded:', data.profile_picture_path);
    } catch (error) {
      console.error('Error uploading profile picture:', error.message);
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

  return (
    <AdminLayout>
      <div className="w-full py-8">
        <Breadcrum pageName="Profile" />
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default ">
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
                  className='rounded-full items-center '
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
            <div className="flex flex-col gap-y-4">
              <div> <h3 className="mb-1.5 text-2xl font-semibold text-black ">
                {formData.fullName}
              </h3>
                <p className="font-medium">{formData.designation}</p>
              </div>
              <div className='flex items-center justify-center'>
                <ProfileForm formData={formData} setFormData={setFormData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
