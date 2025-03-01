import axios from 'axios';

const BASE_URL = 'https://socialcommunity-db2d8-default-rtdb.firebaseio.com';

// Post related services
export const fetchAllPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts.json`);
    const posts = response.data;
    if (!posts) return [];
    
    return Object.keys(posts).map((key) => ({
      id: key,
      ...posts[key]
    })).sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const newPost = {
      ...postData,
      likes: 0,
      createdAt: Date.now(),
    };
    const response = await axios.post(`${BASE_URL}/posts.json`, newPost);
    return { id: response.data.name, ...newPost };
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    await axios.delete(`${BASE_URL}/posts/${postId}.json`);
    await axios.delete(`${BASE_URL}/comments/${postId}.json`);
    return postId;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

// Like related services
export const likePost = async (postId, currentLikes) => {
  try {
    const updatedLikes = currentLikes + 1;
    await axios.patch(`${BASE_URL}/posts/${postId}.json`, { likes: updatedLikes });
    return { postId, likes: updatedLikes };
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
};

export const unlikePost = async (postId, currentLikes) => {
  try {
    const updatedLikes = Math.max(0, currentLikes - 1);
    await axios.patch(`${BASE_URL}/posts/${postId}.json`, { likes: updatedLikes });
    return { postId, likes: updatedLikes };
  } catch (error) {
    console.error('Error unliking post:', error);
    throw error;
  }
};

// Comment related services
export const addComment = async (postId, commentData) => {
  try {
    const newComment = {
      ...commentData,
      createdAt: Date.now()
    };
    const response = await axios.post(`${BASE_URL}/comments/${postId}.json`, newComment);
    return { id: response.data.name, postId, ...newComment };
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

export const fetchCommentsForPost = async (postId) => {
  try {
    const response = await axios.get(`${BASE_URL}/comments/${postId}.json`);
    const comments = response.data;
    if (!comments) return [];
    
    return Object.keys(comments).map((key) => ({
      id: key,
      postId,
      ...comments[key]
    })).sort((a, b) => a.createdAt - b.createdAt);
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};
