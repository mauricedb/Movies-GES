(function () {
    'use strict';

    var mod = angular.module('director-management-app', [
        'app-utils',
        'ui.bootstrap'
    ]);

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

    function AddDirectorController($scope, $modalInstance, $http, uuid) {
        this.$scope = $scope;
        this.$modalInstance = $modalInstance;
        this.$http = $http;
        this.uuid = uuid;

        $scope.newDirector = { name: '' };
    }

    AddDirectorController.prototype.ok = function () {
        var self = this;
        var commandId = self.uuid.v4();

        self.$http.put(
            '/api/commands/' + commandId,
            this.$scope.newDirector,
            {
                headers: {
                    'Content-Type': 'application/vnd.movies_ges.domain.commands.namedirector+json'
                }
            }).then(function (e) {
                self.$modalInstance.close(self.$scope.newDirector);
            }, function (e) {
                console.log(e);
            });
    };

    AddDirectorController.prototype.cancel = function () {
        this.$modalInstance.dismiss();
    };
}());