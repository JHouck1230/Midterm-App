'use strict';

var app = angular.module('beerApp');

app.controller('homeCtrl', function($scope, BeerService) {
	$scope.$watch(function() {
			return BeerService.beers;
		},function(beers) {
			$scope.beers = beers;
		});

	$scope.getDetail = function(beer) {
		BeerService.getDetail(beer)
	}

});