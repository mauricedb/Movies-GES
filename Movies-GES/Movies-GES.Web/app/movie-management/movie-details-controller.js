'use strict';

function MovieDetailsController(
	$scope, $route, $modal, $location, moviesSvc, uuid, $http, movieCommands) {
    this.$scope = $scope;
    this.$modal = $modal;
    this.$location = $location;
    this.moviesSvc = moviesSvc;
    this.uuid = uuid;
    this.$http = $http;
    this.movieCommands = movieCommands;
    this.movie = {};

    var that = this;
    moviesSvc.get({ id: $route.current.params.id }).then(function (e) {
        that.movie = e.data;

    });
}

MovieDetailsController.prototype.rateCritics = function (movie) {
    var that = this;
    var modalInstance = this.$modal.open({
        templateUrl: '/app/movie-management/rate-movie.html',
        controller: 'rate-movie-controller',
        controllerAs: 'ctrl',
        resolve: {
            rating: function () {
                return movie.criticsScore;
            }
        }
    });

    modalInstance.result.then(function (rating) {
        var command = that.movieCommands.rateMovieByCrictics(movie.id, rating);
        that.movieCommands.excute(command)
			.then(function () {
			    movie.criticsScore =
					Math.round(0.9 * movie.criticsScore + 0.1 * rating);
			});
    });
};

MovieDetailsController.prototype.rateAudience = function (movie) {
    var that = this;
    var modalInstance = this.$modal.open({
        templateUrl: '/app/movie-management/rate-movie.html',
        controller: 'rate-movie-controller',
        controllerAs: 'ctrl',
        resolve: {
            rating: function () {
                return movie.audienceScore;
            }
        }
    });

    modalInstance.result.then(function (rating) {
        var command = that.movieCommands.rateMovieByAudience(movie.id, rating);
        that.movieCommands.excute(command)
			.then(function () {
			    movie.audienceScore =
					Math.round(0.9 * movie.audienceScore + 0.1 * rating);
			});
    });
};

MovieDetailsController.prototype.addDirector = function (movie) {
    var that = this;
    var modalInstance = this.$modal.open({
        templateUrl: '/app/movie-management/add-director.html',
        controller: 'add-director-controller',
        controllerAs: 'ctrl'
    });

    modalInstance.result.then(function (director) {
        var addDirectorToMovie = that.movieCommands.addDirectorToMovie(
			movie.id, director);
        that.movieCommands.excute(addDirectorToMovie)
			.then(function () {
			    movie.abridgedDirectors = movie.abridgedDirectors || [];
			    movie.abridgedDirectors.push(director);
			});
    });
};

module.exports = MovieDetailsController;
