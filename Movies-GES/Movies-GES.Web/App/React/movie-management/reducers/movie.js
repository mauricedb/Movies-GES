const movie = (state = {}, action) => {
    switch (action.type) {
        case 'MOVIE-LOADED':
            return action.movie;
        default:
            return state;
    }
};

export default movie;
