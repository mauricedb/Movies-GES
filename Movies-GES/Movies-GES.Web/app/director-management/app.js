'use strict';

var angular = require('angular');
var utils = require('./app-utils');
require('angular-bootstrap');

var mod = angular.module('director-management-app', [
    utils.name,
    'ui.bootstrap'
]);


function DirectorListController($modal) {
    this.$modal = $modal;
}


DirectorListController.prototype.addDirector = function () {
    var modalInstance = this.$modal.open({
        templateUrl: '/app/director-management/add-director.html',
        controller: 'add-director-controller',
        controllerAs: 'ctrl'
    });

    modalInstance.result.then(function () {
    });
};

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
                'Content-Type':
                    'application/vnd.movies_ges.domain.commands.namedirector+json'
            }
        }).then(function () {
            self.$modalInstance.close(self.$scope.newDirector);
        }, function (e) {
            console.log(e);
        });
};

AddDirectorController.prototype.cancel = function () {
    this.$modalInstance.dismiss();
};

mod.controller('add-director-controller', AddDirectorController);
mod.controller('director-list-controller', DirectorListController);
