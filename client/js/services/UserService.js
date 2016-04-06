'use strict';

var app = angular.module('beerApp');

app.service('UserService', function() {
	this.set = function(user) {
		this.name = user.name;
		this._id = user._id;
		this.user = user;
	};
	this.destroy = function() {
		this.name = null;
		this._id = null;
	};
});