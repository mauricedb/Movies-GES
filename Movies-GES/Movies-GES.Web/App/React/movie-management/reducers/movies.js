import movie from './movie';

const movies = (state = [], action) => {
    switch (action.type) {
        case 'MOVIES-LOADED':
            return action.movies;
        case 'TITLE-UPDATED':
            return state.map(m => movie(m, action));
        case 'DESCRIPTION-UPDATED':
            return state.map(m => movie(m, action));
        default:
            return state;
    }
};

export default movies;
