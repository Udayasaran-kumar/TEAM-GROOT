import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';  // Changed from { thunk } to thunk
import postsReducer from './reducers/postsReducer';

// Combine all reducers
const rootReducer = combineReducers({
  posts: postsReducer,
  // Add more reducers here as needed
});

// Create store with middleware
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
