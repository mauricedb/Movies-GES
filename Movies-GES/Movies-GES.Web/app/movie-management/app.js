'use strict';

var angular = require('angular');
var ngRoute = require('angular-route');

var commands = require('./commands');
var utils = require('./app-utils');
require('angular-bootstrap');

var MovieListController = require('./movie-list-controller');
var MovieDetailsController = require('./movie-details-controller.js');
var MovieDescriptionController = require('./movie-description-controller.js');
var AddMovieController = require('./add-movie-controller.js');

var mod = angular.module('movie-management-app', [
	utils.name,
	commands.name,
	ngRoute,
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





function MovieTitleController($scope, movieCommands) {
	$scope.readonly = true;

	$scope.save = function () {
		var command = movieCommands.titleMovie($scope.ctrl.movie);
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
