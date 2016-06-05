import $ from 'jquery';
import { movieTitled } from '../actions';

export const subscribe = (dispatch) => {
  var moviesHub = $.connection.moviesHub;
  moviesHub.client.movieTitled = e => {
    dispatch(movieTitled(e.MovieId, e.Title));
  };
  $.connection.hub.start();
};
