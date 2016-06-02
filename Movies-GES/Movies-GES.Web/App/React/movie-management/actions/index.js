import $ from 'jquery';

const moviesLoaded = movies => ({
    type: 'MOVIES-LOADED',
    movies,
});


export const loadMovies = () => dispatch => {
    $.getJSON('/api/movies').then(movies => dispatch(moviesLoaded(movies)));
};


const movieLoaded = movie => ({
    type: 'MOVIE-LOADED',
    movie,
});

export const loadMovie = (id) => dispatch => {
    $.getJSON(`/api/movies/${id}`).then(movie => dispatch(movieLoaded(movie)));
};
