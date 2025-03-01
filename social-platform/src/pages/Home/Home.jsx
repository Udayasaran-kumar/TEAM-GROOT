import React, { useState } from 'react';
import { useCollaboration } from '../../context/CollaborationContext';
import { FaPlus } from 'react-icons/fa';
import { CreatePostModal, CreatePostPrompt } from './CreatePosts';
import { PostsGrid } from './Feed';

const Home = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  
  // Check if useCollaboration is available - if not, provide fallback data
  let contextData = { posts: [], loading: false, error: null };
  
  try {
    contextData = useCollaboration() || contextData;
  } catch (error) {
    console.error("Error using CollaborationContext:", error);
  }
  
  const { 
    posts = [], 
    loading = false, 
    error = null, 
    createPost = () => console.log('createPost not available'),
    deletePost = () => console.log('deletePost not available'),
    toggleLike = () => console.log('toggleLike not available'),
    addComment = () => console.log('addComment not available'),
    loadCommentsForPost = () => console.log('loadCommentsForPost not available')
  } = contextData;

  const handleCreatePost = (postData) => {
    try {
      createPost(postData);
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  const handleDeletePost = (postId) => {
    try {
      deletePost(postId);
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleToggleLike = (postId, currentLikes, isLiked) => {
    try {
      toggleLike(postId, currentLikes, isLiked);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const handleAddComment = (postId, commentData) => {
    try {
      addComment(postId, commentData);
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handleLoadComments = async (postId) => {
    try {
      return await loadCommentsForPost(postId);
    } catch (err) {
      console.error("Error loading comments:", err);
      return [];
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Feed</h1>
          <button 
            onClick={() => setIsPostModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
          >
            <FaPlus className="mr-2" /> Create Post
          </button>
        </div>
        
        <CreatePostPrompt onClick={() => setIsPostModalOpen(true)} />
        
        <CreatePostModal 
          isOpen={isPostModalOpen} 
          onClose={() => setIsPostModalOpen(false)}
          createPost={handleCreatePost}
        />
        
        <div className="mb-6 space-y-4">
          <PostsGrid 
            posts={posts}
            loading={loading}
            error={error}
            onDelete={handleDeletePost}
            onToggleLike={handleToggleLike}
            onAddComment={handleAddComment}
            onLoadComments={handleLoadComments}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

