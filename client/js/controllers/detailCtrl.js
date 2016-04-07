'use strict';

var app = angular.module('beerApp');

app.controller('detailCtrl', function($scope, BeerService) {
	$scope.$watch(function() {
			return BeerService.beerDetail;
		},function(beerDetail) {
			$scope.beerDetail = beerDetail;
			console.log($scope.beerDetail);
		});

	

});