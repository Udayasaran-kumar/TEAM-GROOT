import { POST_ACTIONS } from '../../Redux/actions/postActions'; // Capitalized R in Redux to match file structure

const initialState = {
  items: [],
  comments: {},
  loading: false,
  error: null
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ACTIONS.SET_POSTS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
      
    case POST_ACTIONS.ADD_POST:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
      
    case POST_ACTIONS.REMOVE_POST:
      return {
        ...state,
        items: state.items.filter(post => post.id !== action.payload),
        comments: {
          ...state.comments,
          [action.payload]: undefined // Remove comments for deleted post
        }
      };
      
    case POST_ACTIONS.UPDATE_POST_LIKES:
      return {
        ...state,
        items: state.items.map(post => 
          post.id === action.payload.postId
            ? { ...post, likes: action.payload.likes }
            : post
        )
      };
      
    case POST_ACTIONS.SET_COMMENTS:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.postId]: action.payload.comments
        }
      };
      
    case POST_ACTIONS.ADD_COMMENT:
      const { postId } = action.payload;
      const existingComments = state.comments[postId] || [];
      
      return {
        ...state,
        comments: {
          ...state.comments,
          [postId]: [...existingComments, action.payload]
        }
      };
      
    case POST_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
      
    case POST_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
      
    default:
      return state;
  }
};

export default postsReducer;
