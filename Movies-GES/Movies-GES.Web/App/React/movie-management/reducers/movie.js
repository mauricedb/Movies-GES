import * as constants from '../constants';

const movie = (state = { status: '' }, action) => {
  switch (action.type) {
    case constants.movieLoaded:
      return {
        ...action.payload,
        status: 'LOADED',
      };

    case constants.movieTitled:
      if (state.id === action.payload.id) {
        return {
          ...state,
          title: action.payload.title,
        };
      }

      return state;

    case constants.movieDescribed:
      if (state.id === action.payload.id) {
        return {
          ...state,
          ...action.payload.description,
        };
      }

      return state;

    case constants.directorAddedToMovie:
      if (state.id === action.payload.id) {
        return {
          ...state,
          abridgedDirectors: [...state.abridgedDirectors, action.payload.director],
        };
      }

      return state;

    case constants.movieRatedByCritics:
      if (state.id === action.payload.id) {
        const criticsScore = Math.round(
                    0.9 * state.criticsScore +
                    0.1 * action.payload.criticsScore);

        return {
          ...state,
          criticsScore,
        };
      }

      return state;

    //case constants.movieRatedByAudience:
    //  if (state.id === action.payload.id) {
    //    const audienceScore = Math.round(
    //                0.9 * state.audienceScore +
    //                0.1 * action.payload.audienceScore);
    //
    //    return {
    //      ...state,
    //      audienceScore,
    //    };
    //  }
    //
    //  return state;

    default:
      return state;
  }
};

export default movie;
