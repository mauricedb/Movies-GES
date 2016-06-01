import $ from 'jquery';

const moviesLoaded = movies => ({
    type: 'MOVIES-LOADED',
    movies,
});


export const loadMovies = () => dispatch => {
    $.getJSON('/api/movies').then(movies => dispatch(moviesLoaded(movies)));
};
