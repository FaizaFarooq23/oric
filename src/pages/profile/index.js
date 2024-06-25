import AdminProfile from '@/components/AdminDashboard/AdminProfile/AdminProfile';
import Baselayout from '@/components/FacultyDashboard/Baselayout/Baselayout'
import Profile from '@/components/FacultyDashboard/Profile/Profile';
import { UserContext } from '@/context/UserContext/GlobalProvider';
import React, { useContext, useEffect, useState } from 'react'

export default function Index() {
  const [profilePhoto, setProfilePhoto] = useState('images/profile.png');
  const [coverPhoto, setCoverPhoto] = useState('images/cover.png');
  const { user } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('User:', user);
    if (user && user.email === 'admin@email.com') {
      setIsAdmin(true);
      setLoading(false);
    } else if (user) {
      setLoading(false);
    }
  }, [user]);


  console.log(user);

  // Function to handle the file upload
  async function uploadProfilePicture(profilePicture) {
    console.log('Uploading profile picture:', profilePicture);
    console.log('Email of the user is', user.email)
    // Create a FormData object to send the file and name
    const formData = new FormData();
    formData.append('profile_picture', profilePicture);
    formData.append('profile_picture_name', user.email);

    try {
      // Make a POST request to the API endpoint
      const response = await fetch('/api/upload-profile-picture', {
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
    alert('Profile photo uploaded')
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

  const handleCoverPhotoUpload = (event) => {
    const selectedImage = event.target.files && event.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverPhoto(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  }

  if (loading) {
    return <div className='h-screen w-screen flex justify-center items-center'>
      <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-900'></div>  
    </div>;
  }

  return (
    <>
      {!isAdmin ? (
        <Baselayout>
          {user &&
            <Profile profilePhoto={profilePhoto} coverPhoto={coverPhoto} handleProfilePhotoUpload={handleProfilePhotoUpload} handleCoverPhotoUpload={handleCoverPhotoUpload}
              username={user.name}
              designation={user.designation}
              email={user.email}
              contactNumber={user.contact_number}
              nationality={user.department}
            />
          }
        </Baselayout>
      ) : (
        <AdminProfile />
      )}
    </>
  );
}
