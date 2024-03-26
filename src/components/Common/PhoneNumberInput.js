import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function PhoneInputComponent({ label, value, onChange, country }) {
  return (
    <div className='w-full'>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <PhoneInput
        country={country}
        value={value}
        onChange={onChange}
        inputStyle={{
          width: '100%',
          height: '2.5rem', // Adjust height as needed
          fontSize: '0.875rem', // Adjust font size as needed
          border: '1px solid #D1D5DB', // Adjust border as needed
          borderRadius: '0.375rem', // Adjust border radius as needed
          padding_left: '40px', // Adjust padding as needed
          background:'#F3F4F6'


          
        }}
        className="rounded-lg 
        bg-gray-100  text-black placeholder-gray-500 focus:z-10 focus:border-mustard-yellow  focus:ring-slate-100  focus:outline-none  sm:text-sm"
      />
    </div>
  );
}
