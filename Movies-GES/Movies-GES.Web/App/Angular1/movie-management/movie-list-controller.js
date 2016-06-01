'use strict';

function MovieListController(
		$modal, $location, $http, $q, moviesSvc, uuid, movieCommands) {
	this.$modal = $modal;
	this.$location = $location;
	this.$http = $http;
	this.$q = $q;
	this.moviesSvc = moviesSvc;
	this.uuid = uuid;
	this.movieCommands = movieCommands;
	this.movies = [];

	var that = this;
	moviesSvc.query().then(function (e) {
		[].push.apply(that.movies, e.data);
	});
}

MovieListController.prototype.movieDetails = function (movie) {
	this.$location.path('/details/' + movie.id);
};

MovieListController.prototype.addMovie = function () {
	var that = this;
	var modalInstance = this.$modal.open({
		templateUrl: '/app/angular1/movie-management/add-movie.html',
		controller: 'add-movie-controller',
		controllerAs: 'ctrl'
	});

	modalInstance.result.then(function (newMovie) {
		that.movies.push(newMovie);
	});
};

















MovieListController.prototype.generateMovies = function () {
	/* jshint ignore:start */
	var movies = [12862, 12865, 13092, 16673];
	var self = this;

	movies.forEach(function (m) {
		self.$http.get('/data/' + m + '.json').then(function (e) {
			var movieCommands = self.movieCommands;
			console.log(e.data);
			var movie = e.data;
			delete movie.id;
			movie.criticsConsensus = movie.critics_consensus;
			delete movie.critics_consensus;

			var titleCommand = movieCommands.titleMovie(movie);
			movieCommands.excute(titleCommand).then(function () {
				var describeCommand = movieCommands.describeMovie(movie);
				return movieCommands.excute(describeCommand);
			}).then(function () {
				var rateMovieByAudience = movieCommands.rateMovieByAudience(
					movie.id, movie.ratings.audience_score);
				return movieCommands.excute(rateMovieByAudience);
			}).then(function () {
				var rateMovieByCrictics = movieCommands.rateMovieByCrictics(
					movie.id, movie.ratings.critics_score);
				return movieCommands.excute(rateMovieByCrictics);
			}).then(function () {
				var promises = movie.abridged_directors.map(function (director) {
					var addDirectorToMovie = movieCommands.addDirectorToMovie(
						movie.id, director.name);
					return movieCommands.excute(addDirectorToMovie);
				});

				return self.$q.all(promises);
			}).then(function() {
				self.$location.path('/');
			});
		});
	});
	/* jshint ignore:end */
};

module.exports = MovieListController;
