import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import MovieList from '../movie-list.jsx';

const  getMovieList = movies => (
    <MovieList.WrappedComponent 
        movies={movies} 
    />
);

storiesOf('MovieList', module)
    .add('Empty list', () => {
        const movies = [];
        return getMovieList(movies);
    })
    .add('One movie', () => {
        const movies = [{
            id: 'tt0110912',
            title: 'Pulp Fiction',
            abridgedDirectors:['Quentin Tarantino']
        }];
        return getMovieList(movies);
    })
    .add('Three movies', () => {
        const movies = [{
            id: 'tt0110912',
            title: 'Pulp Fiction',
            abridgedDirectors:['Quentin Tarantino']
        }, {
            id: 'tt0116282',
            title: 'Fargo',
            abridgedDirectors:['Joel Coen', 'Ethan Coen']
        }, {
            id: 'tt3659388',
            title: 'The Martian',
            abridgedDirectors:['Ridley Scott']
        }];
        return getMovieList(movies);
    });

