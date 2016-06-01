const movies = (state = [], action) => {
    switch (action.type) {
        case 'MOVIES-LOADED':
            return action.movies;
        default:
            return state;
    }
}

export default movies;
