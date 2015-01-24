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

        function titleMovie(movie) {
            movie.id = movie.id || uuid.v4();

            return {
                commandName: 'TitleMovie',
                commandId: uuid.v4(),
                movieId: movie.id,
                title: movie.title
            };
        }


        return {
            titleMovie: titleMovie,
            excute: excute
        };
    });

})();