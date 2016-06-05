import * as constants from '../constants';
import movie from './movie';

const movies = (state = [], action) => {
  switch (action.type) {
    case constants.moviesLoaded:
      return action.movies;
    case constants.movieTitled:
      return state.map(m => movie(m, action));
    case constants.movieDescribed:
      return state.map(m => movie(m, action));
    default:
      return state;
  }
};

export default movies;
