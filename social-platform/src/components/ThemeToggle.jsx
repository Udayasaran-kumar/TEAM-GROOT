import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleTheme}
        className={`p-3 rounded-full shadow-lg ${
          darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-800'
        }`}
      >
        {darkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
      </button>
      <p className="mt-2 text-center text-xs bg-white dark:bg-gray-800 p-1 rounded shadow text-gray-800 dark:text-gray-200">
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </p>
    </div>
  );
};

export default ThemeToggle;
