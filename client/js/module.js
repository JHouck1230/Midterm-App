'use strict';

var app = angular.module('beerApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: '/html/home.html',
		controller: 'homeCtrl'
	})
	.state('detail', {
		url: '/detail',
		templateUrl: '/html/detail.html',
		controller: 'detailCtrl'
	})
	.state('profile', {
		url: '/profile',
		templateUrl: '/html/profile.html',
		controller: 'profileCtrl'
	})
	.state('login', {
		url: '/login',
		templateUrl: '/html/login.html',
		controller: 'loginCtrl'
	})

	$urlRouterProvider.otherwise('/');
});

app.run(function(AuthService) {
	AuthService.init();
});