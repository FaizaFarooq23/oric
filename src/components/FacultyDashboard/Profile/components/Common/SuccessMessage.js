import React, { useEffect } from "react";
import { BsCheckCircle } from 'react-icons/bs';
import Modal from "react-modal";

function SavedSuccessfullyModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <Modal isOpen={isOpen}>
      <div className="flex flex-row">
        <div>
          <h1 className="text-lg m-4 text-center font-semibold">
            Your Data Has Been Saved Successfully
          </h1>
          <div className="flex flex-row gap-x-10 justify-between m-4 items-center py-4">
            <button onClick={onClose}>
              <BsCheckCircle />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default SavedSuccessfullyModal;
