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

export const titleUpdated = (id, title) => ({
    type: 'TITLE-UPDATED',
    payload: {
        id,
        title,
    },
});

export const descriptionUpdated = (id, description) => ({
    type: 'DESCRIPTION-UPDATED',
    payload: {
        id,
        description,
    },
});

