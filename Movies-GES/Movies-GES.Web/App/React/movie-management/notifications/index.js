import $ from 'jquery';
import { titleUpdated } from '../actions';

export const subscribe = (dispatch) => {
  var moviesHub = $.connection.moviesHub;
  moviesHub.client.movieTitled = e => {
    dispatch(titleUpdated(e.MovieId, e.Title));
  };
  $.connection.hub.start();
};
