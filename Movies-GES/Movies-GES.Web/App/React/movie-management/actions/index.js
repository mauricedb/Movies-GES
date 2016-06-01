import $ from 'jquery';

const moviesLoaded = movies => {
    return {
        type: 'MOVIES-LOADED',
        movies
    };
};

export const loadMovies = () => {
    return dispatch => {
        $.getJSON('/api/movies').then(movies => dispatch(moviesLoaded(movies)));
    };
}
