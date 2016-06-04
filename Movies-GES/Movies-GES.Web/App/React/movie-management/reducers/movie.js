const movie = (state = { status: '' }, action) => {
  switch (action.type) {
    case 'MOVIE-LOADED':
      return {
        ...action.movie,
        status: 'LOADED',
      };

    case 'TITLE-UPDATED':
      if (state.id === action.payload.id) {
        return {
          ...state,
          title: action.payload.title,
        };
      }

      return state;

    case 'DESCRIPTION-UPDATED':
      if (state.id === action.payload.id) {
        return {
          ...state,
          ...action.payload.description,
        };
      }

      return state;

    case 'DIRECTOR-ADDED':
      if (state.id === action.payload.id) {
        return {
          ...state,
          abridgedDirectors: [...state.abridgedDirectors, action.payload.director],
        };
      }

      return state;

    case 'CRITICS-SCORE-UPDATED':
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

    case 'AUDIENCE-SCORE-UPDATED':
      if (state.id === action.payload.id) {
        const audienceScore = Math.round(
                    0.9 * state.audienceScore +
                    0.1 * action.payload.audienceScore);

        return {
          ...state,
          audienceScore,
        };
      }

      return state;

    default:
      return state;
  }
};

export default movie;
