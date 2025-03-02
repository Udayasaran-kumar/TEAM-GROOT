// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaHeart, FaGithub, FaGlobe } from 'react-icons/fa';
// import { useTheme } from '../context/ThemeContext';

// const Footer = () => {
//   const { darkMode } = useTheme();

//   return (
//     <footer className={`${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} py-8 transition-colors duration-200`}>
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col md:flex-row justify-between items-center mb-8">
//           <div className="mb-6 md:mb-0">
//             <h3 className="text-xl font-bold mb-2 flex items-center">
//               <span className="bg-blue-600 text-white p-1 rounded mr-2">CollabHub</span>
//             </h3>
//             <p className="text-gray-400">Connect. Collaborate. Create.</p>
//           </div>


//         </div>   



//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Close the sidebar
      }
    };

    // Add event listener when the sidebar is open
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]); // Re-run effect when isMenuOpen changes
  // Determine the color based on the current page (Sign In or Sign Up)
  const isSignUpPage = location.pathname === "/register";
  const isSignInPage = location.pathname === "/login";

  return (
    <div className="bg-blue-500">
      <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
        {/* Logo on the left */}
        <NavLink to="/" className="text-3xl font-bold leading-none">
          <i className="fas fa-rocket text-blue-600 text-4xl"></i>
        </NavLink>

        {/* Navbar items (centered) */}
        <ul className="hidden lg:flex lg:items-center lg:space-x-6 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-xl hover:text-gray-500 ${isActive ? "text-blue-600 font-bold" : "text-gray-400"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-xl hover:text-gray-500 ${isActive ? "text-blue-600 font-bold" : "text-gray-400"
                }`
              }
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-xl hover:text-gray-500 ${isActive ? "text-blue-600 font-bold" : "text-gray-400"
                }`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Login/Signup or Logout buttons on the right */}
        {user ? (
          <div className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200">
            <button onClick={logout} className="cursor-pointer">
              Logout
            </button>
          </div>
        ) : (
          <>
            <NavLink
              to="/login"
              className={`hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 text-xl text-gray-900 font-bold rounded-xl transition duration-200 
                ${isSignInPage ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-50 hover:bg-gray-100"}`}
            >
              Sign In
            </NavLink>

            <NavLink
              to="/register"
              className={`hidden lg:inline-block py-2 px-6 text-xl font-bold rounded-xl transition duration-200 
                ${isSignUpPage ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-50 hover:bg-gray-100"}`}
            >
              Sign Up
            </NavLink>
          </>
        )}

        {/* Mobile menu button (hidden on larger screens) */}
        <div className="lg:hidden">
          <button
            className="navbar-burger flex items-center text-blue-600 p-3 cursor-pointer"
            onClick={toggleMenu}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </nav>

      {/* Mobile menu (hidden on larger screens) */}
      <div
        ref={sidebarRef}
        className={`navbar-menu fixed top-0 left-0 bottom-0 z-50 w-3/4 max-w-xs py-6 px-6 bg-white border-r overflow-y-auto transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden`}
      >
        <div
          className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-50"
          onClick={toggleMenu}
        ></div>
        <nav className="relative">
          <div className="flex items-center mb-8">
            <NavLink to="/" className="mr-auto text-3xl font-bold leading-none">
              <i className="fas fa-rocket text-blue-600 text-4xl"></i>
            </NavLink>

            <button className="navbar-close" onClick={toggleMenu}>
              <i className="fas fa-times text-xl text-gray-400 hover:text-gray-500 cursor-pointer"></i>
            </button>
          </div>
          <div>
            <ul>
              <li className="mb-1">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block p-4 text-xl font-semibold hover:bg-blue-50 hover:text-blue-600 rounded ${isActive ? "text-blue-600" : "text-gray-400"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="mb-1">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block p-4 text-xl font-semibold hover:bg-blue-50 hover:text-blue-600 rounded ${isActive ? "text-blue-600" : "text-gray-400"
                    }`
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li className="mb-1">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block p-4 text-xl font-semibold hover:bg-blue-50 hover:text-blue-600 rounded ${isActive ? "text-blue-600" : "text-gray-400"
                    }`
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <div className="pt-6">
              {user ? (
                <button
                  onClick={logout}
                  className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl"
                >
                  Logout
                </button>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl"
                  >
                    Sign in
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-xl"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
            <p className="my-4 text-xs text-center text-gray-400">
              <span>Copyright © 2025</span>
            </p>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
