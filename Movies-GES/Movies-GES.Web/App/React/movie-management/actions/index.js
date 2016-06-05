import $ from 'jquery';

const moviesLoaded = movies => ({
  type: 'MOVIES-LOADED',
  movies,
});


export const loadMovies = () => dispatch => {
  $.getJSON('/api/movies').then(movies => dispatch(moviesLoaded(movies)));
};


const movieLoaded = movie => ({
  type: 'MOVIE-LOADED',
  movie,
});

export const loadMovie = (id) => dispatch => {
  $.getJSON(`/api/movies/${id}`).then(movie => dispatch(movieLoaded(movie)));
};

export const movieTitled = (id, title) => ({
  type: 'TITLE-UPDATED',
  payload: {
    id,
    title,
  },
});

export const movieDescribed = (id, description) => ({
  type: 'DESCRIPTION-UPDATED',
  payload: {
    id,
    description,
  },
});

export const directorAdded = (id, director) => ({
  type: 'DIRECTOR-ADDED',
  payload: {
    id,
    director,
  },
});

export const criticsScoreUpdated = (id, criticsScore) => ({
  type: 'CRITICS-SCORE-UPDATED',
  payload: {
    id,
    criticsScore,
  },
});

export const audienceScoreUpdated = (id, audienceScore) => ({
  type: 'AUDIENCE-SCORE-UPDATED',
  payload: {
    id,
    audienceScore,
  },
});

