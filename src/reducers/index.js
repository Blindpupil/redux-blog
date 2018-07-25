import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './posts_reducer';

const rootReducer = combineReducers({
  posts: PostsReducer,
  // it needs to be the 'form' key, since all forms will assume that it is
  form: formReducer
});

export default rootReducer;
