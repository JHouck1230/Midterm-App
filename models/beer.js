'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');

const BREWERY_DB_API = process.env.BREWERY_DB_API;

var Beer;

var beerSchema = new mongoose.Schema({
	name: { type: String, unique: true, required: true },
	sampled: Boolean,
	rating: Number,
	comments: String
});

Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;