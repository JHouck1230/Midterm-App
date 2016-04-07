'use strict';

var app = angular.module('beerApp');

app.controller('detailCtrl', function($scope, BeerService, UserService) {
	$scope.$watch(function() {
			return UserService.user;
		},function(user) {
			$scope.user = user;
		});

	$scope.$watch(function() {
			return BeerService.beerDetail;
		},function(beerDetail) {
			$scope.beerDetail = beerDetail;
			$scope.editing = true;
			$scope.user.beers.forEach(beer => {
				if(beer.id === beerDetail.id) {
					$scope.editing = false;
					$scope.userBeerDetail = beer;
				}
			})
		});

	$scope.saveDetails = function() {
		$scope.beer.id = $scope.beerDetail.id;
		$scope.beer.name = $scope.beerDetail.name;
		BeerService.saveDetails($scope.beer)
	}

});