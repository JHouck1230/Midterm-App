'use strict';

var app = angular.module('beerApp');

app.controller('profileCtrl', function($scope, $state, UserService) {
	$scope.userEditing = false;
	
	$scope.$watch(function() {
			return UserService.user;
		},function(user) {
			$scope.user = user;
		});

	$scope.editUser = () => $scope.userEditing = true;

	$scope.updateProfile = user => {
		$scope.userEditing = false;
		UserService.updateProfile(user)
		.then(res => $scope.user = res.data, 
					err => console.error(err));
	};

});