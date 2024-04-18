import React, { useState } from 'react'
import Breadcrum from './Breadcrum'
import AdminLayout from '../AdminLayout/AdminLayout'
import { IoCameraOutline } from 'react-icons/io5'
import ProfileForm from './ProfileForm'

export default function AdminProfile() {
  const [formData, setFormData] = useState({
    fullName: '',
    designation: '',
    emailAddress: '',
    password: '',
    confirmPassword: ''
  });
  return (
   <AdminLayout>
   <div className="w-full py-8">
    <Breadcrum pageName="Profile" />
    <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default ">
      <div className="relative h-35 md:h-65">
        <img
          src={"/images/profile.png"}
          alt="profile cover"
          className="h-[260px] w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
      
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
              src={"/images/profile.png"}
              className='rounded-full items-center '
              alt="profile"
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
       <ProfileForm formData={formData} setFormData={setFormData}/>
       </div>
        </div>
      </div>
    </div>
  </div>
  </AdminLayout>
  )
}
