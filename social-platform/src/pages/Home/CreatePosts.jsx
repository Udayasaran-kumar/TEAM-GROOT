import React, { useState } from 'react';
import { FaPlus, FaImage, FaSmile, FaTimes } from 'react-icons/fa';
import Modal from '../../components/Modal';

const CreatePostModal = ({ isOpen, onClose, createPost }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

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
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        
        <div className="flex items-center border-t border-gray-200 pt-3">
          <label className="flex items-center text-blue-600 cursor-pointer hover:bg-blue-50 px-3 py-2 rounded-md transition">
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
            className="flex items-center text-yellow-500 cursor-pointer hover:bg-yellow-50 px-3 py-2 rounded-md ml-2 transition"
          >
            <FaSmile className="mr-2" />
            <span>Feeling/Activity</span>
          </button>
        </div>
        
        <div className="flex justify-end">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md mr-2 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
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
  return (
    <div className="bg-white rounded-lg shadow-md p-3 mb-6 cursor-pointer hover:shadow-lg transition-shadow">
      <div 
        className="flex items-center space-x-3" 
        onClick={onClick}
      >
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <FaPlus className="text-lg" />
        </div>
        <div className="flex-grow bg-gray-100 rounded-full py-2.5 px-4 text-gray-500">
          Click to create a post...
        </div>
      </div>
    </div>
  );
};

export { CreatePostModal, CreatePostPrompt };
