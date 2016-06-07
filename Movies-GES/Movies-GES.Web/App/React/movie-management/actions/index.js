import $ from 'jquery';
import * as constants from '../constants';

const moviesLoaded = (movies) => ({
  type: constants.moviesLoaded,
  payload: movies,
});


export const loadMovies = () => dispatch => {
  $.getJSON('/api/movies').then(movies => dispatch(moviesLoaded(movies)));
};


const movieLoaded = (movie) => ({
  type: constants.movieLoaded,
  payload: movie,
});

export const loadMovie = (id) => dispatch => {
  $.getJSON(`/api/movies/${id}`).then(movie => dispatch(movieLoaded(movie)));
};

export const movieTitled = (id, title) => ({
  type: constants.movieTitled,
  payload: {
    id,
    title,
  },
});

export const movieDescribed = (id, description) => ({
  type: constants.movieDescribed,
  payload: {
    id,
    description,
  },
});

export const directorAddedToMovie = (id, director) => ({
  type: constants.directorAddedToMovie,
  payload: {
    id,
    director,
  },
});

export const movieRatedByCritics = (id, criticsScore) => ({
  type: constants.movieRatedByCritics,
  payload: {
    id,
    criticsScore,
  },
});

export const movieRatedByAudience = (id, audienceScore) => ({
  type: constants.movieRatedByAudience,
  payload: {
    id,
    audienceScore,
  },
});
