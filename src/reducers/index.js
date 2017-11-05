import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts';
import CommentsReducer from './reducer_comments';
import CategoryReducer from './reducer_categories';
import SortReducer from './reducer_sort';

const rootReducer = combineReducers({
  posts: PostsReducer,
  comments: CommentsReducer,
  form: formReducer,
  categories: CategoryReducer,
  sort: SortReducer

});

export default rootReducer;
