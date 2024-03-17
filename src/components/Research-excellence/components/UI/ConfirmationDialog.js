import React from 'react';

export default function ConfirmationDialog({ isOpen, onCancel, onConfirm }) {
  return (
    <div className={`modal ${isOpen ? 'is-open' : ''}`}>
      <div className="modal-overlay" onClick={onCancel}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Confirm Deletion</h3>
          <button className="close-button" onClick={onCancel}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete this research project?</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
