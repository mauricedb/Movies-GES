const movie = (state = {}, action) => {
    switch (action.type) {
        case 'MOVIE-LOADED':
            return action.movie;
        case 'TITLE-UPDATED':
            if (state.id === action.payload.id) {
                return { ...state, title: action.payload.title };
            }
            return state;
        default:
            return state;
    }
};

export default movie;
