const movie = (state = {status: ''}, action) => {
    switch (action.type) {
        case 'MOVIE-LOADED':
            return {
                ...action.movie,
                status: 'LOADED'
            };
        case 'TITLE-UPDATED':
            if (state.id === action.payload.id) {
                return {...state, title: action.payload.title};
            }
            return state;
        case 'DESCRIPTION-UPDATED':
            if (state.id === action.payload.id) {
                return {...state, ...action.payload.description};
            }
            return state;
        default:
            return state;
    }
};

export default movie;
