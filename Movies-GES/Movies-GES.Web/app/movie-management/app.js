﻿(function () {
    'use strict';

    var mod = angular.module('movie-management-app', ['ui.bootstrap']);

    mod.controller('movie-list-controller', MovieListController);

    mod.factory('moviesSvc', function ($http) {

        function query() {
            return $http.get('/api/movies');
        }

        return {
            query: query
        }
    });

    function MovieListController($modal, moviesSvc) {
        this.$modal = $modal;
        this.moviesSvc = moviesSvc;
        this.movies = [];

        var that = this;
        moviesSvc.query().then(function (e) {
            [].push.apply(that.movies, e.data);
        });
    }

    MovieListController.prototype.movieDetails = function(movie) {
        alert(movie.title);
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


    mod.controller('add-movie-controller', AddMovieController);

    function AddMovieController($scope, $modalInstance, $http) {
        this.$scope = $scope;
        this.$modalInstance = $modalInstance;
        this.$http = $http;

        $scope.newMovie = { title: '' };
    }

    AddMovieController.prototype.ok = function () {
        var self = this;

        self.$http.put(
            '/api/commands/1',
            this.$scope.newMovie,
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