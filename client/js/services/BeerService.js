'use strict';

var app = angular.module('beerApp');

app.service('BeerService', function($http) {
	this.set = beers => this.beers = beers;
	this.destroy = () => this.beers = null;

	this.getDetail = function(beer) {
		$http.get(`/users/beerDetail/${beer.id}`)
		.then(res => this.beerDetail = res.data.data,
					err => console.error(err));
	}
});