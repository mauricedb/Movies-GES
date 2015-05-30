'use strict';

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


module.exports = AddMovieController;
