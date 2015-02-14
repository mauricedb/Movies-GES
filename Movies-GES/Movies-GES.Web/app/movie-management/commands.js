(function () {
    'use strict';

    var mod = angular.module('movie-commands', ['app-utils']);


    mod.factory('movieCommands', function ($http, uuid) {
        function excute(command) {
            return $http.put(
                '/api/commands/' + command.commandId,
                command,
                {
                    headers: {
                        'Content-Type': 'application/vnd.movies_ges.domain.commands.' + command.commandName.toLowerCase() + '+json'
                    }
                }).then(function (e) {
                    return e;
                }, function (e) {
                    console.log(e);
                });
        }

        function describeMovie(movie) {

            return {
                commandName: 'DescribeMovie',
                commandId: uuid.v4(),
                movieId: movie.id,
                synopsis: movie.synopsis,
                criticsConsensus: movie.criticsConsensus,
                year: movie.year || 0
            };
        }

        function titleMovie(movie) {
            movie.id = movie.id || uuid.v4();

            return {
                commandName: 'TitleMovie',
                commandId: uuid.v4(),
                movieId: movie.id,
                title: movie.title
            };
        }

        function rateMovieByAudience(movieId, rating) {
            return {
                commandName: 'RateMovieByAudience',
                commandId: uuid.v4(),
                movieId: movieId,
                rating: rating
            };
        }

        function rateMovieByCrictics(movieId, rating) {
            return {
                commandName: 'RateMovieByCrictics',
                commandId: uuid.v4(),
                movieId: movieId,
                rating: rating
            };
        }

        function movieDirectedBy(movieId, director) {
            return {
                commandName: 'MovieDirectedBy',
                commandId: uuid.v4(),
                movieId: movieId,
                director: director
            }
        }

        return {
            titleMovie: titleMovie,
            describeMovie: describeMovie,
            rateMovieByAudience: rateMovieByAudience,
            rateMovieByCrictics: rateMovieByCrictics,
            movieDirectedBy: movieDirectedBy,
            excute: excute
        };
    });

})();