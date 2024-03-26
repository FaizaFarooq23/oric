import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50  p-2 z-50">
          <div className="bg-white p-4 rounded-md">
            {children}
        
          </div>
        </div>
      )}
    </>
  );
}
