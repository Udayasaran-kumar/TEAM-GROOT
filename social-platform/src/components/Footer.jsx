import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaHeart, FaGithub, FaGlobe } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { darkMode } = useTheme();
  
  return (
    <footer className={`$ {darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'} py-8 transition-colors duration-200`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
         
          
          <div className="flex space-x-4">
            {[
              { name: 'Twitter', icon: <FaTwitter size={20} /> },
              { name: 'Facebook', icon: <FaFacebook size={20} /> },
              { name: 'Instagram', icon: <FaInstagram size={20} /> },
              { name: 'LinkedIn', icon: <FaLinkedin size={20} /> },
              { name: 'GitHub', icon: <FaGithub size={20} /> },
              { name: 'Globe', icon: <FaGlobe size={20} /> }
            ].map(({ name, icon }) => (
              <a key={name} href="#" className="text-gray-400 hover:text-white p-2 hover:bg-gray-700 dark:hover:bg-gray-800 rounded-full transition">
                <span className="sr-only">{name}</span>
                {icon}
              </a>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-300 border-b border-gray-700 pb-2">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Explore', 'Collaborate', 'Profile'].map((item) => (
                <li key={item}><Link to={`/${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition">{item}</Link></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-300 border-b border-gray-700 pb-2">Resources</h4>
            <ul className="space-y-2">
              {['Help Center', 'Community Guidelines', 'Blog', 'Feedback'].map((item) => (
                <li key={item}><Link to={`/${item.replace(/\s+/g, '').toLowerCase()}`} className="text-gray-400 hover:text-white transition">{item}</Link></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-300 border-b border-gray-700 pb-2">Legal</h4>
            <ul className="space-y-2">
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Copyright'].map((item) => (
                <li key={item}><Link to={`/${item.replace(/\s+/g, '').toLowerCase()}`} className="text-gray-400 hover:text-white transition">{item}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500">
          <p className="flex items-center justify-center">
            Made with <FaHeart className="mx-1 text-red-500" /> by Team Groot &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;