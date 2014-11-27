(function () {
    'use strict';

    var mod = angular.module('movie-management-app', ['ui.bootstrap']);

    mod.controller('movie-list-controller', MovieListController);

    function MovieListController($modal) {
        this.$modal = $modal;
    }


    MovieListController.prototype.addMovie = function () {
        var modalInstance = this.$modal.open({
            templateUrl: '/app/movie-management/add-movie.html',
            controller: 'add-movie-controller',
            controllerAs: 'ctrl'
        });

        modalInstance.result.then(function (newMovie) {
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
                console.log(e.data.exceptionMessage);
            });
    };

    AddMovieController.prototype.cancel = function () {
        this.$modalInstance.dismiss();
    };
}());