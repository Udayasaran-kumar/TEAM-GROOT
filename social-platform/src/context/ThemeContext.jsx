import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Check if user has a theme preference in localStorage
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved theme in localStorage first
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      
      // Return true if saved theme is 'dark' or if no theme is saved but system prefers dark
      if (savedTheme) {
        return savedTheme === 'dark';
      } else {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    }
    return false;
  });

  // Update theme when darkMode state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      
      console.log("Theme updated:", darkMode ? "dark" : "light"); // Debug log
    }
  }, [darkMode]);

  // Explicitly defined toggle function
  const toggleTheme = () => {
    console.log("Toggling theme from", darkMode ? "dark" : "light", "to", !darkMode ? "dark" : "light"); // Debug log
    setDarkMode(prevMode => !prevMode);
  };

  const value = {
    darkMode,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
