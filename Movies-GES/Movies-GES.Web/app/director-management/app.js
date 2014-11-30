(function () {
    'use strict';

    var mod = angular.module('director-management-app', ['ui.bootstrap']);

    mod.controller('director-list-controller', DirectorListController);

    function DirectorListController($modal) {
        this.$modal = $modal;
    }


    DirectorListController.prototype.addDirector = function () {
        var modalInstance = this.$modal.open({
            templateUrl: '/app/director-management/add-director.html',
            controller: 'add-director-controller',
            controllerAs: 'ctrl'
        });

        modalInstance.result.then(function (newMovie) {
        });
    };

    mod.controller('add-director-controller', AddDirectorController);

    function AddDirectorController($scope, $modalInstance, $http) {
        this.$scope = $scope;
        this.$modalInstance = $modalInstance;
        this.$http = $http;

        $scope.newDirector = { name: '' };
    }

    AddDirectorController.prototype.ok = function () {
        var self = this;

        self.$http.put(
            '/api/commands/1',
            this.$scope.newDirector,
            {
                headers: {
                    'x-command-name': 'NameDirector'
                }
            }).then(function (e) {
                self.$modalInstance.close(self.$scope.newDirector);
            }, function (e) {
                console.log(e.data.exceptionMessage);
            });
    };

    AddDirectorController.prototype.cancel = function () {
        this.$modalInstance.dismiss();
    };
}());