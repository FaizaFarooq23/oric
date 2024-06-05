import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { RiCheckLine } from 'react-icons/ri';

export default function SuccessModal({ isOpen, onClose, p }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose(); // Close the modal after 3 seconds
      }, 2000);

      return () => clearTimeout(timer); // Clear the timer on component unmount
    }
  }, [isOpen, onClose]);

  const animationStyles = `
    @keyframes blink {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }

    .checkmark-animation {
      animation: blink 1s infinite;
    }
  `;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 p-2 z-50"
      overlayClassName="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 p-2 z-50"
    >
      <style>{animationStyles}</style>
      <div className="flex flex-row items-center bg-white rounded-lg p-4">
        <div className="bg-white rounded-lg p-6 flex flex-row items-center">
          <h1 className="text-lg font-semibold text-center">{p}</h1>
          <span className="checkmark-animation">
            <RiCheckLine className="text-green-500 text-4xl mb-4" />
          </span>
        </div>
      </div>
    </Modal>
  );
}
