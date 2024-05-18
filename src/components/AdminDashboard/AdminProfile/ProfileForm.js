import React, { useState } from 'react';
import { FaRegEnvelope } from 'react-icons/fa6';
import { MdOutlinePersonOutline } from 'react-icons/md';

export default function ProfileForm({ setFormData, formData}) {
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className='w-11/12'>
      <form onSubmit={handleSubmit}>
        <div className="mb-5 flex flex-col gap-5 sm:flex-row">
          <div className=" ">
            <label className="mb-3 text-left block text-sm font-medium text-black" htmlFor="fullName">
              Full Name
            </label>
            <div className="relative flex items-center">
              <span className="absolute text-2xl left-4 top-3.5">
                <MdOutlinePersonOutline />
              </span>
              <input
                className="w-full placeholder:text-gray-400 rounded border border-stroke bg-gray py-3 pl-11 pr-4 text-black focus:border-blue-900 focus-visible:outline-none"
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="text-left">
            <label className="mb-3 block text-sm font-medium text-black">
              Designation
            </label>
            <input
              className="w-full placeholder:text-gray-400 rounded border border-stroke bg-gray px-4 py-3 text-black focus:border-blue-900 focus-visible:outline-none"
              type="text"
              name="designation"
              placeholder="Enter your designation"
              value={formData.designation}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex  gap-x-8 items-center mb-5">
        <div className="">
          <label className="mb-3 text-left block text-sm font-medium text-black" htmlFor="emailAddress">
            Email Address
          </label>
          <div className="flex items-start relative">
            <span className="absolute text-xl left-4 top-4">
              <FaRegEnvelope />
            </span>
            <input
              className="rounded placeholder:text-gray-400 border border-stroke bg-gray py-3 pl-11 pr-4 text-black focus:border-blue-900 focus-visible:outline-none"
              type="email"
              name="emailAddress"
              id="emailAddress"
              placeholder="Enter your email address"
              value={formData.emailAddress}
              onChange={handleChange}
            />
          </div>
        </div>

   
          <div className='text-left'>
            <label className="mb-3 block text-sm font-medium text-black" htmlFor="Password">
              Password
            </label>
            <input
              className=" placeholder:text-gray-400 rounded border border-stroke bg-gray px-4 py-3 text-black focus:border-blue-900 focus-visible:outline-none"
              type="password"
              name="password"
              id="Password"
              placeholder="******"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className=''>
            <label className="mb-3 text-left block text-sm font-medium text-black" htmlFor="ConfirmPassword">
              Confirm Password
            </label>
            <input
              className=" placeholder:text-gray-400 rounded border border-stroke bg-gray px-4 py-3 text-black focus:border-blue-900 focus-visible:outline-none"
              type="password"
              name="confirmPassword"
              id="ConfirmPassword"
              placeholder="******"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-lg"
            type="button"
            onClick={() => console.log('Cancelled')}
          >
            Cancel
          </button>
          <button
            className="flex justify-center rounded bg-blue-900 px-6 py-2 font-medium text-white hover:bg-opacity-90"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
