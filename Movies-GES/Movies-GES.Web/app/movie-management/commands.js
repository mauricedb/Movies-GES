'use strict';

var angular = require('angular');
var utils = require('./app-utils');
var mod = module.exports = angular.module('movie-commands', [utils.name]);

mod.factory('movieCommands', function ($http, uuid) {
	function excute(command) {
		return $http.put(
			'/api/commands/' + command.commandId,
			command,
			{
				headers: {
					'Content-Type': 'application/vnd.movies_ges.domain.commands.' + 
					                 command.commandName.toLowerCase() + '+json'
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
			//mpaaRating: movie.mpaaRating,
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

	function addDirectorToMovie(movieId, director) {
		return {
			commandName: 'AddDirectorToMovie',
			commandId: uuid.v4(),
			movieId: movieId,
			director: director
		};
	}

	return {
		titleMovie: titleMovie,
		describeMovie: describeMovie,
		rateMovieByAudience: rateMovieByAudience,
		rateMovieByCrictics: rateMovieByCrictics,
		addDirectorToMovie: addDirectorToMovie,
		excute: excute
	};
});

