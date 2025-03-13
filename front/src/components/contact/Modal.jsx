// Modal.jsx
import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50 transition"
        onClick={onClose}
      ></div>
      {/* Contenido del Modal */}
      <div className="relative bg-iBlue rounded-lg shadow-lg p-6 w-[660px] h-[] animate-fadeIn">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-white text-xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
