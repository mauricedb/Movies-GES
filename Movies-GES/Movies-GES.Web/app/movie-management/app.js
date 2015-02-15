(function () {
    'use strict';

    var mod = angular.module('movie-management-app', [
        'app-utils',
        'movie-commands',
        'ngRoute',
        'ui.bootstrap'
    ]);

    mod.config(function ($routeProvider) {
        $routeProvider.when('/list', {
            controller: 'movie-list-controller',
            controllerAs: 'ctrl',
            templateUrl: '/app/movie-management/movie-list.html'
        });

        $routeProvider.when('/details/:id', {
            controller: 'movie-details-controller',
            controllerAs: 'ctrl',
            templateUrl: '/app/movie-management/movie-details.html'
        });

        $routeProvider.otherwise({
            redirectTo: '/list'
        });
    });

    mod.controller('movie-list-controller', MovieListController);
    mod.controller('movie-details-controller', MovieDetailsController);
    mod.controller('add-movie-controller', AddMovieController);
    mod.controller('movie-title-controller', MovieTitleController);
    mod.controller('rate-movie-controller', RateMovieController);
    mod.controller('movie-description-controller', MovieDescriptionController);
    mod.controller('add-director-controller', AddDirectorController);

    mod.factory('moviesSvc', function ($http) {

        function query() {
            return $http.get('/api/movies');
        }

        function get(params) {
            return $http.get('/api/movies/' + params.id);
        }

        return {
            query: query,
            get: get
        };
    });

    function MovieListController($modal, $location, $http, moviesSvc, uuid, movieCommands) {
        this.$modal = $modal;
        this.$location = $location;
        this.$http = $http;
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
            templateUrl: '/app/movie-management/add-movie.html',
            controller: 'add-movie-controller',
            controllerAs: 'ctrl'
        });

        modalInstance.result.then(function (newMovie) {
            newMovie.id = newMovie.movieId;
            that.movies.push(newMovie);
        });
    };

    MovieListController.prototype.generateMovies = function () {
        var movies = [12862, 12865, 13092, 16673];
        var self = this;
        var movieCommands = this.movieCommands;

        movies.forEach(function (m) {

            self.$http.get('/data/' + m + '.json').then(function (e) {
                console.log(e.data);
                var movie = e.data;
                delete movie.id;
                movie.criticsConsensus = movie.critics_consensus;
                delete movie.critics_consensus;;

                var titleCommand = movieCommands.titleMovie(movie);
                movieCommands.excute(titleCommand).then(function () {
                    var describeCommand = movieCommands.describeMovie(movie);
                    return movieCommands.excute(describeCommand);
                }).then(function () {
                    var rateMovieByAudience = movieCommands.rateMovieByAudience(movie.id, movie.ratings.audience_score);
                    return movieCommands.excute(rateMovieByAudience);
                }).then(function () {
                    var rateMovieByCrictics = movieCommands.rateMovieByCrictics(movie.id, movie.ratings.critics_score);
                    return movieCommands.excute(rateMovieByCrictics);
                }).then(function () {
                    var movieDirectedBy = movieCommands.movieDirectedBy(movie.id, movie.abridged_directors[0].name);
                    return movieCommands.excute(movieDirectedBy);
                });
            });
        });
    };

    function MovieDetailsController($scope, $route, $modal, $location, moviesSvc, uuid, $http, movieCommands) {
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
                    movie.criticsScore = Math.round(0.9 * movie.criticsScore + 0.1 * rating);
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
                    movie.audienceScore = Math.round(0.9 * movie.audienceScore + 0.1 * rating);
                });
        });
    };

    MovieDetailsController.prototype.addDirector=function(movie) {
        var that = this;
        var modalInstance = this.$modal.open({
            templateUrl: '/app/movie-management/add-director.html',
            controller: 'add-director-controller',
            controllerAs: 'ctrl'
        });

        modalInstance.result.then(function (director) {
            var movieDirectedBy = that.movieCommands.movieDirectedBy(movie.id, director);
            that.movieCommands.excute(movieDirectedBy)
                .then(function () {
                    movie.abridgedDirectors.push(director);
            });
        });

    }

    function AddMovieController($scope, $modalInstance, movieCommands) {
        this.$scope = $scope;
        this.$modalInstance = $modalInstance;
        this.movieCommands = movieCommands;

        $scope.newMovie = {
            title: ''
        };
    }

    AddMovieController.prototype.ok = function () {
        var self = this;
        var command = self.movieCommands.titleMovie(self.$scope.newMovie);

        self.movieCommands.excute(command).then(function () {
            self.$modalInstance.close(self.$scope.newMovie);
        });
    };

    AddMovieController.prototype.cancel = function () {
        this.$modalInstance.dismiss();
    };

    function MovieTitleController($scope, movieCommands) {
        $scope.readonly = true;

        $scope.save = function () {
            var command = movieCommands.titleMovie($scope.ctrl.movie);
            movieCommands.excute(command).then(function () {
                $scope.readonly = true;
            });
        };
    }

    function MovieDescriptionController($scope, movieCommands) {
        $scope.readonly = true;

        $scope.save = function () {
            var command = movieCommands.describeMovie($scope.ctrl.movie);
            movieCommands.excute(command).then(function () {
                $scope.readonly = true;
            });
        };
    }


    function RateMovieController($scope, $modalInstance, rating) {
        this.$scope = $scope;
        this.$modalInstance = $modalInstance;

        $scope.rating = {
            value: rating
        };
    }

    RateMovieController.prototype.ok = function () {
        this.$modalInstance.close(this.$scope.rating.value);
    };

    RateMovieController.prototype.cancel = function () {
        this.$modalInstance.dismiss();
    };


    function AddDirectorController($scope, $modalInstance) {
        this.$modalInstance = $modalInstance;
        this.director = '';

    }

    AddDirectorController.prototype.ok = function () {
        this.$modalInstance.close(this.director);
    };

    AddDirectorController.prototype.cancel = function () {
        this.$modalInstance.dismiss();
    };

}());