import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, hashHistory, IndexRoute  } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import {App, MovieList, MovieDetails} from './components';

const store = createStore(
    combineReducers({
        routing: routerReducer
    })
);

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render( <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
      <IndexRoute component={MovieList}/>
        <Route path="list" component={MovieList}/>
        <Route path="details/:id" component={MovieDetails}/>
      </Route>
    </Router>
  </Provider>, 
    document.getElementById('app'));
