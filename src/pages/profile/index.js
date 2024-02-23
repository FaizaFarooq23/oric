import Baselayout from '@/components/Baselayout/Baselayout'
import Profile from '@/components/Profile/Profile'
import { UserContext } from '@/context/UserContext/GlobalProvider';
import React, { useContext, useState } from 'react'

export default function Index() {
  const [profilePhoto, setProfilePhoto] = useState('images/profile.png');
  const [coverPhoto, setCoverPhoto] = useState('images/cover.png');
  const {user} = useContext(UserContext);
  

  console.log(user);

  const handleProfilePhotoUpload= (event) => {
    const selectedImage = event.target.files && event.target.files[0];
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

  return (
    <Baselayout>
    {user &&
      <Profile profilePhoto={profilePhoto} coverPhoto={coverPhoto} handleProfilePhotoUpload={handleProfilePhotoUpload}  handleCoverPhotoUpload={handleCoverPhotoUpload}
      username={user.name}
      designation={user.designation}
      email={user.email}
      contactNumber={user.contact_number}
      nationality={user.department}
      />
    }
    </Baselayout>
  );
}
