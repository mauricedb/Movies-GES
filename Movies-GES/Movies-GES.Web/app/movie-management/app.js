(function () {
    'use strict';

    var mod = angular.module('movie-management-app', [
		'app-utils',
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
        }
    });

    function MovieListController($modal, $location, moviesSvc) {
        this.$modal = $modal;
        this.$location = $location;
        this.moviesSvc = moviesSvc;
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
            that.movies.push(newMovie);
        });
    };

    function MovieDetailsController($route, $modal, $location, moviesSvc) {
        this.$modal = $modal;
        this.$location = $location;
        this.moviesSvc = moviesSvc;
        this.movie = {};

        var that = this;
        moviesSvc.get({ id: $route.current.params.id }).then(function (e) {
            that.movie = e.data;
        });

    }

    function AddMovieController($scope, $modalInstance, $http, uuid) {
        this.$scope = $scope;
        this.$modalInstance = $modalInstance;
        this.$http = $http;
        this.uuid = uuid;

        $scope.newMovie = { 
			title: '', 
			movieId: uuid.v4() 
		};
    }

    AddMovieController.prototype.ok = function () {
        var self = this;
		var commandId = self.uuid.v4();

        self.$http.put(
            '/api/commands/' + commandId,
            self.$scope.newMovie,
            {
                headers: {
                    'x-command-name': 'TitleMovie'
                }
            }).then(function (e) {
                self.$modalInstance.close(self.$scope.newMovie);
            }, function (e) {
                console.log(e.data.modelState.exception[0]);

                //console.log(e.data.exceptionMessage || e.data);
            });
    };

    AddMovieController.prototype.cancel = function () {
        this.$modalInstance.dismiss();
    };
}());