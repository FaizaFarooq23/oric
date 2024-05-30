import React from 'react';

const ImageDisplay = ({ title, data, gridClassName = '', divClassName = '' }) => {
  return (
    <div className=''>
      <div>
        <h1 className='text-blue-900 font-serif  font-bold text-xl py-2 border-black'>{title}</h1>
      </div>
      <div className={`grid gap-y-8 gap-x-16 py-6 ${gridClassName}`}>
        {data.map((item, index) => (
          <div key={index} className={`grid gap-x-10 w-full `}>
            <span className="text-black text-base font-semibold w-full">{item.label}</span>
            {item.value && (
              <img src={item.value} alt={item.label} className={`border-blue-950 max-w-full max-h-96 ${divClassName}`}/>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageDisplay;
