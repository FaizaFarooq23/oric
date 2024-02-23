import React from "react";
import ProfileHeader from "./components/ProfileHeader";
import Tabs from "./components/Tabs";


export default function Profile({username, designation, email,contactNumber ,handleProfilePhotoUpload,handleCoverPhotoUpload, profilePhoto, coverPhoto, nationality }) {
  return (
    <div className="flex flex-col justify-between px-10 py-2 ">
      <div>
      <ProfileHeader username={username} designation={designation} email={email} contactNumber={contactNumber}
      nationality={nationality}
      handleCoverPhotoUpload={handleCoverPhotoUpload}
      handleProfilePhotoUpload={handleProfilePhotoUpload}
      profilePhoto={profilePhoto} coverPhoto={coverPhoto} 
      />
      </div>
      <div>
      <Tabs />

</div>
    </div>
  );
}
