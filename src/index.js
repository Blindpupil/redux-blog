import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Promise from 'redux-promise';

import reducers from './reducers';
import PostList from './containers/posts_list_container';

const createStoreWithMiddleware = applyMiddleware(Promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Route path="/" component={PostList} />
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
