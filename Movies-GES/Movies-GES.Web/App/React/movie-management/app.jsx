import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import { App, MovieList, MovieDetails } from './components';
import { loadMovies, loadMovie } from './actions';
import { subscribe } from './notifications';
import {createMovieStore} from './store';

const store = createMovieStore();
store.dispatch(loadMovies());

subscribe(store.dispatch);

function onEnterDetails(nextState) {
  store.dispatch(loadMovie(nextState.params.id));
}

ReactDOM.render(
  <Provider
    store={store}
  >
    <Router
      history={hashHistory}
    >
      <Route
        path="/"
        component={App}
      >
        <IndexRoute
          component={MovieList}
        />
        <Route
          path="list"
          component={MovieList}
        />
        <Route
          path="details/:id"
          component={MovieDetails}
          onEnter={onEnterDetails}
        />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app'));
