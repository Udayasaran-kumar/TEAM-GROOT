import React, { useState, useEffect, useCallback } from 'react';
import { FaThumbsUp, FaComment, FaTrash } from 'react-icons/fa';
import { CommentSection } from './Comments';
import { useTheme } from '../../context/ThemeContext';
import { useSelector } from 'react-redux';

const Post = ({ post, onDelete, onToggleLike, onAddComment, onLoadComments }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { darkMode } = useTheme();
  
  // Get comments from Redux store to ensure real-time updates
  const reduxComments = useSelector(state => 
    state.posts.comments && state.posts.comments[post.id] ? state.posts.comments[post.id] : []
  );
  
  // Update local comments when Redux comments change - but only replace entirely, not append
  useEffect(() => {
    if (showComments && reduxComments && !isAddingComment) {
      setComments(reduxComments);
    }
  }, [reduxComments, showComments, isAddingComment]);

  // Reset isAddingComment flag after comments update
  useEffect(() => {
    if (isAddingComment) {
      setIsAddingComment(false);
    }
  }, [comments, isAddingComment]);
  
  const handleToggleLike = () => {
    onToggleLike(post.id, post.likes, isLiked);
    setIsLiked(!isLiked);
  };

  // Memoized comment adder to prevent duplicate renders
  const handleAddComment = useCallback(async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    try {
      setIsAddingComment(true); // Flag that we're adding a comment
      
      // Wait for the comment to be added
      const newComment = await onAddComment(post.id, { content: commentText });
      
      // Clear the input regardless of result
      setCommentText('');
      
      // If comments aren't shown yet, load and show them
      if (!showComments) {
        setShowComments(true);
        const fetchedComments = await onLoadComments(post.id);
        setComments(fetchedComments || []);
      }
      // We no longer manually append the new comment - Redux will handle that
      
    } catch (error) {
      console.error("Error adding comment:", error);
      setIsAddingComment(false); // Reset flag if there's an error
    }
  }, [commentText, onAddComment, post.id, showComments, onLoadComments]);

  const loadComments = useCallback(async () => {
    if (showComments) {
      // If already showing comments, just toggle visibility
      setShowComments(false);
    } else {
      // Load comments and then show them
      try {
        const fetchedComments = await onLoadComments(post.id);
        setComments(fetchedComments || []);
        setShowComments(true);
      } catch (err) {
        console.error("Error loading comments:", err);
      }
    }
  }, [showComments, onLoadComments, post.id]);

  return (
    <div className={`${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'} rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-all duration-200`}>
      {/* Post header with ID and timestamp */}
      <div className="flex justify-between items-start">
        <h3 className="font-semibold mb-1">
          <span className={`${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'} text-xs px-2 py-1 rounded-full mr-2`}>
            #{post.id ? post.id.slice(0, 6) : 'unknown'}
          </span>
          <span className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs`}>
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </h3>
        <button 
          onClick={() => onDelete(post.id)} 
          className={`${darkMode ? 'text-gray-500 hover:text-red-400 hover:bg-gray-700' : 'text-gray-400 hover:text-red-600 hover:bg-red-50'} p-1 rounded-full transition`}
        >
          <FaTrash size={14} />
        </button>
      </div>
      
      {/* Post content */}
      <p className="my-2 line-clamp-3">{post.content}</p>
      
      {/* Post image if present */}
      {post.imageUrl && (
        <div className="relative h-40 overflow-hidden rounded-md mb-3">
          <img 
            src={post.imageUrl} 
            alt="Post" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20"></div>
        </div>
      )}
      
      {/* Like and comment buttons */}
      <div className={`flex justify-between items-center ${darkMode ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-100'} border-t pt-3 mt-2`}>
        <button 
          onClick={handleToggleLike}
          className={`flex items-center px-3 py-1 rounded-full ${
            darkMode 
              ? `${isLiked ? 'text-blue-400' : ''} hover:bg-gray-700` 
              : `${isLiked ? 'text-blue-600' : ''} hover:bg-gray-100`
          } transition`}
        >
          <FaThumbsUp className="mr-1" /> {post.likes || 0}
        </button>
        
        <button 
          onClick={loadComments}
          className={`flex items-center px-3 py-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition`}
        >
          <FaComment className="mr-1" /> {showComments ? 'Hide Comments' : 'Comments'}
        </button>
      </div>
      
      {/* Comments section */}
      <CommentSection 
        postId={post.id}
        showComments={showComments}
        comments={comments}
        commentText={commentText}
        setCommentText={setCommentText}
        handleAddComment={handleAddComment}
        darkMode={darkMode}
        isAddingComment={isAddingComment}
      />
    </div>
  );
};

// ...rest of the component stays the same
const PostsGrid = ({ posts, onDelete, onToggleLike, onAddComment, onLoadComments, loading, error }) => {
  // ...existing code...
  const { darkMode } = useTheme();

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${darkMode ? 'border-blue-400' : 'border-blue-600'} mx-auto`}></div>
        <p className={`mt-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading posts...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={`${darkMode ? 'bg-red-900 border-red-700 text-red-200' : 'bg-red-100 border-red-500 text-red-700'} border-l-4 p-4 rounded`}>
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }
  
  if (!posts || posts.length === 0) {
    return (
      <div className={`text-center py-10 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'} rounded-lg shadow-md`}>
        <p>No posts yet. Be the first to create one!</p>
      </div>
    );
  }
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
      {posts.map(post => (
        <Post 
          key={post.id}
          post={post}
          onDelete={onDelete}
          onToggleLike={onToggleLike}
          onAddComment={onAddComment}
          onLoadComments={onLoadComments}
        />
      ))}
    </div>
  );
};

export { Post, PostsGrid };
