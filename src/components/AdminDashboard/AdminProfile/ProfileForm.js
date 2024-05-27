import React from 'react';
import { FaRegEnvelope } from 'react-icons/fa6';
import { MdOutlinePersonOutline } from 'react-icons/md';

export default function ProfileForm({
  fullName,
  designation,
  emailAddress,
  password,
  confirmPassword,
  handleChange,
  handleCancelChange,
  handleSubmit,
}) {
  return (
    <div className="w-11/12">
      <form onSubmit={handleSubmit}>
        <div className="mb-5 flex flex-col gap-5 sm:flex-row">
          <div className=" ">
            <label
              className="mb-3 text-left block text-sm font-medium text-black"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <div className="relative flex items-center">
              <span className="absolute text-2xl left-4 top-3.5">
                <MdOutlinePersonOutline />
              </span>
              <input
                className="w-full placeholder:text-gray-400 rounded border border-stroke bg-gray py-3 pl-11 pr-4 text-black focus:border-blue-900 focus-visible:outline-none"
                type="text"
                name="username"
                id="fullName"
                placeholder="Enter your full name"
                value={fullName}
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
              value={designation}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex  gap-x-8 items-center mb-5">
          <div className="">
            <label
              className="mb-3 text-left block text-sm font-medium text-black"
              htmlFor="emailAddress"
            >
              Email Address
            </label>
            <div className="flex items-start relative">
              <span className="absolute text-xl left-4 top-4">
                <FaRegEnvelope />
              </span>
              <input
                className="rounded placeholder:text-gray-400 border border-stroke bg-gray py-3 pl-11 pr-4 text-black focus:border-blue-900 focus-visible:outline-none"
                type="email"
                name="email"
                id="emailAddress"
                placeholder="Enter your email address"
                value={emailAddress}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="text-left">
            <label
              className="mb-3 block text-sm font-medium text-black"
              htmlFor="Password"
            >
              Password
            </label>
            <input
              className=" placeholder:text-gray-400 rounded border border-stroke bg-gray px-4 py-3 text-black focus:border-blue-900 focus-visible:outline-none"
              type="password"
              name="password"
              id="Password"
              placeholder="******"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label
              className="mb-3 text-left block text-sm font-medium text-black"
              htmlFor="ConfirmPassword"
            >
              Confirm Password
            </label>
            <input
              className=" placeholder:text-gray-400 rounded border border-stroke bg-gray px-4 py-3 text-black focus:border-blue-900 focus-visible:outline-none"
              type="password"
              name="confirmPassword"
              id="ConfirmPassword"
              placeholder="******"
              value={confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 py-4">
          <button
            className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-lg"
            type="button"
            onClick={handleCancelChange}
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
