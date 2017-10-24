import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import PostsShow from './components/posts_show';
import PostsEdit from './components/posts_edit';
import './index.css';

import reducers from './reducers/index.js';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),)}>
    <BrowserRouter>
      <Switch>
        <Route path='/posts/:id/edit' component={PostsNew} />
        <Route path='/posts/new' component={PostsNew} />
        <Route path='/posts/:id' component={PostsShow} />
        <Route path='/' component={PostsIndex} />
      </Switch>
  </BrowserRouter>
  </Provider>

, document.getElementById('root'));
