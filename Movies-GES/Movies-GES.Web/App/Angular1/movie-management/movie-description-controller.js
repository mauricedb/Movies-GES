'use strict';


function MovieDescriptionController($scope, movieCommands) {
    $scope.readonly = true;

    $scope.save = function () {
        var command = movieCommands.describeMovie($scope.ctrl.movie);
        movieCommands.excute(command).then(function () {
            $scope.readonly = true;
        });
    };
}

module.exports = MovieDescriptionController;