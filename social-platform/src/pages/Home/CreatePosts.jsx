import React, { useState } from 'react';
import { FaPlus, FaImage, FaSmile, FaTimes } from 'react-icons/fa';
import Modal from '../../components/Modal';
import { useTheme } from '../../context/ThemeContext';

const CreatePostModal = ({ isOpen, onClose, createPost }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const { darkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!content.trim() && !imageUrl) return;
    
    createPost({ content, imageUrl });
    setContent('');
    setImage(null);
    setImageUrl('');
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Post">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 
              ${darkMode 
                ? 'bg-gray-800 border-gray-700 text-gray-200 focus:ring-blue-600' 
                : 'bg-white border-gray-300 text-gray-800 focus:ring-blue-500'
              }`}
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
          />
        </div>
        
        {imageUrl && (
          <div className="relative">
            <img src={imageUrl} alt="Preview" className="max-h-60 rounded-md w-full object-cover" />
            <button 
              type="button"
              onClick={() => { setImage(null); setImageUrl(''); }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
            >
              <FaTimes />
            </button>
          </div>
        )}
        
        <div className={`flex items-center border-t pt-3 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <label className={`flex items-center cursor-pointer px-3 py-2 rounded-md transition
            ${darkMode 
              ? 'text-blue-400 hover:bg-gray-700' 
              : 'text-blue-600 hover:bg-blue-50'
            }`}
          >
            <FaImage className="mr-2" />
            <span>Add Image</span>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className="hidden"
            />
          </label>
          
          <button 
            type="button"
            className={`flex items-center cursor-pointer px-3 py-2 rounded-md ml-2 transition
              ${darkMode 
                ? 'text-yellow-400 hover:bg-gray-700' 
                : 'text-yellow-500 hover:bg-yellow-50'
              }`}
          >
            <FaSmile className="mr-2" />
            <span>Feeling/Activity</span>
          </button>
        </div>
        
        <div className="flex justify-end">
          <button 
            type="button" 
            onClick={onClose} 
            className={`px-4 py-2 border rounded-md mr-2 transition
              ${darkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className={`px-4 py-2 text-white rounded-md transition
              ${(!content.trim() && !imageUrl)
                ? 'bg-blue-600 opacity-50 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
              }`}
            disabled={!content.trim() && !imageUrl}
          >
            Post
          </button>
        </div>
      </form>
    </Modal>
  );
};

const CreatePostPrompt = ({ onClick }) => {
  const { darkMode } = useTheme();
  
  return (
    <div 
      className={`rounded-lg shadow-md p-3 mb-6 cursor-pointer hover:shadow-lg transition-shadow
        ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div 
        className="flex items-center space-x-3" 
        onClick={onClick}
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center
          ${darkMode 
            ? 'bg-gray-700 text-blue-400' 
            : 'bg-blue-100 text-blue-600'
          }`}
        >
          <FaPlus className="text-lg" />
        </div>
        <div className={`flex-grow rounded-full py-2.5 px-4
          ${darkMode 
            ? 'bg-gray-700 text-gray-400' 
            : 'bg-gray-100 text-white-500'
          }`}
        >
          Click to create a post...
        </div>
      </div>
    </div>
  );
};

export { CreatePostModal, CreatePostPrompt };
