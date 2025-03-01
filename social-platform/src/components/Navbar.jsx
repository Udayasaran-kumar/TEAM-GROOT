import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch, FaBell, FaUser, FaCog, FaMoon, FaSun, FaHome, FaCompass, FaUsers } from "react-icons/fa";
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  
  // Debug log for theme state
  useEffect(() => {
    console.log("Navbar rendered with dark mode:", darkMode);
  }, [darkMode]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    // Implement search functionality here
  };

  const handleToggleTheme = () => {
    console.log("Theme toggle button clicked"); // Debug log
    toggleTheme();
    setShowProfileMenu(false); // Close the menu after toggling
  };

  // Active link style - now with dark mode support
  const activeStyle = "bg-blue-700 text-white dark:bg-blue-800";
  const inactiveStyle = "hover:bg-blue-700 text-white dark:hover:bg-blue-800";

  return (
    <nav className={`${darkMode ? 'dark bg-gray-800' : 'bg-blue-600'} text-white shadow-md sticky top-0 z-10 transition-colors duration-200`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left side - Logo and Home */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold mr-6">CollabHub</Link>
          
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-md transition ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <div className="flex items-center">
              <FaHome className="mr-1" /> Home
            </div>
          </NavLink>
        </div>
        
        {/* Center - Search Bar */}
        <div className="flex-grow mx-8 hidden md:block">
          <form onSubmit={handleSearch} className="relative">
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts..." 
              className="w-full px-3 py-2 text-gray-800 dark:text-gray-200 dark:bg-gray-700 rounded-full pl-10"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" />
          </form>
        </div>
        
        {/* Right - Navigation Links and Profile */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <NavLink 
            to="/explore" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-md transition hidden md:flex items-center ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <FaCompass className="mr-1" /> Explore
          </NavLink>
          
          <NavLink 
            to="/collaborate" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-md transition hidden md:flex items-center ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <FaUsers className="mr-1" /> Collaborate
          </NavLink>
          
          {/* Notifications Icon */}
          <button className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-gray-700 transition relative">
            <FaBell />
            <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
          </button>
          
          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)} 
              className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-gray-700 transition flex items-center"
            >
              <FaUser className="mr-1" />
              <span className="hidden md:inline">Profile</span>
            </button>
            
            {showProfileMenu && (
              <div className={`absolute right-0 mt-2 w-48 ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} rounded-md shadow-lg py-1 z-20 transition-colors duration-200`}>
                <NavLink 
                  to="/profile" 
                  className={({ isActive }) => 
                    `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center ${
                      isActive ? (darkMode ? "bg-gray-700 text-blue-400" : "bg-gray-100 text-blue-600") : ""
                    }`
                  }
                  onClick={() => setShowProfileMenu(false)}
                >
                  <FaUser className="mr-2" /> My Profile
                </NavLink>
                
                <NavLink 
                  to="/settings" 
                  className={({ isActive }) => 
                    `block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center ${
                      isActive ? (darkMode ? "bg-gray-700 text-blue-400" : "bg-gray-100 text-blue-600") : ""
                    }`
                  }
                  onClick={() => setShowProfileMenu(false)}
                >
                  <FaCog className="mr-2" /> Settings
                </NavLink>
                
                <button 
                  className={`w-full text-left px-4 py-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} flex items-center transition-colors duration-200`}
                  onClick={handleToggleTheme}
                >
                  {darkMode ? (
                    <>
                      <FaSun className="mr-2 text-yellow-500" /> Light Mode
                    </>
                  ) : (
                    <>
                      <FaMoon className="mr-2 text-blue-500" /> Dark Mode
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Search (shown only on small screens) */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="relative">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search posts..." 
            className="w-full px-3 py-2 text-gray-800 dark:text-gray-200 dark:bg-gray-700 rounded-full pl-10"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" />
        </form>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-around py-2 border-t border-blue-700 dark:border-gray-700">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `p-2 rounded-md flex flex-col items-center text-xs ${
              isActive 
                ? "text-white dark:text-white" 
                : "text-blue-200 hover:text-white dark:text-gray-400 dark:hover:text-white"
            }`
          }
        >
          <FaHome className="mb-1 text-lg" />
          Home
        </NavLink>
        
        <NavLink 
          to="/explore" 
          className={({ isActive }) => 
            `p-2 rounded-md flex flex-col items-center text-xs ${
              isActive 
                ? "text-white dark:text-white" 
                : "text-blue-200 hover:text-white dark:text-gray-400 dark:hover:text-white"
            }`
          }
        >
          <FaCompass className="mb-1 text-lg" />
          Explore
        </NavLink>
        
        <NavLink 
          to="/collaborate" 
          className={({ isActive }) => 
            `p-2 rounded-md flex flex-col items-center text-xs ${
              isActive 
                ? "text-white dark:text-white" 
                : "text-blue-200 hover:text-white dark:text-gray-400 dark:hover:text-white"
            }`
          }
        >
          <FaUsers className="mb-1 text-lg" />
          Collaborate
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
