import React from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2 flex items-center">
              <span className="bg-blue-600 text-white p-1 rounded mr-2">C</span>
              CollabHub
            </h3>
            <p className="text-gray-400">Connect. Collaborate. Create.</p>
          </div>
          
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-full transition">
              <FaTwitter size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-full transition">
              <FaFacebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-full transition">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white p-2 hover:bg-gray-800 rounded-full transition">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-300 border-b border-gray-700 pb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link to="/explore" className="text-gray-400 hover:text-white transition">Explore</Link></li>
              <li><Link to="/collaborate" className="text-gray-400 hover:text-white transition">Collaborate</Link></li>
              <li><Link to="/profile" className="text-gray-400 hover:text-white transition">Profile</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-300 border-b border-gray-700 pb-2">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-400 hover:text-white transition">Help Center</Link></li>
              <li><Link to="/guidelines" className="text-gray-400 hover:text-white transition">Community Guidelines</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition">Blog</Link></li>
              <li><Link to="/feedback" className="text-gray-400 hover:text-white transition">Feedback</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-300 border-b border-gray-700 pb-2">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/cookies" className="text-gray-400 hover:text-white transition">Cookie Policy</Link></li>
              <li><Link to="/copyright" className="text-gray-400 hover:text-white transition">Copyright</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500">
          <p className="flex items-center justify-center">
            Made with <FaHeart className="mx-1 text-red-500" /> by Team Groot © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;