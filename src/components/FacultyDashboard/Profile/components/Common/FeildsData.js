import React from 'react';


const DataDisplayModal = ({ title, data, gridClassName = '', divClassName = ''}) => {
  return (
      <div className=''>
        <div>
          <h1 className='text-blue-900 font-serif font-bold text-xl py-2  border-black'>{title}</h1>
        </div>
        <div className={`grid gap-y-8 gap-x-16 py-6 ${gridClassName}`}>
          {data.map((item, index) => (
            <div key={index} className={`grid ${divClassName} grid-cols-2  gap-x-10 w-full `}> 
              <span className="text-black text-base font-semibold ">{item.label}</span>
              <span className="text-black text-base font-semibold ">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
   
  );
}

export default DataDisplayModal;
