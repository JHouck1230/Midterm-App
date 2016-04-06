'use strict';

var app = angular.module('beerApp');

app.controller('navCtrl', function($scope, UserService, AuthService, NavService) {
	$scope.$watch(function() {
			return UserService.user;
		},function(user) {
			$scope.name = user.name;
		});
	
	$scope.logout = function() {
		AuthService.logout();
		$scope.name = null;
	};

});