'use strict';

var app = angular.module('beerApp');

app.service('AuthService', function($http, $state, UserService) {	

	this.logout = function() {
		$http.delete('/users/authenticate')
		.then(res => {
			UserService.destroy();
			$state.go('home');
		});
	};

  this.register = function(user) {
    return $http.post('/users/register', user)
    .then(res => {
    	UserService.set(res.data)
    	return res.data;
    }, err => console.error(err));
  };

  this.login = function(user) {
    return $http.post('/users/authenticate', user)
    .then(res => {
    	UserService.set(res.data)
    	return res.data;
    }, err => console.error(err));
  };

	this.init = function() {
		$http.get('/users/profile')
		.then(res => {
			UserService.set(res.data);
		}, err => console.error(err));
		$http.get('/users/beers/1')
		.then(res => {
			console.log(res);
		}, err => console.error(err));
	};

});