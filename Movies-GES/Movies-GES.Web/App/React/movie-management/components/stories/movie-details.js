import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import MovieDetails from '../movie-details.jsx';

const resolvedAction = (name, result) => {
    const theAction = action(name); 
    return (...args) => {
        theAction(...args);
        return Promise.resolve(result); 
    }
};

const  getMovieDetails = movie => (
    <MovieDetails.WrappedComponent 
        movieId={movie.id}
        movie={movie} 
        titleMovie={resolvedAction('titleMovie')}
        updateDescription={resolvedAction('updateDescription')}
        addDirectorToMovie={resolvedAction('addDirectorToMovie')}
        rateMovieByCrictics={resolvedAction('rateMovieByCrictics')}
        rateMovieByAudience={resolvedAction('rateMovieByAudience')}
    />
);

storiesOf('MovieDetails', module)
    .add('Not loaded yet', () => {
        const movie = {};
        return getMovieDetails(movie);
    })
    .add('loaded minimal movie', () => {
        const movie = {
            status: 'LOADED',
            id: '',
            title: '',
            synopsis: '',
            criticsConsensus: '',
            year: 0,
            mpaaRating: '',
            abridgedDirectors: [],
            criticsScore: 0,
            audienceScore: 0
        };
        return getMovieDetails(movie);
    })
    .add('loaded The Martian', () => {
        const movie = {
            status: 'LOADED',
            id: 'tt3659388',
            title: 'The Martian',
            synopsis: 'An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.',
            criticsConsensus: 'Smart, thrilling, and surprisingly funny, The Martian offers a faithful adaptation of the bestselling book that brings out the best in leading man Matt Damon and director Ridley Scott.',
            year: 2015,
            mpaaRating: 'PG-13',
            abridgedDirectors: ['Ridley Scott'],
            criticsScore: 78,
            audienceScore: 86
        };
        return getMovieDetails(movie);
    });
