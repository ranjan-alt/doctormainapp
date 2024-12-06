import React from "react";

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
}) => {
  if (!isOpen) return null; // Don't render if modal is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
        <p className="text-gray-500 mb-6">{message}</p>

        <div className="flex justify-between">
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
          >
            {confirmText || "Yes, Delete"}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none"
          >
            {cancelText || "No, Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
