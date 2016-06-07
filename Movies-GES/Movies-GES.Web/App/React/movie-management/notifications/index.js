import $ from 'jquery';
import { movieTitled } from '../actions';

export const subscribe = (dispatch) => {
  const moviesHub = $.connection.moviesHub;
  moviesHub.client.movieTitled = e => {
    dispatch(movieTitled(e.MovieId, e.Title));
  };
  $.connection.hub.start();
};
