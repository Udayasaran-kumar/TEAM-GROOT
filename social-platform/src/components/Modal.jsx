import React, { useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scrolling on the body when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
      // Restore scrolling when modal is closed
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className={`${
          darkMode 
            ? 'bg-gray-800 text-gray-100' 
            : 'bg-white text-gray-800'
        } rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto transition-colors duration-200`}
      >
        <div className={`flex justify-between items-center border-b p-4 ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h3 className={`font-semibold text-lg ${
            darkMode ? 'text-gray-100' : 'text-gray-800'
          }`}>{title}</h3>
          <button 
            onClick={onClose}
            className={`p-1 rounded-full ${
              darkMode 
                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            } transition-colors`}
          >
            <FaTimes />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
