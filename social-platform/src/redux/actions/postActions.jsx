// Action Types
export const POST_ACTIONS = {
  SET_POSTS: 'SET_POSTS',
  ADD_POST: 'ADD_POST',
  REMOVE_POST: 'REMOVE_POST',
  UPDATE_POST_LIKES: 'UPDATE_POST_LIKES',
  SET_COMMENTS: 'SET_COMMENTS',
  ADD_COMMENT: 'ADD_COMMENT',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
};

// Action Creators
export const setPosts = (posts) => ({
  type: POST_ACTIONS.SET_POSTS,
  payload: posts
});

export const addPost = (post) => ({
  type: POST_ACTIONS.ADD_POST,
  payload: post
});

export const removePost = (postId) => ({
  type: POST_ACTIONS.REMOVE_POST,
  payload: postId
});

export const updatePostLikes = ({ postId, likes }) => ({
  type: POST_ACTIONS.UPDATE_POST_LIKES,
  payload: { postId, likes }
});

export const setComments = ({ postId, comments }) => ({
  type: POST_ACTIONS.SET_COMMENTS,
  payload: { postId, comments }
});

export const addNewComment = (comment) => ({
  type: POST_ACTIONS.ADD_COMMENT,
  payload: comment
});

export const setLoading = (isLoading) => ({
  type: POST_ACTIONS.SET_LOADING,
  payload: isLoading
});

export const setError = (error) => ({
  type: POST_ACTIONS.SET_ERROR,
  payload: error
});
