import uuid from 'uuid';
import { execute } from './cedar';

export const updateTitle = (movieId, title) => {
  const command = {
    commandName: 'TitleMovie',
    commandId: uuid.v4(),
    movieId,
    title,
  };

  return execute(command);
};

export const describeMovie = (movieId, description) => {
  const command = {
    commandName: 'DescribeMovie',
    commandId: uuid.v4(),
    movieId,
    synopsis: description.synopsis,
    criticsConsensus: description.criticsConsensus,
    mpaaRating: description.mpaaRating,
    year: description.year || 0,
  };

  return execute(command);
};

export const addDirector = (movieId, director) => {
  const command = {
    commandName: 'AddDirectorToMovie',
    commandId: uuid.v4(),
    movieId,
    director,
  };

  return execute(command);
};

export const updateCriticsScore = (movieId, rating) => {
  const command = {
    commandName: 'RateMovieByCrictics',
    commandId: uuid.v4(),
    movieId,
    rating,
  };

  return execute(command);
};

export const updateAudienceScore = (movieId, rating) => {
  const command = {
    commandName: 'RateMovieByAudience',
    commandId: uuid.v4(),
    movieId,
    rating,
  };

  return execute(command);
};
