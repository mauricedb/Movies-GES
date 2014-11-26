(function() {
    'use strict';

    var mod = angular.module('movie-management-app', ['ui.bootstrap']);

    mod.controller('movie-list-controller', MovieListController);

    function MovieListController($modal) {
        this.$modal = $modal;
    }


    MovieListController.prototype.addMovie = function() {

        var modalInstance = this.$modal.open({
            templateUrl: '/app/movie-management/add-movie.html',
            controller: 'add-movie-controller',
            controllerAs: 'ctrl'
        });

        modalInstance.result.then(function(newMovie) {
            alert(newMovie.title);
        });
    };

    mod.controller('add-movie-controller', AddMovieController);

    function AddMovieController($scope, $modalInstance) {
        this.$scope = $scope;
        this.$modalInstance = $modalInstance;

        $scope.newMovie = { title: '' };
    }

    AddMovieController.prototype.ok = function() {
        this.$modalInstance.close(this.$scope.newMovie);
    };

    AddMovieController.prototype.cancel = function () {
        this.$modalInstance.dismiss();
    };
}());