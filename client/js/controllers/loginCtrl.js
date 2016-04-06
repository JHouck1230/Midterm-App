'use strict';

var app = angular.module('beerApp');

app.controller('loginCtrl', function($scope, $state, AuthService) {

	$scope.login = function (user){
		AuthService.login(user)
		.then(res => $state.go('home'), 
					err => console.error("err: ", err))
	}

	$scope.register = function (user){
		AuthService.register(user)
			.then(res => $state.go('home'), 
						err => console.error("err: ",err))
	}

});