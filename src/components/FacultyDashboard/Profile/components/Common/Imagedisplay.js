import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTimes, FaDownload } from 'react-icons/fa';



const ImageDisplay = ({ title, data, gridClassName = '', divClassName = '' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <div>
        <h1 className='text-blue-900 font-bold text-xl py-2 border-black'>{title}</h1>
      </div>
      <div className={`grid gap-y-8 gap-x-16 py-6 ${gridClassName}`}>
        {data.map((item, index) => (
          <div key={index} className={`grid gap-x-10 w-full`}>
            <span className="text-black text-base font-semibold w-full">{item.label}</span>
            {item.value && (
              <img
                src={item.value}
                alt={item.label}
                className={`border-blue-950 max-w-full max-h-96 cursor-pointer ${divClassName}`}
                onClick={() => openModal(item.value)}
              />
            )}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          className="flex items-center justify-center h-screen w-screen bg-black bg-opacity-75"
        >
          <div className="relative bg-white p-4 rounded shadow-lg max-w-3xl max-h-[80vh] overflow-auto">
            <FaTimes
              className="absolute top-2 right-2 text-red-500 text-2xl cursor-pointer"
              onClick={closeModal}
            />
            {selectedImage && (
              <div className="flex flex-col items-center">
                <img src={selectedImage} alt="Selected" className="max-w-full max-h-[70vh] mb-4" />
                <a
                  href={selectedImage}
                  download
                  className="flex items-center text-blue-500 font-semibold"
                >
                  <FaDownload className="mr-2" /> Download Image
                </a>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ImageDisplay;
