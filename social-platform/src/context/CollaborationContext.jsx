import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAllPosts,
  createPost,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  fetchCommentsForPost
} from '../services/postService';

// Redux actions
import {
  setPosts,
  addPost,
  removePost,
  updatePostLikes,
  setComments,
  addNewComment
} from '../Redux/actions/postActions';

const CollaborationContext = createContext();

export const useCollaboration = () => useContext(CollaborationContext);

export const CollaborationProvider = ({ children }) => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.items);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all posts on initial load
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await fetchAllPosts();
        dispatch(setPosts(fetchedPosts));
        setError(null);
      } catch (err) {
        setError('Failed to load posts. Please try again later.');
        console.error('Error loading posts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [dispatch]);

  // Create a new post
  const handleCreatePost = async (postData) => {
    try {
      const newPost = await createPost(postData);
      dispatch(addPost(newPost));
      return newPost;
    } catch (err) {
      setError('Failed to create post. Please try again.');
      throw err;
    }
  };

  // Delete a post
  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      dispatch(removePost(postId));
    } catch (err) {
      setError('Failed to delete post. Please try again.');
      throw err;
    }
  };

  // Toggle like on a post
  const handleToggleLike = async (postId, currentLikes, isLiked) => {
    try {
      let response;
      if (isLiked) {
        response = await unlikePost(postId, currentLikes);
      } else {
        response = await likePost(postId, currentLikes);
      }
      dispatch(updatePostLikes(response));
      return response;
    } catch (err) {
      setError('Failed to update like. Please try again.');
      throw err;
    }
  };

  // Add a comment to a post
  const handleAddComment = async (postId, commentData) => {
    try {
      const newComment = await addComment(postId, commentData);
      dispatch(addNewComment(newComment));
      return newComment; // Return the new comment for immediate UI updates
    } catch (err) {
      setError('Failed to add comment. Please try again.');
      throw err;
    }
  };

  // Load comments for a specific post
  const loadCommentsForPost = async (postId) => {
    try {
      const comments = await fetchCommentsForPost(postId);
      dispatch(setComments({ postId, comments }));
      return comments;
    } catch (err) {
      setError('Failed to load comments. Please try again.');
      throw err;
    }
  };

  const value = {
    posts,
    loading,
    error,
    createPost: handleCreatePost,
    deletePost: handleDeletePost,
    toggleLike: handleToggleLike,
    addComment: handleAddComment,
    loadCommentsForPost
  };

  return (
    <CollaborationContext.Provider value={value}>
      {children}
    </CollaborationContext.Provider>
  );
};

export default CollaborationProvider;
