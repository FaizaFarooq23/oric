import React from "react";
import Modal from "react-modal";
export default function SuccessModal({ isOpen}) {
  return (
    <>
    <Modal>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50  p-2 z-50">
 <div className="flex flex-row">
                    <div>
                        <h1 className="text-lg m-4  text-center font-semibold">
                            Select type of information you want to provide
                        </h1>
                    </div>
                </div>
        </div>
      )}
      </Modal>
    </>
  );
}
